import { defineConfig } from "@rspress/core";

export default defineConfig({
  root: "docs",
  title: "GreenPilot",
  description: "AI零碳温室智能运营平台文档",
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/greenpilot",
      },
    ],
    footer: {
      message:
        "Released under the MIT License. Copyright &copy; 2024 GreenPilot",
    },
  },
  markdown: {
    showLineNumbers: true,
  },
  llms: true,
});
