#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

// 简单的颜色输出函数，替代chalk
const colors = {
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  bold: {
    blue: (text) => `\x1b[1m\x1b[34m${text}\x1b[0m`,
    green: (text) => `\x1b[1m\x1b[32m${text}\x1b[0m`
  }
};

/**
 * 清理图片URL中的查询参数
 * 将 https://img.xiaoying.org.cn/img/202401141510330.png?q-sign-algorithm=... 
 * 替换为 https://img.xiaoying.org.cn/img/202401141510330.png
 * 同时将旧域名 https://xxx.cos.ap-shanghai.myqcloud.com/img/...
 * 替换为新域名 https://img.xiaoying.org.cn/img/... 并移除查询参数
 */

class ImageUrlCleaner {
  constructor(options = {}) {
    this.baseDir = options.baseDir || './docs';
    this.filePattern = options.filePattern || '**/*.md';
    this.dryRun = options.dryRun || false;
    this.stats = {
      filesProcessed: 0,
      filesModified: 0,
      urlsReplaced: 0
    };
  }

  /**
   * 获取所有需要处理的Markdown文件
   */
  async getMarkdownFiles() {
    const pattern = path.join(this.baseDir, this.filePattern).replace(/\\/g, '/');
    try {
      const files = await glob.glob(pattern, { ignore: ['**/node_modules/**'] });
      return files;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 清理URL中的查询参数
   * @param {string} content - 文件内容
   * @returns {object} - { content: 处理后的内容, replacements: 替换次数 }
   */
  cleanUrls(content) {
    let replacements = 0;
    let cleanedContent = content;

    // 首先处理旧域名替换：将 aurora-1258839075.cos.ap-shanghai.myqcloud.com 替换为 img.xiaoying.org.cn，并移除查询参数
    const oldDomainPattern = /https:\/\/aurora-1258839075\.cos\.ap-shanghai\.myqcloud\.com\/(img\/[^?\s)]*)\?[^)\s]*/g;
    cleanedContent = cleanedContent.replace(oldDomainPattern, (match, path) => {
      replacements++;
      const newUrl = `https://img.xiaoying.org.cn/${path}`;
      console.log(colors.yellow(`  替换: ${match}`));
      console.log(colors.green(`  为:   ${newUrl}`));
      return newUrl;
    });

    // 然后处理新域名下的查询参数移除
    const urlPattern = /(https:\/\/img\.xiaoying\.org\.cn\/[^?\s)]*)\?[^)\s]*/g;
    cleanedContent = cleanedContent.replace(urlPattern, (match, baseUrl) => {
      replacements++;
      console.log(colors.yellow(`  替换: ${match}`));
      console.log(colors.green(`  为:   ${baseUrl}`));
      return baseUrl;
    });

    return {
      content: cleanedContent,
      replacements
    };
  }

  /**
   * 处理单个文件
   * @param {string} filePath - 文件路径
   */
  async processFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const result = this.cleanUrls(content);

      this.stats.filesProcessed++;

      if (result.replacements > 0) {
        console.log(colors.blue(`\n处理文件: ${filePath}`));
        console.log(colors.cyan(`  发现 ${result.replacements} 个需要替换的URL`));

        if (!this.dryRun) {
          await fs.writeFile(filePath, result.content, 'utf8');
          console.log(colors.green(`  ✓ 文件已更新`));
        } else {
          console.log(colors.yellow(`  ⚠ 预览模式，文件未实际修改`));
        }

        this.stats.filesModified++;
        this.stats.urlsReplaced += result.replacements;
      }
    } catch (error) {
      console.error(colors.red(`处理文件 ${filePath} 时出错:`), error.message);
    }
  }

  /**
   * 执行清理操作
   */
  async run() {
    console.log(colors.bold.blue('\n🚀 开始清理图片URL查询参数...\n'));
    console.log(colors.gray(`基础目录: ${this.baseDir}`));
    console.log(colors.gray(`文件模式: ${this.filePattern}`));
    console.log(colors.gray(`预览模式: ${this.dryRun ? '是' : '否'}\n`));

    try {
      const files = await this.getMarkdownFiles();
      console.log(colors.cyan(`找到 ${files.length} 个Markdown文件\n`));

      if (files.length === 0) {
        console.log(colors.yellow('没有找到需要处理的文件'));
        return;
      }

      // 处理所有文件
      for (const file of files) {
        await this.processFile(file);
      }

      // 显示统计信息
      this.showStats();

    } catch (error) {
      console.error(colors.red('执行过程中出错:'), error.message);
      process.exit(1);
    }
  }

  /**
   * 显示统计信息
   */
  showStats() {
    console.log(colors.bold.green('\n✅ 处理完成！'));
    console.log(colors.cyan('统计信息:'));
    console.log(`  处理文件数: ${this.stats.filesProcessed}`);
    console.log(`  修改文件数: ${this.stats.filesModified}`);
    console.log(`  替换URL数: ${this.stats.urlsReplaced}`);

    if (this.dryRun) {
      console.log(colors.yellow('\n⚠ 这是预览模式，实际文件未被修改'));
      console.log(colors.yellow('要执行实际修改，请运行: node utils/cleanImageUrls.js --apply'));
    }
  }
}

// 命令行参数处理
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    dryRun: true, // 默认为预览模式
    baseDir: './docs'
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--apply':
        options.dryRun = false;
        break;
      case '--dir':
        options.baseDir = args[++i];
        break;
      case '--help':
      case '-h':
        showHelp();
        process.exit(0);
        break;
    }
  }

  return options;
}

function showHelp() {
  console.log(colors.bold.blue('\n图片URL清理工具'));
  console.log(colors.gray('清理Markdown文件中图片URL的查询参数，并将旧域名替换为新域名\n'));

  console.log(colors.yellow('用法:'));
  console.log('  node utils/cleanImageUrls.js [选项]\n');

  console.log(colors.yellow('选项:'));
  console.log('  --apply     执行实际修改（默认为预览模式）');
  console.log('  --dir <路径> 指定要处理的目录（默认: ./docs）');
  console.log('  --help, -h  显示帮助信息\n');

  console.log(colors.yellow('功能:'));
  console.log('  - 移除 img.xiaoying.org.cn 域名图片URL的查询参数');
  console.log('  - 将 aurora-1258839075.cos.ap-shanghai.myqcloud.com 域名替换为 img.xiaoying.org.cn 并移除查询参数\n');

  console.log(colors.yellow('示例:'));
  console.log('  node utils/cleanImageUrls.js              # 预览模式');
  console.log('  node utils/cleanImageUrls.js --apply      # 执行实际修改');
  console.log('  node utils/cleanImageUrls.js --dir ./src  # 指定目录');
}

// 主程序入口
async function main() {
  const options = parseArgs();
  const cleaner = new ImageUrlCleaner(options);
  await cleaner.run();
}

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(error => {
    console.error(colors.red('程序执行失败:'), error);
    process.exit(1);
  });
}

module.exports = ImageUrlCleaner;
