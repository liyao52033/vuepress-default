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
      container: "#search-form span #algolia-search-input",
      algoliaOptions: {
        hitsPerPage: 1000
      },
    },
    smoothScroll: true,
    sidebarDepth: 2,
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

