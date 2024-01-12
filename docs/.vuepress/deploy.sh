#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn run docs:build

## 代码推送到github
yarn run push

# 进入生成的文件夹
cd docs/.vuepress/dist

# 复制readme
cp ../../../docs/README.md .

# 如果是发布到自定义域名
# echo 'xiaoying.org.cn' > CNAME

git init
git add -A
git commit -m 'first commit'
git branch -M main

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# 更改为自己的github地址
# git push -f git@github.com:liyao52033/liyao52033.github.io.git main

# 切换回18版本
# nvm use 18

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
