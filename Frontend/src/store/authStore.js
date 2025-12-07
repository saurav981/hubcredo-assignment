import axios from "axios";
import { create } from "zustand";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth`;
axios.defaults.withCredentials = true;

export const useAuthStore = create((set, get) => ({
  user: null,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  isAuthenticated: false,

  resetError: () => set({ error: null }),

  handleError: (error, customMessage) => {
    const errorMessage = error.response?.data?.message || customMessage;
    set({ error: errorMessage, isLoading: false });
    throw error;
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });

    try {
      const { data } = await axios.get(`${API_URL}/check-auth`);
      set({
        user: data.user,
        isCheckingAuth: false,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      error;
      set({
        user: null,
        error: null,
        isCheckingAuth: false,
        isAuthenticated: false,
      });
    } finally {
      set({
        isLoading: false,
        isCheckingAuth: false,
      });
    }
  },

  login: async (loginData) => {
    get().resetError();
    set({ isLoading: true });

    try {
      const { data } = await axios.post(`${API_URL}/login`, loginData);

      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      get().handleError(error, "Error logging in");
    }
  },

  signup: async (signUpData) => {
    get().resetError();
    set({ isLoading: true });

    try {
      const { data } = await axios.post(`${API_URL}/signup`, signUpData);

      set({
        user: data.user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      get().handleError(error, "Error signing up");
    }
  },

  logout: async () => {
    get().resetError();
    set({ isLoading: true });

    try {
      await axios.post(`${API_URL}/logout`);

      set({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
    } catch (error) {
      get().handleError(error, "Error logging out");
    }
  },
}));
