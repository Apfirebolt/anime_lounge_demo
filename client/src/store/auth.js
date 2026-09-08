// stores/auth.js
import { defineStore } from "pinia";
import Cookie from "js-cookie";
import { httpClient } from "../plugins/interceptor";
import { toast } from 'vue3-toastify';
import { toastOptions } from "../utils";

export const useAuth = defineStore("auth", {
  state: () => {
    let parsedUser = null;
    try {
      const cookieVal = Cookie.get("user");
      if (cookieVal) parsedUser = JSON.parse(cookieVal);
    } catch {
      Cookie.remove("user");
    }

    return {
      authData: parsedUser,
      profileData: null,
      loading: false,
      success: false,
    };
  },

  getters: {
    getAuthData: (state) => state.authData,
    getProfileData: (state) => state.profileData,
    isLoading: (state) => state.loading,
    isSuccess: (state) => state.success,
    isLoggedIn: (state) => !!state.authData,
  },

  actions: {
    async loginAction(loginData) {
      this.loading = true;
      try {
        const response = await httpClient.post("auth/login", loginData);
        if (response.data) {
          this.authData = response.data;
          this.success = true;
          toast.success("Welcome back to AnimeLounge!", toastOptions);
          Cookie.set("user", JSON.stringify(response.data), { expires: 30, sameSite: 'lax' });
          return response.data;
        }
      } catch (error) {
        const message = error.response?.data?.detail || "Invalid credentials. Please try again.";
        toast.error(message, toastOptions);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async registerAction(registerData) {
      this.loading = true;
      try {
        const response = await httpClient.post("auth/register", registerData);
        if (response.data && (response.status === 201 || response.status === 200)) {
          this.success = true;
          toast.success("Account created successfully! Please sign in.", toastOptions);
          return response.data;
        }
      } catch (error) {
        const message = error.response?.data?.detail || error.response?.data?.message || "Registration failed.";
        toast.error(message, toastOptions);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.authData = null;
      this.profileData = null;
      Cookie.remove("user");
      toast.success("Logged out successfully!", toastOptions);
    },

    resetSuccess() {
      this.success = false;
    },

    resetAuth() {
      this.authData = null;
    },
  },
});