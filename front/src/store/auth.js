import { defineStore } from "pinia";
import authService from "../services/authService";

export const useAuthStore = defineStore("useAuth", {
  state: () => {
    return {
      estado: "Checking",
    };
  },

  actions: {
    async login(user) {
      const response = await authService.login(user);
      localStorage.setItem("token", response.token);
      this.estado = "inLogin";
      return response;
    },
  },
});
