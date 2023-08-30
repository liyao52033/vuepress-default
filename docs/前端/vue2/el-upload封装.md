---
title: el-upload封装
date: 2023/8/25 11:13:21
author: 华总
autoSort: 600
tags: 
   - vue2
   - element-ui
---

父组件模板

````vue
<template>
  <div>
    <upload-component @file-selected="handleFileSelected"></upload-component>
  </div>
</template>

<script>
import UploadComponent from './UploadComponent.vue';

export default {
  components: {
    UploadComponent
  },
  methods: {
    handleFileSelected(file) {
      // 处理选中的文件
      console.log('选中的文件：', file);
      // 执行其他逻辑
    }
  }
};
</script>

````

子组件模板（UploadComponent.vue）

```vue
<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="uploadUrl"
      :on-change="handleFileChange"
    >
      <el-button slot="trigger">选取文件</el-button>
      <el-button style="margin-left: 10px;">上传到服务器</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  methods: {
    handleFileChange(file) {
      // 触发自定义事件将文件传递给父组件
      this.$emit('file-selected', file);
    }
  }
};
</script>
```

在子组件中，当文件发生变化时，通过`this.$emit`方法触发`file-selected`事件，并将文件作为参数传递给父组件。

在父组件中，使用`@file-selected`监听子组件触发的`file-selected`事件，并在`handleFileSelected`方法中处理选中的文件。

这样，当在子组件中选择文件时，会将文件传递给父组件，并在父组件中处理选中文件的逻辑。

请根据你的项目需求进行相应的修改。



<div style="float: right;font-size: .9em;line-height: 30px;">
  <div>
     <span style="font-weight: 500;color: #4e6e8e;">By: </span> 
     <span style="font-weight: 400; color: #767676;">{{ $page.frontmatter.author }}   </span>
  </div>
</div>
