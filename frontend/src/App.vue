<template>
  <v-app>
    <HeaderComponent />
    <router-view></router-view>
    <FooterComponent />
  </v-app>
</template>

<script>
// Asegúrate de importar los componentes
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
  },
  computed: {
    ...mapState('auth', ['token']), // Si es necesario acceder al token en la app
  },
  created() {
    // Restaurar el estado de autenticación desde localStorage
    if (localStorage.getItem("token")) {
      this.$store.commit("auth/setAuth", {
        token: localStorage.getItem("token"),
        user: null,  // Puedes agregar lógica para recuperar el usuario si es necesario
      });
    }
  },
};
</script>

<style scoped>
/* Estilos para la app */
</style>
