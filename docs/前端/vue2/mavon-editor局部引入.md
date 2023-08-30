---
title: mavon-editor局部引入
date: 2023/8/25 11:13:21
author: 华总
autoSort: 700
tags: 
   - vue2
   - element-ui
---

editor.vue

```html
<template>
    <div id="editor">
        <mavon-editor style="height: 100%"></mavon-editor>
    </div>
</template>
<script>
// Local Registration
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
    name: 'editor',
    components: {
        mavonEditor
        // or 'mavon-editor': mavonEditor
    }
}
</script>
<style>
#editor {
    margin: auto;
    width: 80%;
    height: 580px;
}
</style>
```

main.js

```javascript
import Vue from 'vue';
  var editor = require('./editor.vue');
  new Vue({
    el: '#main',
    render: h => h(editor)
});



```

将文件名与文件路径插入当前光标位置，这是mavon-editor 内置的方法

```javascript
const $vm = this.$refs.md
    $vm.insertText($vm.getTextareaDom(),
      {
        prefix: `[${file.name}](${res.data.path})`,
        subfix: '',
        str: ''
      })
```

<div style="float: right;font-size: .9em;line-height: 30px;">
  <div>
     <span style="font-weight: 500;color: #4e6e8e;">By: </span> 
     <span style="font-weight: 400; color: #767676;">{{ $page.frontmatter.author }}   </span>
  </div>
</div>
