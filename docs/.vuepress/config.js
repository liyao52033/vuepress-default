const nav = require("./nav.js");
const pluginConfig = require("./pluginConfig.js")

module.exports = {

  title: '个人博客',
  description: 'Just playing around',
  head: [
    ['link', { rel: 'icon', href: '/img/logo.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
    }
  },

  theme: 'vdoing',
  plugins: pluginConfig,

  markdown: {
    lineNumbers: true,
    // markdown-it-anchor 的选项
    anchor: { permalink: true },
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2] },
    // extendMarkdown: md => {
    //   md.use();
    // }
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'docs'
      }
    }
  },

  themeConfig: {
    logo: '/img/logo.png', // 导航栏左侧的logo,不写就不显示
    nav,
    subSidebar: 'auto',
    pageButton: false,
    footer: {
      createYear: 2023,
      copyrightInfo: '<a href="https://github.com/liyao52033/vuepress-default">liyao</a> | MIT Licensed'
    },
    extendFrontmatter: {
      author: {
        name: '华总',
        link: 'https://liyao52033.github.io/'
      },
      titleTag: "原创",
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    },

    smoothScroll: true,
    // searchMaxSuggestions: 100,
    activeHeaderLinks: true,
    displayAllHeaders: false,
    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'https://github.com/liyao52033/vuepress-default',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'main',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面!',
    lastUpdated: '上次更新'
  }


  }

