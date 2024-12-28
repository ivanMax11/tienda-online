<template>
  <v-container>
    <h2>Carrito de Compras</h2>
    <div v-if="cartItems.length === 0">
      <v-alert type="info" dismissible>
        Tu carrito está vacío. ¡Añade productos para comenzar!
      </v-alert>
    </div>
    <v-row v-else>
      <v-col
        v-for="item in cartItems"
        :key="item.id"
        cols="12"
        md="4"
        class="d-flex"
      >
        <v-card class="mx-auto">
          <v-card-title>{{ item.nombre }}</v-card-title>
          <v-card-subtitle>Cantidad: {{ item.cantidad }}</v-card-subtitle>
          <v-card-subtitle>
            Total: ${{ (item.precio * item.cantidad).toFixed(2) }}
          </v-card-subtitle>
          <v-card-actions>
            <v-btn color="error" @click="removeFromCart(item.id)">
              Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div class="mt-4 text-right">
      <h3>Total del Carrito: ${{ cartTotal.toFixed(2) }}</h3>
      <v-btn color="success" @click="clearCart">Vaciar Carrito</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("cart", ["cartItems", "cartTotal"]), // Accede a los getters del módulo `cart`
  },
  methods: {
    ...mapActions("cart", ["removeFromCart", "clearCart"]), // Accede a las acciones del módulo `cart`
  },
};
</script>

<style scoped>
.text-right {
  text-align: right;
}
</style>
