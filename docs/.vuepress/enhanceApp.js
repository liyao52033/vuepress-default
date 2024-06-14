// export default ({
//     Vue, // VuePress 正在使用的 Vue 构造函数
//     options, // 附加到根实例的一些选项
//     router, // 当前应用的路由实例
//     siteData // 站点元数据
// }) => {
//      Vue.config.devtools = true; //谷歌无痕模式下生效，或者用Edge
// }

import { checkAuth, STORAGE_KEY } from './login/helper';
const whiteList = ['/login', '/']
const List = ['/pages/bbd1d8/', '/pages/2fcd29/']  //加密文章列表

//部分文章加密
export default ({ Vue, router }) => {

  Vue.mixin({
    mounted() {

      let dialog = require('v-dialogs')
      Vue.use(dialog)
      let { isLogin, token } = this.$themeConfig.loginInfo

      if (isLogin) {
        router.beforeEach(async (to, from, next) => {
          if (List.indexOf(to.path) !== -1) {
            if (checkAuth()) {
                let auth = JSON.parse(localStorage.getItem(STORAGE_KEY))
                if (auth && auth.accesskey === token) {
                  // 存值时间戳 +  有效时间 = 过期时间戳
                  // 如果当前时间戳大于过期时间戳说明过期了，删除值并返回提示
                  if (Math.round(Date.now() / 1000) > (auth.time + auth.expire)) {
                    localStorage.removeItem(STORAGE_KEY)
                    next('/login')
                  //  next({ name: 'v-048bf8fa' })
                  } else {
                    next();
                  }
                } else {
                  dialog.DialogAlert('登录已过期，请重新登录!', function () {
                    localStorage.removeItem(STORAGE_KEY)
                    next('/login')
                   // next({ name: 'v-048bf8fa' })
                  }, {
                    messageType: 'warning'
                  })
                }
            } else {
                 next('/login')
              }
            } else {
            // 不在加密名单中，放行
              next()
            }
          })
        };
      } 
  });
};

//全局登录验证
// export default ({ Vue, router }) => {

//   Vue.mixin({
//     mounted() {

//       let dialog = require('v-dialogs')
//       Vue.use(dialog)

//       let { isLogin, token } = this.$themeConfig.loginInfo
//       if (isLogin) {
//         router.beforeEach(async (to, from, next) => {
//           if (checkAuth()) {
//             if (to.path === '/login') {
//               // if is logged in, redirect to the home page
//               next({ path: '/' })
//             } else {
//               let auth = JSON.parse(localStorage.getItem(STORAGE_KEY))
//               if (auth && auth.accesskey === token) {
//                 // 存值时间戳 +  有效时间 = 过期时间戳
//                 // 如果当前时间戳大于过期时间戳说明过期了，删除值并返回提示
//                 if (Math.round(Date.now() / 1000) > (auth.time + auth.expire)) {
//                   localStorage.removeItem(STORAGE_KEY)
//                   next({ name: 'v-048bf8fa' })
//                 } else {
//                   next();
//                 }
//               } else {
//                 dialog.DialogAlert('登录已过期，请重新登录!', function () {
//                   localStorage.removeItem(STORAGE_KEY)
//                   next({ name: 'v-048bf8fa' })
//                 }, {
//                   messageType: 'warning'
//                 })
//               }
//             }

//           } else {
//             /* has no token*/
//             if (whiteList.indexOf(to.path) !== -1) {
//               next()
//             } else {
//               // 不在白名单中，重定向到登录页
//               if (to.name !== 'v-048bf8fa') next({ name: 'v-048bf8fa' })
//               else next()
//             }
//           }
//         });
//       } else {
//         localStorage.removeItem(STORAGE_KEY)
//       }

//     },
//   });
// };