const nav = require("./nav.js");
const pluginConfig = require("./pluginConfig.js")

module.exports = {

  title: '编程随笔',
  description: 'Just playing around',
  head: [
    ['link', { rel: 'icon', href: '/img/logo.png' }],
    ['link', { rel: 'stylesheet', href: '//at.alicdn.com/t/font_3114978_qe0b39no76.css' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
    }
  },

  extraWatchFiles: [
    '../*.js', // 使用相对路径
  ],

  theme: 'vdoing',
  plugins: pluginConfig,

  markdown: {
    lineNumbers: true,
    // markdown-it-anchor 的选项
    anchor: { permalink: true },
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2, 3] },
    extractHeaders: ['h2', 'h3', 'h4'],
    externalLinks: {
      target: '_blank',
      rel: 'noopener noreferrer'
    }
    // extendMarkdown: md => {
    //   md.use();
    // }
  },

  themeConfig: {
    logo: '/img/logo.png',
    nav,
    sidebar: 'structuring',
    subSidebar: 'auto',
    pageButton: false,
    footer: {
      createYear: 2023,
      copyrightInfo: '<a target="_blank"' +
        ' href="https://github.com/liyao52033/vuepress-default">liyao52033</a>&nbsp;&nbsp;All Rights' +
        ' Reserved<br>备案号：<a target="_blank" href="https://beian.miit.gov.cn/">鄂ICP备2023023964号-1</a>&nbsp;&nbsp;&nbsp;&nbsp;'
      // copyrightInfo: '<a target="_blank"' +
      //   ' href="https://github.com/liyao52033/vuepress-default">liyao52033</a>'
    },
    extendFrontmatter: {
      author: {
        name: '华总',
        link: 'https://xiaoying.org.cn/'
      },
      titleTag: "原创"
    },

    smoothScroll: true,
    // searchMaxSuggestions: 100,
    activeHeaderLinks: true,
    displayAllHeaders: false,
    // 假如你的文档仓库和项目本身不在一个仓库：
    // docsRepo: 'https://github.com/liyao52033/vuepress-default',
    // // 假如文档不是放在仓库的根目录下：
    // docsDir: 'docs',
    // // 假如文档放在一个特定的分支下：
    // docsBranch: 'main',
    // // 默认是 false, 设置为 true 来启用
    // editLinks: true,
    // // 默认为 "Edit this page"
    // editLinkText: '帮助我们改善此页面!',
    lastUpdated: '上次更新'
  }


  }

