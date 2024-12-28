import axios from "axios";

export default {
  namespaced: true,
  state: {
    user: null,
    token: localStorage.getItem("token") || null, // Verificar si hay un token almacenado
  },
  mutations: {
    setAuth(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        // Construir la URL completa manualmente usando la variable de entorno
        const { data } = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/api/auth/login`,
          credentials
        );
        localStorage.setItem("token", data.token); // Guardamos el token en localStorage
        commit("setAuth", { user: data.user, token: data.token }); // Actualizamos el estado de Vuex
      } catch (error) {
        console.error("Error en login:", error.response?.data?.msg || error.message);
        throw new Error(error.response?.data?.msg || "Error al iniciar sesión");
      }
    },

    async register({ dispatch }, userData) {
      try {
        // Construir la URL completa para el registro
        await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/api/auth/register`,
          userData
        );
        // Iniciar sesión automáticamente después de registrar
        dispatch("login", { email: userData.email, password: userData.password });
      } catch (error) {
        throw new Error(error.response?.data?.msg || "Error al registrarse");
      }
    },
    logout({ commit }) {
      localStorage.removeItem("token"); // Eliminar token del localStorage
      commit("clearAuth"); // Limpiar el estado en Vuex
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token; // Si hay token, el usuario está autenticado
    },
    user(state) {
      return state.user;
    },
  },
};

