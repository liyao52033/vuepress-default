#!/bin/bash

# 设置sitemap文件名和输出目录
OUTPUT_DIR="docs"
SITEMAP_FILE="${OUTPUT_DIR}/sitemap.xml"

# 创建sitemap文件的头部
echo '<?xml version="1.0" encoding="UTF-8"?>' > "${SITEMAP_FILE}"
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">' >> "${SITEMAP_FILE}"

# 使用find命令查找docs目录下的.md文件并生成sitemap
find docs -type f -name "*.md" | while read -r MD_FILE
do
  # 从Markdown文件中提取permalink字段
  PERMALINK=$(grep -m 1 '^permalink:' "$MD_FILE" | sed 's/permalink: //')

  if [ -z "$PERMALINK" ]; then
    # 如果没有找到permalink字段，使用文件名作为默认值
    URL="https://xiaoying.org.cn/$(basename "$MD_FILE" .md).html"
  else
    # 使用permalink字段作为URL的一部分
    URL="https://xiaoying.org.cn$PERMALINK"
  fi

   # 根据页面类型或内容更新频率，设置合适的 <changefreq>
    if [[ "$MD_FILE" == *"pages"* ]]; then
      CHANGEFREQ="weekly"
    else
      CHANGEFREQ="daily"
    fi

  # shellcheck disable=SC2129
  echo "  <url>" >> "${SITEMAP_FILE}"
  echo "    <loc>${URL}</loc>" >> "${SITEMAP_FILE}"
  echo "    <lastmod>$(TZ='Asia/Shanghai' date -u -d "+8 hours" +%Y-%m-%dT%H:%M:%SZ)</lastmod>" >> "${SITEMAP_FILE}"
  echo "    <changefreq>${CHANGEFREQ}</changefreq>" >> "${SITEMAP_FILE}"
  echo "  </url>" >> "${SITEMAP_FILE}"
done

# 添加sitemap文件的尾部
echo '</urlset>' >> "${SITEMAP_FILE}"

echo "sitemap.xml 文件已生成。"
