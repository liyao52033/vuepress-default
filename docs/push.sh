#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e
git init
git add -A
git commit -m '新增代码生成器-命令行开发'
git branch -M main
git push -f git@github.com:liyao52033/vuepress-default.git main

