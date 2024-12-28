<template>
  <v-container class="my-4" fluid>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="producto-card">
          <v-img :src="producto.imagen" height="400px" class="producto-imagen"></v-img>

          <v-card-title class="headline font-weight-bold">{{ producto.nombre }}</v-card-title>
          <v-card-subtitle class="text-subtitle-1">{{ producto.categoria }}</v-card-subtitle>

          <v-divider></v-divider>

          <v-card-text>
            <p>{{ producto.descripcion }}</p>
            <p><strong>Precio:</strong> ${{ producto.precio }}</p>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn color="primary" class="mx-auto" @click="agregarAlCarrito">Agregar al carrito</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "DetalleProducto",
  data() {
    return {
      producto: {}, // Producto a mostrar
    };
  },
  created() {
    this.obtenerProducto();
  },
  methods: {
    async obtenerProducto() {
      try {
        const id = this.$route.params.id; // Obtenemos el ID de la URL
        const response = await axios.get(`http://localhost:5000/api/productos/${id}`);
        this.producto = response.data; // Asignamos el producto a la variable
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    },
    agregarAlCarrito() {
      // Pasamos el producto real a la acción de Vuex
      this.$store.dispatch('cart/addToCart', {
        id: this.producto._id, // Usamos el ID del producto obtenido
        nombre: this.producto.nombre,
        precio: this.producto.precio,
        imagen: this.producto.imagen, // Asumiendo que la imagen también es relevante
      });
      console.log("Producto agregado al carrito:", this.producto);
    },
  },
};
</script>

<style scoped>
.producto-imagen {
  width: 100%;
  object-fit: cover;
}

.producto-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.v-card-title {
  font-size: 1.6rem;
  text-align: center;
}

.v-card-subtitle {
  text-align: center;
  margin-bottom: 16px;
}

.v-card-text {
  font-size: 1.2rem;
  line-height: 1.5;
}

.v-card-actions {
  text-align: center;
  margin-top: 16px;
}
</style>
