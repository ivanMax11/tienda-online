<template>
  <v-app>
    <v-main class="main-content">
      <v-container fluid>
        <!-- Banner principal -->
        <v-row class="banner-row">
          <v-col cols="12">
            <div class="banner">
              <v-img src="black.png" class="banner-image" cover></v-img>
              <div class="banner-overlay">
                <h1 class="banner-title">Bienvenido a nuestra tienda</h1>
                <p class="banner-subtitle">Encuentra los mejores productos para tus necesidades</p>
                <v-btn color="purple-lighten-1" large @click="goToShop" class="cta-btn">¡Compra Ahora!</v-btn>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- Productos destacados -->
        <v-row class="my-6 products-section" justify="center">
          <v-col cols="12">
            <h2 class="section-title">Productos Destacados</h2>
            <!-- Cuadrícula de productos -->
            <v-row justify="center" spacing="4">
              <v-col v-for="(producto, index) in productosDestacados" :key="index" cols="12" sm="4" md="4" lg="3">
                <v-card class="product-card">
                  <v-img :src="producto.image" height="180px"></v-img>
                  <v-card-title>{{ producto.nombre }}</v-card-title>
                  <v-card-subtitle>{{ producto.descripcion }}</v-card-subtitle>
                  <v-card-actions>
                    <v-btn color="primary" @click="verDetalles(producto)">Ver detalles</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>

          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      productosDestacados: [
        { id: '1', nombre: 'Producto 1', descripcion: 'Descripción del producto 1', image: 'https://via.placeholder.com/300' },
        { id: '2', nombre: 'Producto 2', descripcion: 'Descripción del producto 2', image: 'https://via.placeholder.com/300' },
        { id: '3', nombre: 'Producto 3', descripcion: 'Descripción del producto 3', image: 'https://via.placeholder.com/300' },
        { id: '4', nombre: 'Producto 4', descripcion: 'Descripción del producto 4', image: 'https://via.placeholder.com/300' },
        { id: '5', nombre: 'Producto 5', descripcion: 'Descripción del producto 5', image: 'https://via.placeholder.com/300' },
        { id: '6', nombre: 'Producto 6', descripcion: 'Descripción del producto 6', image: 'https://via.placeholder.com/300' },
      ],
    };
  },

  methods: {
    goToShop() {
      this.$router.push({ name: 'productos' });
    },
    verDetalles(producto) {
      // Asegúrate de que el objeto `producto` tenga un campo `id`
      if (producto.id) {
        this.$router.push({ name: 'DetallesProductos', params: { id: producto.id } });
      } else {
        console.error('El producto no tiene un ID válido:', producto);
      }
    },
  },
}

</script>

<style scoped>
.main-content {
  z-index: 0 !important;
  /* Reducir prioridad visual del contenido */
}

/* Banner principal */
.banner-row {
  margin-bottom: 40px;
}

.banner {
  position: relative;
  /* Mantén el banner relativo al contenedor */
  z-index: 1;
  /* Asegura que esté debajo del menú desplegable */
  height: 60vh;
}


.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  /* Fondo más oscuro para mejor contraste */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 20px;
}

.banner-title {
  font-size: 3.5rem;
  /* Mayor tamaño para más impacto */
  margin-bottom: 10px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
  /* Sombra para mayor legibilidad */
}

.banner-subtitle {
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: 400;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
  /* Sombra para mayor legibilidad */
}

/* Botón destacado */
.cta-btn {
  font-size: 1.2rem;
  padding: 12px 24px;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.cta-btn:hover {
  background-color: #004ba0;
  /* Color más oscuro al pasar el cursor */
}

/* Sección de productos */
.products-section {
  text-align: center;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 20px;
}

/* Estilo de las tarjetas de productos */
.product-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-card .v-img {
  object-fit: cover;

}

.product-card .v-card-actions {
  margin-top: auto;
}

/* Para pantallas pequeñas */
@media (max-width: 600px) {
  .product-card {
    max-width: 100%;
    /* Permite que las tarjetas usen todo el espacio disponible */
    margin: 0 auto;
  }

  /* Imagen más pequeña */
  .product-card .v-img {
    height: 140px;
    /* Ajusta la altura para pantallas pequeñas */
  }

  /* Ajustar tamaño de textos en la tarjeta */
  .product-card .v-card-title {
    font-size: 1rem;
    /* Mantén un tamaño legible */
  }

  .product-card .v-card-subtitle {
    font-size: 0.9rem;
    /* Texto descriptivo más pequeño */
  }

  /* Botón más pequeño */
  .product-card .v-btn {
    font-size: 0.9rem;
    /* Reducir ligeramente el tamaño del botón */
    padding: 6px 12px;
  }
}


/* Para pantallas medianas (tabletas) */
@media (min-width: 600px) and (max-width: 960px) {
  .product-card {
    max-width: 180px;
    /* Ajusta el tamaño en pantallas medianas */
  }

  .product-card .v-img {
    height: 140px;
  }
}
</style>
