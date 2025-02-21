const nav = require("./nav.js");
const pluginConfig = require("./pluginConfig.js")
const { readEachFileWords } = require('./webSiteInfo/readFile.js');

module.exports = {
  title: '编程随笔',
  description: '编程随笔',
  head: [
    ['link', { rel: 'icon', href: '/img/logo.png' }],
    ['link', { rel: 'stylesheet', href: '//at.alicdn.com/t/font_3114978_qe0b39no76.css' }],
    ['link', { rel: 'stylesheet', href: '//at.alicdn.com/t/font_3077305_pt8umhrn4k9.css' }],
    ['link', { rel: 'stylesheet', href: '//at.alicdn.com/t/c/font_4397361_l7w8pg1gfn.css' }],
    ['link', { rel: 'stylesheet', href: '//at.alicdn.com/t/font_3114978_qe0b39no76.css' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1' }],
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
    ['meta', { name: 'keywords', content: '编程随笔' }],
    ['meta', { content: '编程随笔', property: 'og:title' }],
  ],

  locales: {
    '/': {
      lang: 'zh-CN',
    }
  },

  extraWatchFiles: [
    '../*.js', // 使用相对路径
  ],

  additionalPages: [
    {
      path: '/login/',
      frontmatter: {
        layout: 'Login',
        article: false
      }
    }
  ],

  // configureWebpack: (config) => {
  //    config.devtool = 'source-map';
  // },

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
    },
    // extendMarkdown: md => {
    //   md.use(html5Media);
    // }
  },

  themeConfig: {
    logo: '/img/logo.png',
    bodyBgImg: ['/img/bg.jpg', '/img/default-cover.jpg', '/img/1.png', '/img/2.jpeg'],
    bodyBgImgOpacity: 1, // body 背景图透明度，选值 0 ~ 1.0, 默认0.5,
    bodyBgImgInterval: 600, // body 背景图切换时间间隔，单位 s
    nav,
    sidebar: 'structuring',
    subSidebar: 'auto',
    pageButton: true,
    loginInfo: {
      isLogin: true, // 是否开启登录
      token: Math.random().toString(32).slice(2) + Math.round(new Date().getTime() / 1000),
      List: [
        '/pages/bbd1d8/',
        '/pages/2fcd29/',
        '/pages/b972ff/',
        '/pages/617ec1/',
        '/pages/7a1d12/',
      ], //加密文章列表
      expiration: 0.5  // token过期时间，单位：天
    },
    indexImg: {
      navColor: 1,    // 导航栏左侧名字、中间搜索框、右侧字体的颜色，1 是黑色，2 是白色。默认是 1
      switchNavColor: false,    // 页面移出大图片的位置后，navColor 是否变换，如由白色变黑色，黑色变白色。默认是 false
      // 因为本主题的默认背景色偏向白色，如果 navColor 是 2，建议需要开启(true)，否则白背景 + 白字体 = 看不见
      bgTimeColor: true,     // 是否开启图片的背景色随一天的不同时间而变化，并且开启时间窗口提示，默认是 false。时间分为四种：白天（原图）、黄昏（偏黄）、晚上（偏黑）、深夜（偏深黑）
      bgTimeColorArray: ['transparent', 'transparent', 'transparent', 'transparent'],
      descFade: true,   // 是否开启图片中间描述的淡入效果，默认为 false
      desc: ["Web前端技术博客,积跬步以至千里,致敬每个爱学习的你"],  // 多个描述，如果填写则覆盖 config.js 的 description，不填写默认读取 config.js 的 description，descFade 为 true 生效
      descFontSize: '1.4rem',   // desc 的字体大小，默认 1.4rem。提示：原主题是 1.1rem
      descFadeInTime: 200,  // 描述的淡入效果持续时间，descFade 为 true 生效，默认 200 毫秒
      descFadeOutTime: 100,  // 描述的淡出效果持续时间，descFade 为 true 生效，默认 100 毫秒
      descNextTime: 800,  // 当存在多个 desc 时，一个 desc 展示完后或准备开始时，多少秒后出现下一个 desc，默认 800 毫秒
      bubble: false,    // 是否开启图片的气泡效果，默认为 false
      bubblePosition: 0,  // 气泡效果的位置，范围：0-100，不同数值代表不同的起始位置，0是整个图片，50是半张图（一半的下方）。bubble 为 true 生效。默认是 0
      bubbleNum: 200,   // 气泡的个数，bubble 为 true 生效，默认 200 个
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
    lastUpdated: '上次更新',


    // 站点配置（首页 & 文章页）
    blogInfo: {
      blogCreate: '2023-08-15', // 博客创建时间
      indexView: true,  // 开启首页的访问量和排名统计，默认 true（开启）
      pageView: true,  // 开启文章页的浏览量统计，默认 true（开启）
      readingTime: true,  // 开启文章页的预计阅读时间
      eachFileWords: readEachFileWords([''], 300, 160),  // 开启每个文章页的字数。
      mdFileCountType: 'archives',  // 开启文档数。
      totalWords: 'archives',  // 开启本站文档总字数。
      moutedEvent: '.tags-wrapper',   // 首页的站点模块挂载在某个元素后面（支持多种选择器）
      indexIteration: 5000,   // 如果首页获取访问量失败，则每隔多少时间后获取一次访问量，直到获取成功或获取 10 次后
      pageIteration: 5000,    // 如果文章页获取访问量失败，则每隔多少时间后获取一次访问量，直到获取成功或获取 10 次后
    }

  }


}

