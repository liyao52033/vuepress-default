const secureConf = require("../../comment/secureinfo")

module.exports = [

  // '@vuepress/back-to-top',
  'element-ui',

  [
    '@vuepress/last-updated',
    {
      transformer: (timestamp, lang) => {
        return new Date(timestamp).toLocaleDateString();
      }
    }
  ],

  ['sitemap', {
    hostname: 'https://liyao52033.github.io',
    exclude:['/404.html']
  }],

    //全文搜索
  ['flexsearch-pro',{
      searchResultLength: 100
  }],

      // 自动侧边栏
  ["vuepress-plugin-auto-sidebar",{
    sidebarDepth: 2,
    collapse: {
      open: true,
    },
  }],

  // 代码复制插件
  "vuepress-plugin-nuggets-style-copy",


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




