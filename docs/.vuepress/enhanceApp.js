// export default ({
//     Vue, // VuePress 正在使用的 Vue 构造函数
//     options, // 附加到根实例的一些选项
//     router, // 当前应用的路由实例
//     siteData // 站点元数据
// }) => {
//      Vue.config.devtools = true; //谷歌无痕模式下生效，或者用Edge
// }

import { checkAuth } from './login/helper';

export default ({ Vue, router, siteData }) => {

  const dialog = require('v-dialogs')
  Vue.use(dialog)


  const loginInfos = siteData.themeConfig?.loginInfo || {}
  const { isLogin, List } = loginInfos
  const whiteList = ['/', '/login/']

  router.beforeEach(async (to, from, next) => {

    if (isLogin) {

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
          localStorage.setItem('redirect', to.path)
          return
      }

      // 有权限，校验登录状态 & 请求用户信息
      const accesskey = localStorage.getItem('token')

      try {
        // 请求用户信息接口，验证token有效性
        const res = await fetch('https://ssl.xiaoying.org.cn/getUser', {
          headers: { 'Authorization': 'Bearer ' + accesskey }
        });

        // token有效 → 正常放行，页面跳转✅
        if (res.ok) {
          next()
        } else {
          // token过期/无效 → 提示+清除token+跳转登录页
          dialog.DialogAlert('登录已过期，请重新登录!', function () {
            localStorage.removeItem('token')
            localStorage.setItem('redirect', to.path)
            next('/login/')
          }, { messageType: 'warning' })
        }
      } catch (error) {
        localStorage.removeItem('token')
        localStorage.setItem('redirect', to.path)
        next('/login/')
      }
    } else {
      next()
    }
  });

  
};