// 登录态（前端原型）：用 localStorage 模拟会话，后端接入 JWT 后替换此层即可。
// 真实实现应改为：signIn -> POST /auth/login 取 token；user 由 /me 返回。
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AuthUser {
  email: string;
}

interface AuthState {
  user: AuthUser | null;
  hydrated: boolean; // 本地存储是否已回填，避免首帧误判未登录
  signIn: (email: string) => void;
  signOut: () => void;
  setHydrated: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hydrated: false,
      signIn: (email) => set({ user: { email } }),
      signOut: () => set({ user: null }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "moonspeak-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ user: s.user }),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    }
  )
);
