const nav = require("./nav.js");
const pluginConfig = require("./pluginConfig.js")
const secureConf = require("../../comment/secureinfo")

module.exports = {

  title: '个人博客',
  description: 'Just playing around',
  head: [
    ['link', { rel: 'icon', href: '/img/logo.png' }],
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
    }
  },

  extendPageData ($page) {
    $page.frontmatter.author = "华总"
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
    logo: '/img/logo.png', // 导航栏左侧的logo,不写就不显示
    nav,
    algolia: {
      apiKey: secureConf.algolia_apiKey,
      indexName: secureConf.algolia_indexName,
      appId: secureConf.algolia_appId,
      algoliaOptions: {
        hitsPerPage: 1000,
      },
    },
    smoothScroll: true,
    sidebarDepth: 2,
    activeHeaderLinks: true,
    displayAllHeaders: false,
    lastUpdated: '上次更新'
  }


  }

