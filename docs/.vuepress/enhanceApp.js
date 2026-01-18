// export default ({
//     Vue, // VuePress 正在使用的 Vue 构造函数
//     options, // 附加到根实例的一些选项
//     router, // 当前应用的路由实例
//     siteData // 站点元数据
// }) => {
//      Vue.config.devtools = true; //谷歌无痕模式下生效，或者用Edge
// }

import { checkAuth, storage } from './login/helper';

export default ({ Vue, router, siteData }) => {

  const loginInfos = siteData.themeConfig?.loginInfo || {}
  const { isLogin, List } = loginInfos
  const whiteList = ['/', '/login/']

  if (isLogin) {
    router.beforeEach(async (to, from, next) => {

      // 如果是登录页，且URL中有access_token，直接存token并跳转
      if (to.path === '/login/') {
        const hash = window.location.hash.slice(1);
        if (hash.includes('access_token')) {
          const params = {};
          hash.split('&').forEach(item => {
            const [key, value] = item.split('=');
            params[key] = value;
          });
          if (params.access_token) {
            localStorage.setItem('token', params.access_token);
            const redirect = localStorage.getItem('redirect') || '/';
            next(redirect);
            localStorage.removeItem('redirect');
            return;
          }
        }
      }

      // 当前路由不需要鉴权（不在加密名单），直接放行（局部登录）
      if (List.indexOf(to.path) === -1) {
        next()
        return
      }

      // 当前路由在白名单中，直接放行（全局登录）
      // if (whiteList.indexOf(to.path) !== -1) {
      //   next()
      //   return
      // }

      // 当前路由需要鉴权，先校验权限
      if (!checkAuth() && to.path !== '/login/') {
        next('/login/')
        storage.setItem('redirect', to.path)
        return
      }

      // 有权限，校验登录状态 & 请求用户信息
      const accesskey = localStorage.getItem('token')

      try {
        // 使用自定义接口验证 token（密码验证或其他）
        const res = await fetch('https://ssl.xiaoying.org.cn/getUser', {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + accesskey },
          credentials: 'include'
        });


        // token有效 → 正常放行，页面跳转✅
        if (res.ok) {
          next()
        } else {

          // token过期/无效 → 提示+清除token+跳转登录页
          const dialog = require('v-dialogs')
          Vue.use(dialog)
          dialog.DialogAlert('登录已过期，请重新登录!', function () {
            storage.removeItem('token')
            storage.setItem('redirect', to.path)
            next('/login/')
          }, { messageType: 'warning' })
        }

      } catch (error) {
        storage.removeItem('token')
        storage.setItem('redirect', to.path)
        next('/login/')
      }
    });
  }

  Vue.mixin({
    mounted() {
      // 其他逻辑可以放在这里，如果需要
    }
  })


};