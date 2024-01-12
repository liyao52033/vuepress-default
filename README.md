
## 1. 下载到本地并安装依赖

```bash
yarn 
```



## 2. 脚本说明

```bash
"scripts": {
    "docs:dev": "vuepress dev docs",  //启动项目
    "docs:build": "vuepress build docs", // 打包项目
    "deploy": "./docs/.vuepress/deploy.sh", //部署到github.io
    "push": "./docs/push.sh"  //推送到github
  },
```


## 3. 编辑导航栏
- 若使用vdoing主题侧边栏，导航栏只需写与.vuepress同层的一级目录，link写该文件夹内任意md文件frontmatter的permalink,格式如下，更多内容见[官网](https://doc.xugaoyi.com/pages/54651a/)

```javascript
 // config.js
module.exports = {
    themeConfig: {
        nav:  [
            // 没有二级导航时可以直接添加
           {text: '目录页', link: '/web/'},

          // 有二级导航时
           {text: '页面',
            /** 目录页， vdoing主题新增的配置项，有二级导航时，可以点击一级导航跳到目录页，
             依赖于结构化的侧边栏数据，就是说你需要在config.js配置 sidebar: 'structuring' 或 sidebar: { mode: 'structuring', collapsable: false} 才能实现目录页数据的获取。**/
               link: '/ui/',   
               items: [
                 {text: 'HTML', link: '/pages/11/'},
                 {text: 'CSS', link: '/pages/22/'},
               ]
            },
       ]
    }
}

```

## 4. 添加全文搜素与评论功能
### 4.1 自建meiLisearch，参考[meilisearch部署](https://xiaoying.org.cn/pages/a8083d/)并完善下列信息
```javascript
// 全文搜索插件 meilisearch
  [
    'vuepress-plugin-meilisearch',
    {
      hostUrl: '',        // meilisearch 服务端域名
      apiKey: '', // 只有搜索权限的 key
      indexUid: 'blog',
      placeholder: '搜索一下，你就知道',   // 在搜索栏中显示的占位符
      maxSuggestions: 100,                      // 最多显示几个搜索结果
      cropLength: 20
    },
  ],
```

### 4.2 参考[leancloud文档](https://docs.leancloud.cn/sdk/start/quickstart/)并完善下列信息
  ```javascript

    //valine评论
  ['vuepress-plugin-comment', {
      choosen: 'valine',
      // options选项中的所有参数，会传给Valine的配置
      options: {
        el: '#valine-vuepress-comment',
        appId: '', // valine的appid
        appKey: '', // valine的appkey
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

## 5. 启动项目

```bash
yarn run docs:dev
```


## 6.部署，此处只部署到 USERNAME.github.io,其他情况见[官网](https://vuepress.vuejs.org/zh/guide/deploy.html)

修改deploy.sh的仓库路径

```sh
# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main
```

部署

```bash
yarn run deploy
```










