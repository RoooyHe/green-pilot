import { defineConfig } from "@rspress/core";
import ghPages from "rspress-plugin-gh-pages";

export default defineConfig({
  root: "docs",
  title: "GreenPilot",
  description: "AI零碳温室智能运营平台文档",
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/RoooyHe/green-pilot",
      },
    ],
    footer: {
      message:
        "Released under the MIT License. Copyright &copy; 2026 GreenPilot",
    },
  },
  markdown: {
    showLineNumbers: true,
  },
  llms: true,
  plugins: [
    ghPages({
      // 你的仓库地址，必填
      repo: "https://github.com/RoooyHe/green-pilot.git",
      // 可选：指定推送到的分支，默认为 'gh-pages'
      branch: "gh-pages",
      // 可选：如果你的仓库不是 <用户名>.github.io，则需要设置站点基础路径
      // 例如，仓库名为 'my-project'，则设置为 '/my-project/'
      siteBase: "/green-pilot/",
    }),
  ],
});
