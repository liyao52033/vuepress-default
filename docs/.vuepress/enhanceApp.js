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
            storage.setItem('token', params.access_token); // 统一用封装的storage
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
      if (!checkAuth()) {
        storage.setItem('redirect', to.path);
        return next('/login/');
      }

      // ✅ 核心鉴权逻辑：有token，校验有效性 + 获取用户信息
      const accesskey = storage.getItem('token');
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
          headers: { 'Authorization': 'Bearer ' + accesskey },
          credentials: 'include'
        });

        // ✅ 关键修复：fetch的正确异常处理！fetch只抛网络错误，HTTP错误(401/403)不会进入catch，必须手动判断res.ok
        if (res.ok) {
          // token有效，正常放行路由 ✅ 核心：此时调用next，路由立即跳转，不会出现404
          dialog.DialogHelper.close(loadingInstance);
          next();
        } else {
          // token过期/无效/无权限，统一走登出逻辑
          dialog.DialogHelper.close(loadingInstance);
          dialog.DialogAlert('登录已过期，请重新登录!', () => {
            storage.removeItem('token');
            storage.setItem('redirect', to.path);
            next('/login/');
          }, { messageType: 'warning' });
        }
      } catch (error) {
        // 捕获网络错误/请求超时等异常
        console.error('用户信息请求失败：', error);
        dialog.DialogHelper.close(loadingInstance);
        storage.removeItem('token');
        storage.setItem('redirect', to.path);
        next('/login/');
      } finally {
        // ✅ 无论成功/失败/异常，最终都解锁 + 兜底关闭loading，防止loading卡死页面
        isRequestingUserInfo = false;
        dialog.DialogHelper.close(loadingInstance);
        loadingInstance = null; // 清空实例，避免内存占用
      }
    });
  }
};

