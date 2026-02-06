# 📘 Project Best Practices

## 1. 项目宗旨（Project Purpose）
本仓库是基于 VuePress v1 与 vdoing 主题构建的文档/博客站点，目标是为前端、后端、运维与工具相关内容提供结构化、可搜索、可持续维护的知识库。重点关注：
- 快速首屏渲染与稳定的静态内容交付
- 低成本维护与可持续扩展（支持自动化 frontmatter、链接清理、站点地图）
- 在 EdgeOne 等边缘平台上高效部署与缓存

## 2. 项目结构（Project Structure）
- docs/: 站点主内容（Markdown 文档），按照主题与领域分目录管理
- frontmatter/: 批量处理文章 Frontmatter 的脚本（.mjs 模块）
- utils/: 站点维护脚本（如图片 URL 清洗、Frontmatter 更新）
- patches/: 使用 patch-package 对依赖做定制补丁，postinstall 自动应用
- .babelrc、config.json、README.md: 通用配置与说明
- package.json: 脚本与依赖管理

关键脚本（package.json -> scripts）：
- docs:dev：本地开发预览
- docs:build：生产构建（已设置 Node 选项与内存上限，适配大型内容库）
- deploy:eop：构���并通过 EdgeOne Pages 部署
- sitemap、clean-urls、editFm：内容质量与 SEO 维护工具

说明：构建与主题配置位于 docs/.vuepress/ 目录（未在清单中显式列出），涉及站点元信息、导航、主题与打包优化等。

## 3. 测试策略（Test Strategy）
本项目以内容为主，不引入传统单元测试框架。建议采用以下“文档站适配”的质量保障策略：
- 构建测试：每次提交至少执行 docs:build，保证构建可通过
- 链接测试：引入链接检查（如 markdown-link-check 或自建脚本），避免死链/重定向链过长
- 可访问性与性能检测：
  - 使用 Lighthouse 对关键页面进行分期检测（首页/分类页/文章页）
  - 注意 CLS/LCP 指标，持续优化首屏资源体积与加载顺序
- 文案质量：引入 Markdown Lint（如 markdownlint）规约标题层级、列表、代码块
- 变更前置校验：建议在 CI 增加“构建+链接检查+lint”合并前校验

## 4. 代码与内容风格（Code Style）
- Markdown：
  - Frontmatter 统一使用 YAML，字段规范化（title, date, categories, tags, sticky, author 等），由 frontmatter 工具保障一致性
  - 标题层级自洽（H1 唯一，H2-H4 逐级递进），利于主题目录与锚点生成
  - 图片引用相对路径优先，使用 webp/压缩版，必要处添加宽高以减少布局偏移（CLS）
- 脚本（Node/ESModules）：
  - 在 frontmatter/ 与 utils/ 中保持 ESM 规范（.mjs）与 Node API（fs-extra、glob 等）的一致使用
  - 命名清晰、单一职责：读/写/转换分离，避免脚本耦合
- 错误处理：
  - 批处理脚本应对 IO/解析错误进行捕获并输出上下文（文件路径、行号、字段名）
  - 失败时返回非 0 码，便于 CI 阶段失败快
- 注释与文档：在脚本头部说明用途、输入输出与使用示例；对 patch-package 补丁注明原因与上游 issue 链接

## 5. 常用模式（Common Patterns）
- 构建与性能优化：
  - shouldPrefetch/shouldPreload 控制：在 VuePress 配置中关闭无关预取，降低首屏压力
  - 图片懒加载：已使用 vuepress-plugin-img-lazy，继续搭配占位符/显式宽高减少 CLS
  - 代码分割与缓存：利用 VuePress/webpack 的 chunk hash 静态化，部署端启用长效缓存
- 内容自动化：
  - frontmatter 工具批量生成/校验元数据
  - utils/cleanImageUrls.js 保持资源链接规范与可控
- 依赖定制：
  - patches/ 下通过 patch-package 修补上游问题，postinstall 自动应用；严格记录补丁背景

## 6. Do’s and Don’ts（规范与禁忌）
- ✅ Do’s
  - 使用 docs:build 验证每次提交可构建
  - 在 VuePress 配置中：
    - shouldPrefetch: () => false
    - 对关键路由（首页/列表页）合理开启 shouldPreload 仅限首屏关键资源
  - 所有图片：
    - 统一压缩（webp 优先，次选高压缩 JPEG/PNG），并提供宽高或占位
    - 使用相对路径与可控目录，避免第三方慢域名
  - 引入第三方脚本/样式前先评估体积与阻塞性（defer/async/按需加载）
  - 充分利用 CDN/边缘缓存（EdgeOne）：长缓存 immutable；HTML 短缓存+自动刷新
  - 使用 sitemap 与 robots.txt 优化抓取；定期检查 404/重定向
  - 通过前置脚本（clean-urls、editFm）在 PR 前清理与规范化内容

- ❌ Don’ts
  - 禁止在首页/首屏路由加载不必要的沉重脚本（评论系统、统计 SDK 等需路由懒加载）
  - 不要上传未压缩的大图/视频到仓库，视频外链或使用 HLS 分发
  - 避免在 Markdown 内直接内联大量 HTML/JS，影响可维护性与 SEO
  - 不要绕过 patch-package 直接改 node_modules，改动无法持久化

## 7. 工具与依赖（Tools & Dependencies）
- 框架与主题
  - vuepress@1.x：静态站点生成
  - vuepress-theme-vdoing：博客/文档主题
- 插件
  - vuepress-plugin-img-lazy：图片懒加载
  - @vuepress/plugin-active-header-links、@vuepress/plugin-back-to-top：导航与交互增强
  - （已安装）@docsearch/js 与 @docsearch/css：建议按官方指引集成站内搜索，并懒加载初始化
- 构建与辅助
  - patch-package：依赖补丁管理（postinstall 自动应用）
  - fs-extra、glob、gray-matter、yamljs：内容处理
  - moment：时间字段处理（建议逐步切换为原生 Intl/Day.js 以减小体积）
- 运行与部署
  - 开发：yarn docs:dev
  - 构建：yarn docs:build
  - 部署（EdgeOne Pages）：yarn deploy:eop（构建后将 ./docs/.vuepress/dist 发布）

部署端（EdgeOne/CDN）性能建议：
- 启用 Brotli/Gzip 压缩（text/html, text/css, application/javascript, image/svg+xml）
- 开启 HTTP/2/3 与 TLS1.3
- 缓存策略：
  - 静态资源（.js/.css/.img）：Cache-Control: public, max-age=31536000, immutable（文件名已含 hash）
  - HTML：短缓存（如 60-300s）+ stale-while-revalidate，确保更新即时生效
- 边缘缓存规则对 /assets/、/img/ 等进行长缓存，对页面路径（/、/tags/、/categories/）短缓存

## 8. 其他说明（LLM 生成代码与内容注意事项）
- 生成 Markdown：
  - 始终包含规范 Frontmatter；标题层级正确；代码块使用合适语言高亮
  - 图片资源提前准备压缩版并给出宽高；大图使用缩略图并可点击放大
- 生成脚本：
  - 使用 ESM（.mjs）与 fs-extra；输出明确日志与错误码
  - 批量处理前先 dry-run，再通过 --apply 或环境变量控制写入
- VuePress 配置优化（建议落地到 docs/.vuepress/config.js）：
  - shouldPrefetch: () => false
  - chainWebpack: 合理分包与最小化（生产模式下 Terser 保留必要注释设置）
  - markdown.optimize: 关闭不必要的插件，减少客户端 JS
  - 按需引入评论/统计等第三方，仅在文章详情页懒加载
- SEO 与可观测性：
  - 生成并提交 sitemap.xml；在 404 与重定向页添加清晰导航
  - 可选接入 RUM/性能上报（defer 且采样），监控 LCP/CLS/FID

（本最佳实践文件将随项目演进持续更新，遇到依赖升级或补丁变更请在此同步记录策略与影响范围。）
