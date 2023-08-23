const nav = require("./nav.js");

module.exports = {

    title: '个人博客',
    description: 'Just playing around',
    locales: {
      '/': {
        lang: 'zh-CN',
      }
    },

  plugins: [
    '@vuepress/last-updated' ,
    '@vuepress/back-to-top',
    ["vuepress-plugin-auto-sidebar",{
      sidebarDepth: 1,
      collapse: {
        open: true,
      },
    }],
    ['@vuepress/active-header-links', {
      sidebarLinkSelector: '.sidebar-link',
      headerAnchorSelector: '.header-anchor',
    }]
  ],

    markdown: {
      lineNumbers: true,
      // markdown-it-anchor 的选项
      anchor: { permalink: false },
      // markdown-it-toc 的选项
      toc: { includeLevel: [1, 2] },
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
      repo: 'https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar',
      repoLink: 'Github',
      lastUpdated: '上次更新'
    }


  }

