import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 纯前端静态导出：可部署到 Vercel / Netlify / GitHub Pages，零运维（PRD §6.1）
  output: "export",
  images: { unoptimized: true },
  // 静态托管友好：每个路由导出为独立目录
  trailingSlash: true,
};

export default nextConfig;
