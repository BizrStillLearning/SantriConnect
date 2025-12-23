import { defineStore } from "pinia";
import api from "../services/AuthService.js";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: (() => {
            try {
                const data = localStorage.getItem("user");
                return data ? JSON.parse(data) : null;
            } catch {
                localStorage.removeItem("user");
                return null;
            }
        })(),
        token: localStorage.getItem("token") || null,
    }),

    getters: {
        isAuthenticated: (state) => Boolean(state.token),
        role: (state) => state.user?.role ?? null,
    },

    actions: {
        async login(credentials) {
            try {
                const response = await api.post("/auth/login.php", credentials);

                // ✅ validasi response
                if (!response.data?.token || !response.data?.user) {
                    throw new Error("Response login tidak valid");
                }

                const { token, user } = response.data;

                this.token = token;
                this.user = user;

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                return user;
            } catch (error) {
                throw (
                    error.response?.data?.message ||
                    error.message ||
                    "Login gagal"
                );
            }
        },

        logout() {
            this.token = null;
            this.user = null;

            localStorage.removeItem('token');
            localStorage.removeItem('user');

            window.location.href = '/login';
        }
    },
});
