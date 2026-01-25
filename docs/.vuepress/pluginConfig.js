module.exports = [
  'element-ui',
  'blocktoggle',
  'copycodeblock',
  'img-lazy',
  {
    name: 'custom-plugins',
    // 2.x 版本 globalUIComponents 改名为clientAppRootComponentFiles
    globalUIComponents: ["GlobalTip", "RightArrow"]
  },

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


  ['@vuepress/active-header-links', {
    sidebarLinkSelector: '.sidebar-link',
    headerAnchorSelector: '.header-anchor',
  }],

  [
    'vuepress-plugin-twikoo',
    {
      options: {
        envId: 'https://twikoo.xiaoying.org.cn', 
      }
    }
  ]

]



