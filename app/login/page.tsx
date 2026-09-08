"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/store/auth";
import { useSettings } from "@/lib/store/settings";

const T = {
  signInTitle: { zh: "欢迎回来", en: "Welcome back" },
  signUpTitle: { zh: "创建账户", en: "Create account" },
  subtitle: {
    zh: "登录后即可占卜、保存历史，并跨设备同步你的月语。",
    en: "Sign in to read, save your history, and sync your Moon-speak across devices.",
  },
  email: { zh: "邮箱", en: "Email" },
  password: { zh: "密码", en: "Password" },
  signIn: { zh: "登录", en: "Sign in" },
  signUp: { zh: "注册", en: "Sign up" },
  toSignUp: { zh: "还没有账户？去注册", en: "No account? Sign up" },
  toSignIn: { zh: "已有账户？去登录", en: "Have an account? Sign in" },
  skip: { zh: "先随便看看", en: "Just browse for now" },
  demoNote: {
    zh: "演示：当前为本地登录，尚未接入后端账户系统。",
    en: "Demo: local sign-in only; backend accounts not connected yet.",
  },
};

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/";
  const locale = useSettings((s) => s.locale);
  const signIn = useAuth((s) => s.signIn);
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const tr = (o: { zh: string; en: string }) => (locale === "zh" ? o.zh : o.en);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    signIn(email.trim()); // 前端原型：后端接好后改为调用 /auth/login|register
    router.replace(next);
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center gap-6 py-8">
      <div className="text-center">
        <div className="text-4xl text-gold [text-shadow:0_0_20px_rgba(214,172,87,0.5)]">☾</div>
        <h2 className="text-shimmer mt-2 font-serif text-3xl">
          {mode === "in" ? tr(T.signInTitle) : tr(T.signUpTitle)}
        </h2>
        <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-fg-muted">
          {tr(T.subtitle)}
        </p>
      </div>

      <motion.form
        onSubmit={submit}
        initial={{ y: 10 }}
        animate={{ y: 0 }}
        className="space-y-3"
      >
        <label className="block">
          <span className="mb-1 block text-xs text-fg-muted">{tr(T.email)}</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-border bg-bg-elev p-3 text-fg placeholder:text-fg-muted/50 focus:border-gold focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-fg-muted">{tr(T.password)}</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl border border-border bg-bg-elev p-3 text-fg placeholder:text-fg-muted/50 focus:border-gold focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="press glow-gold w-full rounded-full bg-gold py-3 font-serif text-bg transition-opacity hover:opacity-90"
        >
          {mode === "in" ? tr(T.signIn) : tr(T.signUp)}
        </button>
      </motion.form>

      <div className="flex flex-col items-center gap-2 text-center text-sm">
        <button
          onClick={() => setMode(mode === "in" ? "up" : "in")}
          className="press text-gold-soft hover:text-gold"
        >
          {mode === "in" ? tr(T.toSignUp) : tr(T.toSignIn)}
        </button>
        <button
          onClick={() => router.replace("/")}
          className="press text-xs text-fg-muted hover:text-fg"
        >
          {tr(T.skip)}
        </button>
      </div>

      <p className="text-center text-[11px] text-fg-muted/60">{tr(T.demoNote)}</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
