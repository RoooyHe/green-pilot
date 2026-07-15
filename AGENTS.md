# AGENTS.md

## Project

GreenPilot — AI零碳温室智能运营平台文档站。纯文档项目，无应用代码。

## Quick Commands

```bash
bun run dev       # 开发服务器 http://localhost:3000
bun run build     # 构建到 doc_build/ 并Push到远端构建GithubPage 非主动要求不要构建
bun run preview   # 预览构建产物 http://localhost:4173
```

## Architecture

- **Package manager**: Bun (lockfile: `bun.lock`)
- **Framework**: Rspress v2.0.17（静态文档站生成器）
- **Language**: TypeScript (ESM, `"type": "module"`)
- **Docs root**: `docs/`（配置在 `rspress.config.ts` 的 `root` 字段）

### Docs Structure

```
docs/
├── _nav.json                    # 顶部导航配置
├── _meta.json                   # 侧边栏配置
├── index.md                     # 首页（pageType: home）
├── main.md                      # 项目概述
├── Architecture.md              # 系统架构
├── BusinessPlan.md              # 商业计划书
├── MarketAnalysis.md            # 市场分析
└── Background/
    ├── _meta.json               # 子目录侧边栏配置
    └── Platform-scenario.md     # 应用场景
```

### Navigation

项目使用声明式文件管理导航（推荐方式）：
- `docs/_nav.json` — 顶部导航栏
- `docs/_meta.json` — 侧边栏顺序和标签
- `docs/Background/_meta.json` — 子目录侧边栏

### v2 Migration Notes

- Import path: `rspress/config` → `@rspress/core`
- Package: `rspress` → `@rspress/core`
- Code highlighting: Shiki (built-in), no longer uses Prism
- SSG strict mode enabled by default

## Adding New Docs

1. 在 `docs/` 下创建 `.md` 文件
2. 在 `docs/_meta.json` 中添加条目控制侧边栏顺序和标签
3. 运行 `bun run build` 验证无报错

## Skills

- `.agents/skills/rspress-docs-generator/` — Rspress 文档维护指南（创建、更新、版本检测）
- `.agents/skills/rspress-custom-theme/` — Rspress 自定义主题指南（CSS 变量、布局插槽、组件覆盖）
- `.agents/skills/rspress-best-practices/` — Rspress 项目结构、配置、MDX、主题与部署最佳实践
- `.agents/skills/rspress-description-generator/` — Rspress 页面描述生成（SEO、搜索、AI 可读输出）
- `.agents/skills/rspress-v2-upgrade/` — Rspress v1 到 v2 升级迁移指南
