const nav = require("./nav.js");
const pluginConfig = require("./pluginConfig.js")

module.exports = {

  title: '个人博客',
  description: 'Just playing around',
  locales: {
    '/': {
      lang: 'zh-CN',
    }
  },

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
        '@alias': 'docs/.vuepress'
      }
    }
  },

  themeConfig: {
    nav,
    smoothScroll: true,
    sidebarDepth: 2,
    activeHeaderLinks: true,
    displayAllHeaders: false,
    repo: 'https://github.com/liyao52033/vuepress-default',
    repoLink: 'Github',
    lastUpdated: '上次更新'
  }


  }

