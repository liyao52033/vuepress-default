const fs = require('fs');
const glob = require('glob');
const matter = require('gray-matter');

// 获取所有Markdown文件
const files = glob.sync('docs/**/*.md');


// 要修改的字段名称和新值
const fieldToModify = 'title'; // 替换成你要修改的字段名
const newValue = '修改后的值';

// 遍历Markdown文件并修改字段的值
files.forEach((file) => {
  try {
    const content = fs.readFileSync(file, 'utf-8');
    const { data, content: markdownContent } = matter(content);

    // 修改字段的值
    if (data[fieldToModify]) {
      data[fieldToModify] = newValue;
    }

    // 将修改后的frontmatter重新写入文件中
    const updatedContent = matter.stringify(markdownContent, data);
    fs.writeFileSync(file, updatedContent, 'utf-8');
    console.log(`修改字段在 ${file}`);
  } catch (error) {
    console.error(`在 ${file} 中修改字段时出错：${error.message}`);
  }
});
