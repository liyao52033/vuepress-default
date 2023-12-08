const nav = require("./nav.js");
const pluginConfig = require("./pluginConfig.js")
const { readFileList, readTotalFileWords, readEachFileWords } = require('./webSiteInfo/readFile.js');


module.exports = {

  title: '编程随笔',
  description: 'Just playing around',
  head: [
    ['link', { rel: 'icon', href: '/img/logo.png' }],
    ['link', { rel: 'stylesheet', href: '//at.alicdn.com/t/font_3114978_qe0b39no76.css' }],
    ['link', { rel: 'stylesheet', href: '//at.alicdn.com/t/font_3077305_pt8umhrn4k9.css' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],

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
    pageButton: true,
    // 站点配置（首页 & 文章页）
    blogInfo: {
      blogCreate: '2023-08-15', // 博客创建时间
      indexView: true,  // 开启首页的访问量和排名统计，默认 true（开启）
      pageView: true,  // 开启文章页的浏览量统计，默认 true（开启）
      readingTime: true,  // 开启文章页的预计阅读时间，条件：开启 eachFileWords，默认 true（开启）。可在 eachFileWords 的 readEachFileWords 的第二个和第三个参数自定义，默认 1 分钟 300 中文、160 英文
      eachFileWords: readEachFileWords([''], 300, 160),  // 开启每个文章页的字数。readEachFileWords(['xx']) 关闭 xx 目录（可多个，可不传参数）下的文章页字数和阅读时长，后面两个参数分别是 1 分钟里能阅读的中文字数和英文字数。无默认值。readEachFileWords() 方法默认排除了 article 为 false 的文章
      mdFileCountType: 'archives',  // 开启文档数。1. archives 获取归档的文档数（默认）。2. 数组 readFileList(['xx']) 排除 xx 目录（可多个，可不传参数），获取其他目录的文档数。提示：readFileList() 获取 docs 下所有的 md 文档（除了 `.vuepress` 和 `@pages` 目录下的文档）
      totalWords: 'archives',  // 开启本站文档总字数。1. archives 获取归档的文档数（使用 archives 条件：传入 eachFileWords，否则报错）。2. readTotalFileWords(['xx']) 排除 xx 目录（可多个，可不传参数），获取其他目录的文章字数。无默认值
      moutedEvent: '.tags-wrapper',   // 首页的站点模块挂载在某个元素后面（支持多种选择器），指的是挂载在哪个兄弟元素的后面，默认是热门标签 '.tags-wrapper' 下面，提示：'.categories-wrapper' 会挂载在文章分类下面。'.blogger-wrapper' 会挂载在博客头像模块下面
      // 下面两个选项：第一次获取访问量失败后的迭代时间
      indexIteration: 2500,   // 如果首页获取访问量失败，则每隔多少时间后获取一次访问量，直到获取成功或获取 10 次后。默认 3 秒。注意：设置时间太低，可能导致访问量 + 2、+ 3 ......
      pageIteration: 2500,    // 如果文章页获取访问量失败，则每隔多少时间后获取一次访问量，直到获取成功或获取 10 次后。默认 3 秒。注意：设置时间太低，可能导致访问量 + 2、+ 3 ......
      // 说明：成功获取一次访问量，访问量 + 1，所以第一次获取失败后，设置的每个隔段重新获取时间，将会影响访问量的次数。如 100 可能每次获取访问量 + 3
    },
    blogger: {
      avatar: '/img/avatar.png',
      name: 'liyao52033',
      slogan: '走运时，要想到倒霉，不要得意得过了头；倒霉时，要想到走运，不必垂头丧气。心态始终保持平衡，情绪始终保持稳定，此亦长寿之道',
    },
    social: {
      icons: [
        { iconClass: "icon-github", title: "github", link: "https://github.com/xugaoyi/vuepress-theme-vdoing" },
        { iconClass: "icon-youjian", title: "邮件", link: "https://mail.163.com/js6/main.jsp?sid=YAoleRcXgSntbqVGwDXXGltbASZPXVBD&df=mail163_letter#module=compose.ComposeModule%7C%7B%22type%22%3A%22compose%22%2C%22fullScreen%22%3Atrue%2C%22cid%22%3A%22c%3A1702008591824%22%7D" },
        { iconClass: "icon-QQ", title: "QQ", link: "http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=KV4Fv0BmNdP-Hdy1CNQ5rSW0xg_FOl2u&authKey=H2eyxHNHx4ZfIDDRdYtgIBwgScRRF2uodmQvlks99zYlCqMhMwlABeZnzfS4zSkR&noverify=0&group_code=694387113" },
        { iconClass: "icon-bilibili", title: "哔哩哔哩", link: "https://space.bilibili.com/12890453?spm_id_from=333.337.0.0" },
      ]
    },
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

