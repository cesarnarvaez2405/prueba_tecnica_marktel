import { defineStore } from "pinia";
import authService from "../services/authService";

export const useAuthStore = defineStore("useAuth", {
  state: () => {
    return {
      estado: "Checking",
      rol: "",
      time: "",
    };
  },

  actions: {
    async login(user) {
      const response = await authService.login(user);
      if (!response) {
        return;
      }
      localStorage.setItem("token", response.token);
      this.rol = response.payload.rol;
      this.time = response.payload.time;
      this.estado = "inLogin";
      return response;
    },
  },
});
