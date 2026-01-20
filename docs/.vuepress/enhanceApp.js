// export default ({
//     Vue, // VuePress 正在使用的 Vue 构造函数
//     options, // 附加到根实例的一些选项
//     router, // 当前应用的路由实例
//     siteData // 站点元数据
// }) => {
//      Vue.config.devtools = true; //谷歌无痕模式下生效，或者用Edge
// }

import { checkAuth, storage, isServer } from './login/helper';

export default ({ Vue, router, siteData }) => {
  const loginInfos = siteData.themeConfig?.loginInfo || {};
  const { isLogin, List } = loginInfos;
  const whiteList = ['/', '/login/'];
  // 防重复请求锁：解决刷新时多次调用 getUser 的问题
  let isRequestingUserInfo = false;
  // 全局loading实例：用于控制loading的开启和关闭
  let loadingInstance = null;

  if (isLogin) {
    router.beforeEach(async (to, from, next) => {

      // 服务端环境直接放行，不执行任何浏览器端逻辑
      if (isServer()) return next();

      // ✅ 场景1：登录页回调，解析URL中的access_token并存储
      if (to.path === '/login/') {
        const hash = window.location.hash.slice(1);
        if (hash.includes('access_token')) {
          const params = {};
          hash.split('&').forEach(item => {
            const [key, value] = item.split('=');
            params[key] = value;
          });
          if (params.access_token) {
          //  storage.setItem('token', params.access_token); // 统一用封装的storage
            const redirect = storage.getItem('redirect') || '/';
            storage.removeItem('redirect');
            return next(redirect);
          }
        }
        return next(); // 无token参数，正常放行到登录页
      }

      // ✅ 场景2：当前路由不需要鉴权（不在加密名单），直接放行（局部登录逻辑）
      if (List.indexOf(to.path) === -1) {
        return next();
      }

      // ✅ 场景3：白名单路由，直接放行（全局登录逻辑）
      // if (whiteList.includes(to.path)) {
      //   return next();
      // }

      // ✅ 场景4：无token，直接跳转登录页并存储回跳地址
      // if (!checkAuth()) {
      //   storage.setItem('redirect', to.path);
      //   return next('/login/');
      // }

      // ✅ 场景5：同一路由hash跳转，直接放行
      if (to.path === from.path) return next();

      // ✅ 核心鉴权逻辑：有token，校验有效性 + 获取用户信息
      // 加锁：防止重复请求
      if (isRequestingUserInfo) return;
      isRequestingUserInfo = true;

      const dialog = require('v-dialogs');

      try {
        // 打开全局loading，提示用户「验证登录中」，页面遮罩，禁止操作
        loadingInstance = dialog.DialogMask('验证登录状态中，请稍候...', () => { }, {
          closeTime: false
        });

        const res = await fetch('https://ssl.xiaoying.org.cn/getUser', {
          method: 'GET',
          credentials: 'include'
        });


        if (res.ok) {
          // token有效，正常放行路由
          dialog.DialogHelper.close(loadingInstance);
          next();
        } else {
          // token过期/无效/无权限，先关闭loading
          dialog.DialogHelper.close(loadingInstance);

          // 提取登出逻辑为独立函数，避免重复代码
          const handleLoginExpire = () => {
            dialog.DialogAlert('登录已过期，请重新登录!', () => {
              storage.setItem('redirect', to.path);
              next('/login/');
            }, { messageType: 'warning' });
          };

          try {
            // 刷新token接口
            const refreshRes = await fetch('https://ssl.xiaoying.org.cn/refresh', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include', // 自动携带Cookie
            });
            const refreshData = await refreshRes.json();

            if (refreshRes.ok && refreshData?.token) {
              // 刷新成功，重试getUser接口
              const retryRes = await fetch('https://ssl.xiaoying.org.cn/getUser', {
                method: 'GET',
                credentials: 'include'
              });

              if (retryRes.ok) {
                // 重试成功：直接放行，不执行任何登出逻辑
                next();
                // 终止当前else分支的所有后续逻辑（关键修复）
                return;
              }
            }

            // 以下是refresh成功但重试getUser失败，或refresh返回ok但无token的情况
            handleLoginExpire();
          } catch (refreshError) {
            // refresh接口请求失败（网络/服务器错误）
            console.error('刷新token失败：', refreshError);
            handleLoginExpire();
          }
        }
      } catch (error) {
        dialog.DialogHelper.close(loadingInstance);
        storage.setItem('redirect', to.path);
      } finally {
        // 无论成功/失败/异常，最终解锁 + 兜底关闭loading
        isRequestingUserInfo = false;
        dialog.DialogHelper.close(loadingInstance);
        loadingInstance = null;
      }
    });
  }
};

