const fs = require('fs');
const glob = require('glob');
const matter = require('gray-matter');

// 获取所有Markdown文件
const files = glob.sync('docs/**/*.md');

// 要添加的字段名称和值
const fieldToAdd = 'article'; // 替换为你要添加的字段名
const fieldValue = false; // 替换为你要添加的字段值

// 遍历Markdown文件并添加字段及其值
files.forEach((file) => {
  try {
    const content = fs.readFileSync(file, 'utf-8');
    const { data, content: markdownContent } = matter(content);

    // 检查标题是否为"侧边栏测试"，然后添加指定字段及其值
    if (data.title === '导航栏示例') {
      data[fieldToAdd] = fieldValue;

      // 将修改后的frontmatter重新写入文件中
      const updatedContent = matter.stringify(markdownContent, data);
      fs.writeFileSync(file, updatedContent, 'utf-8');
      console.log(`${fieldToAdd}: ${fieldValue} 已添加到 ${file} 中`);
    }
  } catch (error) {
    console.error(`在 ${file} 中添加字段时出错：${error.message}`);
  }
});

console.log(`添加字段 ${fieldToAdd} 的操作已完成。`);
