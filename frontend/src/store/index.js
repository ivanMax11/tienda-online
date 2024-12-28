import { createStore } from "vuex";
import auth from "./authStore";
import cart from "./modules/cart";

export default createStore({
  modules: {
    auth,
    cart,
  },
});
