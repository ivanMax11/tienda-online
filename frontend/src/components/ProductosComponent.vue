<template>
  <v-container fluid class="contenido-principal">
    <v-row justify="center" align="start" spacing="4">
      <v-col v-for="producto in productos" :key="producto._id" cols="6" sm="6" md="4" lg="3">
        <v-card @click="irADetalles(producto._id)" class="cursor-pointer producto-card">
          <v-img :src="producto.imagen" height="250px" class="producto-imagen"></v-img>
          <v-card-title class="text-h6">{{ producto.nombre }}</v-card-title>
          <v-card-subtitle class="text-subtitle-1">{{ producto.categoria }}</v-card-subtitle>
          <v-card-text>
            <div class="descripcion mb-2">
              <span>{{ producto.descripcion }}</span>
            </div>
            <div class="precio">
              <strong>Precio:</strong> ${{ producto.precio }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductosComponent",
  data() {
    return {
      productos: [], // Productos obtenidos de la API
    };
  },
  created() {
    this.obtenerProductos();
  },
  methods: {
    async obtenerProductos() {
      try {
        const response = await axios.get("http://localhost:5000/api/productos");
        this.productos = response.data;
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    },
    irADetalles(id) {
      this.$router.push(`/producto/${id}`); // Redirige a la página de detalles
    },
  },
};
</script>

<style scoped>
/* Asegurar espacio suficiente debajo del header */
.contenido-principal {
  padding-top: 100px; /* Altura típica del header, ajusta según sea necesario */
  margin-bottom: 100px; /* Espacio adicional antes del footer */
}

/* Estilo de las imágenes */
.producto-imagen {
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* Tarjetas */
.producto-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;
}

.producto-card:hover {
  transform: scale(1.05);
}

/* Títulos */
.v-card-title {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
}

.v-card-subtitle {
  text-align: center;
  margin-bottom: 16px;
}

/* Texto */
.v-card-text {
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
}

.precio {
  font-size: 1.2rem;
  font-weight: bold;
  color: #0aa511; /* Color de precio */
}

.descripcion {
  font-size: 0.9rem;
  color: #757575; /* Color suave para la descripción */
}
</style>
