#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

#生成sitemap.xml
yarn run sitemap

# 生成静态文件
yarn run docs:build

# 推送到github
# yarn run push

# 进入生成的文件夹
cd docs/.vuepress/dist

# 复制readme
cp ../../../docs/README.md .

# 复制sitemap.xml
cp ../../../docs/sitemap.xml .

# 复制robots.txt
cp ../../../docs/robots.txt .

cd -
