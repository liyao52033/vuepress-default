const fs = require('fs');
const glob = require('glob');
const matter = require('gray-matter');

// 获取所有Markdown文件
const files = glob.sync('docs/**/*.md');

// 要删除的字段名称
const fieldToDelete = 'author'; // 替换成你要删除的字段名

// 遍历Markdown文件并删除字段及其值
files.forEach((file) => {
  try {
    const content = fs.readFileSync(file, 'utf-8');
    const { data, content: markdownContent } = matter(content);

    // 删除指定字段及其值
    if (data[fieldToDelete] !== undefined) {
      delete data[fieldToDelete];
    }

    // 将修改后的frontmatter重新写入文件中
    const updatedContent = matter.stringify(markdownContent, data);
    fs.writeFileSync(file, updatedContent, 'utf-8');
    console.log(`字段 ${fieldToDelete} 及其值已从 ${file} 中删除`);
  } catch (error) {
    console.error(`在 ${file} 中删除字段时出错：${error.message}`);
  }
});

console.log(`删除字段 ${fieldToDelete} 及其值的操作已完成。`);
