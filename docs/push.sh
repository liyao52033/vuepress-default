#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e
git init
git add -A
git commit -m '新增站点信息'
git branch -M main

# 更改为自己的github地址
git push -f git@github.com:liyao52033/vuepress-default.git main

