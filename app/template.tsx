// 路由进场过渡：用纯 CSS 动画（不依赖 JS 水合），避免脚本慢/失败时内容卡在透明。
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
