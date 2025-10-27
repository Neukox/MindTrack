import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/lib/types/user.type";
import { setAuthToken } from "../../../lib/api/axios";

interface AuthState {
  isLoading: boolean;
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoading: false,
      user: null,
      token: null,
      login: (token: string) => {
        setAuthToken(token);
        set({ token });
      },
      logout: () => {
        setAuthToken(null);
        set({
          user: null,
          token: null,
        });
      },
      setUser: (user: User) => set({ user }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: "user-storage", // nome do item no localStorage
      partialize: (state) => ({
        user: state.user,
      }), // salvar apenas o usuário no localStorage
    },
  ),
);

export default useAuthStore;
