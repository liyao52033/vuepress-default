# 工具脚本说明

## cleanImageUrls.js - 图片URL清理工具

### 功能描述
这个脚本用于清理Markdown文件中`img.xiaoying.org.cn`域名图片URL的查询参数。

**示例转换：**
```
原始URL: https://img.xiaoying.org.cn/img/202401141510330.png?q-sign-algorithm=sha1&q-ak=AKIDlOsIWjolbMzQrQyRwNfoovASl088zhGh&q-sign-time=1705216259;9000000000&q-key-time=1705216259;9000000000&q-header-list=&q-url-param-list=&q-signature=43e2f55bb24101b579757d7c837fe0fac8da85fb

清理后: https://img.xiaoying.org.cn/img/202401141510330.png
```

### 使用方法

#### 1. 使用npm scripts（推荐）

**预览模式（不修改文件）：**
```bash
npm run clean-urls
```

**执行实际修改：**
```bash
npm run clean-urls:apply
```

#### 2. 直接运行脚本

**预览模式：**
```bash
node utils/cleanImageUrls.js
```

**执行实际修改：**
```bash
node utils/cleanImageUrls.js --apply
```

**指定目录：**
```bash
node utils/cleanImageUrls.js --dir ./src --apply
```

**查看帮助：**
```bash
node utils/cleanImageUrls.js --help
```

### 命令行选项

- `--apply`: 执行实际修改（默认为预览模式）
- `--dir <路径>`: 指定要处理的目录（默认: `./docs`）
- `--help, -h`: 显示帮助信息

### 安全特性

1. **预览模式**: 默认运行在预览模式，只显示将要进行的更改，不实际修改文件
2. **详细日志**: 显示每个被替换的URL，便于确认更改
3. **统计信息**: 显示处理的文件数量和替换的URL数量
4. **错误处理**: 遇到错误时会显示详细信息，不会中断整个处理过程

### 处理范围

- **文件类型**: 仅处理`.md`（Markdown）文件
- **URL模式**: 仅匹配`https://img.xiaoying.org.cn/`域名下的图片URL
- **查询参数**: 移除URL中`?`及其后面的所有内容
- **排除目录**: 自动排除`node_modules`目录

### 输出示例

```
🚀 开始清理图片URL查询参数...

基础目录: ./docs
文件模式: **/*.md
预览模式: 是

找到 15 个Markdown文件

处理文件: docs/01.前端/01.JavaScript/10.示例.md
  发现 2 个需要替换的URL
  替换: https://img.xiaoying.org.cn/img/202401141510330.png?q-sign-algorithm=sha1&q-ak=...
  为:   https://img.xiaoying.org.cn/img/202401141510330.png
  替换: https://img.xiaoying.org.cn/img/202401141510331.png?q-sign-algorithm=sha1&q-ak=...
  为:   https://img.xiaoying.org.cn/img/202401141510331.png
  ⚠ 预览模式，文件未实际修改

✅ 处理完成！
统计信息:
  处理文件数: 15
  修改文件数: 3
  替换URL数: 5

⚠ 这是预览模式，实际文件未被修改
要执行实际修改，请运行: node utils/cleanImageUrls.js --apply
```

### 注意事项

1. **备份建议**: 虽然脚本有预览模式，但建议在执行实际修改前备份重要文件
2. **版本控制**: 如果使用Git等版本控制系统，可以通过版本控制来恢复更改
3. **测试建议**: 先在小范围目录上测试脚本功能
4. **URL格式**: 脚本专门针对`img.xiaoying.org.cn`域名，其他域名的URL不会被处理
