---
title: 侧边栏测试
date: 2023-8-22
author: 华总
tags: 
   - vue3
   - swagger
---



## 一. 二级标题

      ###     三级标题

```
plugins: [
  '@vuepress/last-updated' ,
  '@vuepress/back-to-top',
  ["vuepress-plugin-auto-sidebar",{
    sidebarDepth: 2,
    collapse: {
      open: true,
    },
  }],
  ['@vuepress/active-header-links', {
    sidebarLinkSelector: '.sidebar-link',
    headerAnchorSelector: '.header-anchor',
  }]
],
```

## 二. 二级标题

###     三级标题

```js
plugins: [
  '@vuepress/last-updated' ,
  '@vuepress/back-to-top',
  ["vuepress-plugin-auto-sidebar",{
    sidebarDepth: 2,
    collapse: {
      open: true,
    },
  }],
  ['@vuepress/active-header-links', {
    sidebarLinkSelector: '.sidebar-link',
    headerAnchorSelector: '.header-anchor',
  }]
],
```

## 三. 二级标题

###    三级标题

```js
plugins: {
    "vuepress-plugin-auto-sidebar": {
      collapse: {
        open: true
      }
    }
  },
```



## 四. 二级标题

###    三级标题

## 五. 二级标题

###    三级标题

## 六. 二级标题

###    三级标题