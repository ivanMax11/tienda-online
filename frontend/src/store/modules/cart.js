import { reactive } from "vue";

export default {
  namespaced: true,
  state: {
    cart: reactive(
      JSON.parse(localStorage.getItem("cart")) || []
    ), // Ahora es completamente reactivo
  },
  mutations: {
    ADD_TO_CART(state, producto) {
      const item = state.cart.find((p) => p.id === producto.id);
      if (item) {
        item.cantidad += producto.cantidad || 1;
      } else {
        state.cart.push({ ...producto, cantidad: 1 });
      }
      // Guarda en localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    REMOVE_FROM_CART(state, id) {
      const index = state.cart.findIndex((producto) => producto.id === id);
      if (index !== -1) {
        state.cart.splice(index, 1); // Reactivo
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    CLEAR_CART(state) {
      state.cart.splice(0, state.cart.length); // Limpia reactivamente el array
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
  actions: {
    addToCart({ commit }, producto) {
      commit("ADD_TO_CART", producto);
    },
    removeFromCart({ commit }, id) {
      commit("REMOVE_FROM_CART", id);
    },
    clearCart({ commit }) {
      commit("CLEAR_CART");
    },
  },
  getters: {
    cartItems: (state) => state.cart,
    cartTotal: (state) =>
      state.cart.reduce(
        (total, producto) => total + producto.precio * producto.cantidad,
        0
      ),
  },
};
