"use client";
import { useEffect } from "react";

/** 注册 Service Worker（仅生产环境） */
export function PWARegister() {
  useEffect(() => {
    if (
      process.env.NODE_ENV === "production" &&
      "serviceWorker" in navigator
    ) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* 静默失败：SW 非核心功能 */
      });
    }
  }, []);
  return null;
}
