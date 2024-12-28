<template>
  <v-app-bar app color="indigo" dark>
    <v-toolbar-title>Mi Tienda Online</v-toolbar-title>
    <v-spacer></v-spacer>

    <!-- Botones visibles SOLO en pantallas grandes -->
    <div class="d-none d-md-flex">
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/productos-component">Productos</v-btn>

     

      <template v-if="isAuthenticated">
        <v-btn text @click="logout">Cerrar Sesión</v-btn>
      </template>
      <template v-else>
        <v-btn text to="/login">Iniciar Sesión</v-btn>
      </template>
       <!-- Botón del carrito -->
       <v-btn icon @click="irAlCarrito">
        <v-badge color="red" :content="cartItems.length" overlap>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </div>

    <!-- Menú desplegable SOLO en pantallas pequeñas -->
    <div class="d-flex d-md-none">
      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/productos-component">
            <v-list-item-title>Productos</v-list-item-title>
          </v-list-item>

          <!-- Botón del carrito en el menú -->
          <v-list-item @click="irAlCarrito">
            <v-list-item-title>Carrito ({{ cartItems.length }})</v-list-item-title>
          </v-list-item>

          <template v-if="isAuthenticated">
            <v-list-item @click="logout">
              <v-list-item-title>Cerrar Sesión</v-list-item-title>
            </v-list-item>
          </template>
          <template v-else>
            <v-list-item to="/login">
              <v-list-item-title>Iniciar Sesión</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HeaderComponent",
  computed: {
    // Verificar si el usuario está autenticado
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    // Asegúrate de mapear el getter correctamente
    ...mapGetters("cart", ["cartItems"]), // Asegúrate de que el getter esté mapeado desde el módulo 'cart'
  },
  methods: {
    logout() {
      // Limpiar el carrito al hacer logout
      this.$store.dispatch("cart/clearCart");  // Limpiamos el carrito desde Vuex

      // Realizamos el logout
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/"); // Redirigir al home después del logout
      });
    },
    // Método para ir a la vista del carrito
    irAlCarrito() {
      this.$router.push("/cart"); // Redirigir a la página del carrito
    },
  },
};
</script>

<style scoped>
/* Aquí puedes agregar estilos específicos para tu header */
</style>
