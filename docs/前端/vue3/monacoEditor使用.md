---
title: monacoEditor使用
autoSort: 990
permalink: /pages/5bd4db/
categories: 
  - 前端
  - vue3
tags: 
  - null
titleTag: 原创
date: 2023-08-24 14:22:02
author: 
  name: 华总
  link: https://liyao52033.github.io/
---



>基于vue3 + vite4 + element-plus
>
>官网： https://github.com/microsoft/monaco-editor
>
>演示： https://microsoft.github.io/monaco-editor/playground.html?source=v0.40.0#example-creating-the-editor-hello-world

## 1. 安装

```bash
npm install monaco-editor
```

## 2. 使用及封装

```vue
<template>
  <div id="editContainer" ref="editContainer" class="code-editor"></div>
</template>

<script>
import { getCurrentInstance, onMounted, watch } from 'vue';
import * as monaco from 'monaco-editor';
import 'monaco-editor/esm/vs/basic-languages/css/css.contribution'
import 'monaco-editor/esm/vs/basic-languages/xml/xml.contribution'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

// 解决vite Monaco提示错误
/**  editorSimpleWorker.js:454 Uncaught (in promise) Error: Unexpected usage
    at EditorSimpleWorker.loadForeignModule (editorSimpleWorker.js:454)
    at webWorker.js:38
  **/
self.MonacoEnvironment = {
	getWorker(_, label) {
		if (label === 'json') {
			return new JsonWorker()
		}
		if (label === 'css' || label === 'scss' || label === 'less') {
			return new CssWorker()
		}
		if (label === 'html' || label === 'handlebars' || label === 'razor') {
			return new HtmlWorker()
		}
		if (label === 'typescript' || label === 'javascript') {
			return new TsWorker()
		}
		return new EditorWorker()
	}
}
  
  
export default {
	name: 'MonacoEditor',
	props: {
	  value: {
		type:String,
		default: ''
	  },
	  language: {
		type: String,
		default: 'HTML'
	  },
	  theme: {
		type: String,
		default: 'vs-dark'
	  },
	  readOnly : {
		type: Boolean,
		default: false
	  },
	  options: {
		type: Object
	  }
	},
    emits: ['update:value'],
	setup(props, { emit }) {
		let monacoEditor = null;
		const { proxy } = getCurrentInstance();

		watch(
			() => props.value,
			(value) => {
				// 防止改变编辑器内容时光标重定向
				if (value !== monacoEditor?.getValue()) {
					monacoEditor.setValue(value);
				}
			},
		);

		onMounted(() => {
			monacoEditor = monaco.editor.create(document.getElementById('editContainer'), {
				value: props.value,
			    language: props.language,
				readOnly: props.readOnly,
				theme: props.theme,
				selectOnLineNumbers: true,
				renderSideBySide: false,
				minimap: {
					enabled: false,
				},
			   wordWrap: "on",
			});
			// 监听值变化
			monacoEditor.onDidChangeModelContent(() => {
				const currenValue = monacoEditor?.getValue();
				emit('update:value', currenValue);
			});
		});

			watch(
				() => props.value,
				newValue => {
					if (monacoEditor) {
						const value = monacoEditor.getValue()
						if (newValue !== value) {
						  monacoEditor.setValue(newValue)
						}
					}
				}
			)

			
			watch(
				() => props.readOnly,
				() => {
				  monacoEditor.updateOptions({ readOnly: props.readOnly })
				},
				{ deep: true }
			)

       //切换语言
			watch(
				() => props.language,
				newValue => {
				   monaco.editor.setModelLanguage(monacoEditor.getModel(), newValue)
				}
			)

			watch(
				() => props.options,
				newValue => {
				   monacoEditor.updateOptions(newValue)
				},
				{ deep: true }
			)


			onBeforeUnmount(() => {
			  monacoEditor.dispose() // 销毁编辑器
			})
	  
			return {};
	},
};
</script>

<style scoped>
.code-editor {
	width: 100%;
	min-height: 300px;
}
</style>

```

## 3. vite.config.ts配置

```typescript
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
    const prefix = `monaco-editor/esm/vs`; 
    build: {
	    rollupOptions: {
		     output: {
		        manualChunks: {
			          jsonWorker: [`${prefix}/language/json/json.worker`],
			          cssWorker: [`${prefix}/language/css/css.worker`],
			          htmlWorker: [`${prefix}/language/html/html.worker`],
			          tsWorker: [`${prefix}/language/typescript/ts.worker`],
			          editorWorker: [`${prefix}/editor/editor.worker`],
		                           },
		                     },
	                   },
	              },
	              
	   // 预加载项目必需的组件
	  optimizeDeps: {
      include: [
        "vue",
        "vue-router",
        "pinia",
        "axios",
        "element-plus/es/components/form/style/css",
        "element-plus/es/components/form-item/style/css",
        "element-plus/es/components/button/style/css",
        "element-plus/es/components/input/style/css",
        "element-plus/es/components/input-number/style/css",
        "element-plus/es/components/switch/style/css",
        "element-plus/es/components/upload/style/css",
        "element-plus/es/components/menu/style/css",
        "element-plus/es/components/col/style/css",
        "element-plus/es/components/icon/style/css",
        "element-plus/es/components/row/style/css",
        "element-plus/es/components/tag/style/css",
        "element-plus/es/components/dialog/style/css",
        "element-plus/es/components/loading/style/css",
        "element-plus/es/components/radio/style/css",
        "element-plus/es/components/radio-group/style/css",
        "element-plus/es/components/popover/style/css",
        "element-plus/es/components/scrollbar/style/css",
        "element-plus/es/components/tooltip/style/css",
        "element-plus/es/components/dropdown/style/css",
        "element-plus/es/components/dropdown-menu/style/css",
        "element-plus/es/components/dropdown-item/style/css",
        "element-plus/es/components/sub-menu/style/css",
        "element-plus/es/components/menu-item/style/css",
        "element-plus/es/components/divider/style/css",
        "element-plus/es/components/card/style/css",
        "element-plus/es/components/link/style/css",
        "element-plus/es/components/breadcrumb/style/css",
        "element-plus/es/components/breadcrumb-item/style/css",
        "element-plus/es/components/table/style/css",
        "element-plus/es/components/tree-select/style/css",
        "element-plus/es/components/table-column/style/css",
        "element-plus/es/components/select/style/css",
        "element-plus/es/components/option/style/css",
        "element-plus/es/components/pagination/style/css",
        "element-plus/es/components/tree/style/css",
        "element-plus/es/components/alert/style/css",
        "@vueuse/core",

        "path-to-regexp",
        "echarts",
        "@wangeditor/editor",
        "@wangeditor/editor-for-vue",
        "vue-i18n",
        "codemirror",
		`monaco-editor/esm/vs/language/json/json.worker`,
		`monaco-editor/esm/vs/language/css/css.worker`,
		`monaco-editor/esm/vs/language/html/html.worker`,
		`monaco-editor/esm/vs/language/typescript/ts.worker`,
		`monaco-editor/esm/vs/editor/editor.worker`
      ],
    },
 })
```





