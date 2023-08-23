---
home: true
heroImage: null
heroText: 寰宇科技
tagline: null
actionText: 快速上手 →
actionLink: /前端/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: 注意事项
  details: 每个文件夹里都必须有一个README.md，不然会报404
- title: 包管理器
  details: 如果你的现有项目依赖了 webpack 3.x，我们推荐使用yarn而不是 npm 来安装 VuePress。因为在这种情形下，npm 会生成错误的依赖树,导致项目无法启动
---


::: tip 提示
[在线预览](https://liyao52033.github.io/)
::: 

## 安装

```bash
yarn add -D vuepress
```

::: warning 注意

如果你的现有项目依赖了 webpack 3.x，我们推荐使用 [Yarn (opens new window)](https://classic.yarnpkg.com/zh-Hans/)而不是 npm 来安装 VuePress。因为在这种情形下，npm 会生成错误的依赖树,导致项目无法启动

::: 

## 在 `package.json` 中添加脚本

这一步骤是可选的，但我们推荐你完成它。在下文中，我们会默认这些 scripts 已经被添加。

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```



## 在本地启动服务器

```bash
yarn docs:dev 
```



# 目录结构

VuePress 遵循 **“约定优于配置”** 的原则，推荐的目录结构如下：

```
.
├── docs
│   ├── .vuepress (可选的)
│   │   ├── components (可选的)
│   │   ├── theme (可选的)
│   │   │   └── Layout.vue
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (可选的, 谨慎配置)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
```

注意

请留意目录名的大写。

- `docs/.vuepress`: 用于存放全局的配置、组件、静态资源等。

- `docs/.vuepress/components`: 该目录中的 Vue 组件将会被自动注册为全局组件。

- `docs/.vuepress/theme`: 用于存放本地主题。

- `docs/.vuepress/styles`: 用于存放样式相关的文件。

- `docs/.vuepress/styles/index.styl`: 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。

- `docs/.vuepress/styles/palette.styl`: 用于重写默认颜色常量，或者设置新的 stylus 颜色常量。

- `docs/.vuepress/public`: 静态资源目录。

- `docs/.vuepress/templates`: 存储 HTML 模板文件。

- `docs/.vuepress/templates/dev.html`: 用于开发环境的 HTML 模板文件。

- `docs/.vuepress/templates/ssr.html`: 构建时基于 Vue SSR 的 HTML 模板文件。

- `docs/.vuepress/config.js`: 配置文件的入口文件，也可以是 `YML` 或 `toml`。

- `docs/.vuepress/enhanceApp.js`: 客户端应用的增强。

  

  ## 默认的页面路由

  此处我们把 `docs` 目录作为 `targetDir` （参考 [命令行接口](https://vuepress.vuejs.org/zh/api/cli.html#基本用法)），下面所有的“文件的相对路径”都是相对于 `docs` 目录的。在项目根目录下的 `package.json` 中添加 `scripts` ：

  ```json
  {
    "scripts": {
      "dev": "vuepress dev docs",
      "build": "vuepress build docs"
    }
  }
  ```

  对于上述的目录结构，默认页面路由地址如下：

  | 文件的相对路径     | 页面路由地址   |
  | ------------------ | -------------- |
  | `/README.md`       | `/`            |
  | `/guide/README.md` | `/guide/`      |
  | `/config.md`       | `/config.html` |

​      默认的主题提供了一个首页（Homepage）的布局 (用于 这个网站的主页)。想要使用它，需要在你的根级 README.md 的 YAML front    matter 指定 home: true。



## 导航栏与侧边栏配置

::: tip 提示

用[Vuepress Plugin Auto Sidebar](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar)自动生成插件，[详细文档](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/)

:::

## 安装

```bash
yarn add vuepress-plugin-auto-sidebar -D
```

## [使用](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/features/plugin-options.html#%E6%A6%82%E8%A7%88)

> **Attention, do not put `plugins` in the themeConfig**

```js
module.exports = {
  plugins: [
    ["vuepress-plugin-auto-sidebar", {
       sidebarDepth: 2,
       collapse: {
          open: true,
      },
    }]
  ]
}
```

## 快速生成简单的导航栏

1. 添加脚本到 `package.json` 中

   ```json
   {
     "scripts": {
       "docs:nav": "vuepress nav docs"
     }
   }
   ```

2. 执行命令

   ```bash
   yarn run docs:nav
   ```
 ::: tip 提示

它将会在 `.vuepress` 文件夹下生成 `nav.js` 文件，每次新增文件夹都要执行一次该命令重新生成路由

 :::

3. 引入生成的 nav 文件

   ```js
   const nav = require("./nav.js");
   
   module.exports = {
     plugins: {
       "vuepress-plugin-auto-sidebar": {}
     },
     themeConfig: {
       nav
     }
   }
   ```



## 专注写作

在docs目录下存放写的文章即可，目录如下

```text
docs
├─ README.md
├─ contact.md
├─ about.md
├─ foo/
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar/
   ├─ README.md
   ├─ three.md
   └─ four.md
```

::: danger 警告

每个文件夹下必须有一个README.md，不然跳转404

:::

::: slot footer
MIT Licensed | Copyright © 2023-present [liyao](https://github.com/liyao52033/liyao52033.github.io)
:::
