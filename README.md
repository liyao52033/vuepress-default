## 1 克隆到本地

```sh
git clone https://github.com/liyao52033/vuepress-default.git
```

## 2 安装依赖

```sh
yarn install
```

## 3 修改config.js配置

主要修改部分如下

```js
# docs\.vuepress\config.js

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
      //备案号
      copyrightInfo: '<a target="_blank"' +
        ' href="https://github.com/liyao52033/vuepress-default">liyao52033</a>'
    },
    extendFrontmatter: {
      author: {
        name: '',
        link: ''
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
```

## 4 修改插件配置

主要修改部分如下

```js
# docs\.vuepress\pluginConfig.js 

// 全文搜索插件 meilisearch
  [
    'vuepress-plugin-meilisearch',
    {
      hostUrl: secureConf.meilisearch_hostUrl,        // meilisearch 服务端域名
      apiKey: secureConf.meilisearch_apiKey, // 只有搜索权限的 key
      indexUid: 'blog',
      placeholder: '搜索一下，你就知道',   // 在搜索栏中显示的占位符
      maxSuggestions: 100,                      // 最多显示几个搜索结果
      cropLength: 20
    },
  ],
    
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
```

1、获取meilisearch密钥

参考[官网地址](https://www.meilisearch.com/docs/learn/self_hosted/getting_started_with_self_hosted_meilisearch)及 [meilisearch部署](https://xiaoying.org.cn/pages/a8083d/)(需部署到云服务器)，获取apiKey和hostUrl及其他配置

2、获取valine密钥

参考[官网](https://valine.js.org/quickstart.html)获取AppID和AppKey及其他配置

## 5 修改文章内容

目录结构及配置参考[vdoing官网](https://doc.xugaoyi.com/pages/33d574/#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84%E4%BE%8B%E5%AD%90)

## 6 修改push.sh及deploy.sh仓库地址

```bash
# docs/.vuepress/deploy.sh
# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main
```

```bash
# docs/push.sh
git push -f git@github.com:<USERNAME>/<repo>.git main
```

## 7 运行项目

```bash
yarn run docs:dev
```

## 8 打包项目

```bash
yarn run docs:build
```

## 9 部署

此处只部署到 USERNAME.github.io,其他情况见[vuepress官网](https://vuepress.vuejs.org/zh/guide/deployment.html#github-pages),部署之前先打包看是否有报错

```
yarn run deploy
```

