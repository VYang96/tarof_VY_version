import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

// 英文衬线（PRD §6.3：Cormorant）。中文衬线走系统字体栈（见 globals.css），
// 避免为 CJK 字体在静态导出时下载数 MB 的字重文件。
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "月语塔罗 · Moon-speak Tarot",
  description: "固定牌义为核心的塔罗占卜 · 离线可用 · 纯前端 PWA",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "月语塔罗",
  },
};

export const viewport: Viewport = {
  themeColor: "#14121f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      data-theme="dark"
      className={`${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="aurora" aria-hidden />
        <div className="starfield" aria-hidden />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
