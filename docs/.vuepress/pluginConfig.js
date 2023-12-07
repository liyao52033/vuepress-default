const secureConf = require("../../comment/secureinfo")

module.exports = [

  'element-ui',
  'blocktoggle',
  'copycodeblock',
  'img-lazy',

   //更新时间
  [
    '@vuepress/last-updated', // "上次更新"时间格式
    {
      transformer: (timestamp, lang) => {
        const moment = require('moment') // https://momentjs.com/
        moment.locale(lang)
        return moment(timestamp).format('YYYY/MM/DD HH:mm:ss');
      }

    }
  ],

  // 全文搜索插件 meilisearch
  [
    'vuepress-plugin-meilisearch',
    {
      hostUrl: secureConf. meilisearch_hostUrl,        // meilisearch 服务端域名
      apiKey: secureConf.meilisearch_apiKey, // 只有搜索权限的 key
      indexUid: 'blog',
      placeholder: '搜索一下，你就知道',   // 在搜索栏中显示的占位符
      maxSuggestions: 100,                      // 最多显示几个搜索结果
      cropLength: 20
    },
  ],


  // 自动侧边栏
  // ["vuepress-plugin-auto-sidebar",{
  //   sidebarDepth: 2,
  //   collapse: {
  //     open: true,
  //   },
  // }],

  ['@vuepress/active-header-links',{
    sidebarLinkSelector: '.sidebar-link',
    headerAnchorSelector: '.header-anchor',
  }],

    //valine评论
  ['vuepress-plugin-comment', {
      choosen: 'valine',
      // options选项中的所有参数，会传给Valine的配置
      options: {
        el: '#valine-vuepress-comment',
        appId: secureConf.leancloud_appId,
        appKey: secureConf.leancloud_appKey,
        serverURLs: "https://qqatv4n2.lc-cn-n1-shared.com",
        avatar: 'wavatar',
        path: '<%- window.location.pathname %>',
        enable: true,
        enableQQ: true,
        pageSize: 5,
        visitor: true,
        placeholder: '同道中人，文明留言...',  // 评论框占位提示符
        lang: 'zh-cn', // 支持中文
      }
    }
  ]



]




