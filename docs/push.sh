#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e
git init
git add -A
git commit -m '新增freemarker文章,完善tags标签'
git branch -M main
git push -f git@github.com:liyao52033/vuepress-default.git main

