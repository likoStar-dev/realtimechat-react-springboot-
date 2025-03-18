import { create } from "zustand";
import { TOKEN_KEY } from "../utils/constants";
import { checkTokenApi, loginApi, registerApi } from "../api";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  setUser: (user) => set({ user }),
  registerWithCredentials: async (userData) => {
    set({ loading: true });
    const user = await registerApi(userData);
    set({ user });
    return user;
  },
  loginWithCredentials: async (credentials) => {
    set({ loading: true });
    const user = await loginApi(credentials);
    console.log("login-credentials", user);
    set({ user, loading: false });
    return user;
  },
  logOut: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ user: null });
  },
  isAuthenticated: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!get().user && token) {
      set({ loading: true });
      const user = await checkTokenApi(token);
      if (user) set({ user, loading: false });
    }
    return !!get().user;
  },
}));
