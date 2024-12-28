<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Crear Cuenta</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="register">
                <v-text-field
                  v-model="nombre"
                  label="Nombre"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  label="Correo Electrónico"
                  type="email"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Contraseña"
                  type="password"
                  required
                ></v-text-field>
                <v-btn type="submit" color="primary" class="mt-4">Registrarse</v-btn>
              </v-form>
              <p class="mt-4">
                ¿Ya tienes una cuenta?
                <v-btn text color="indigo" @click="irALogin">Inicia sesión aquí</v-btn>
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from "axios";

export default {
  name: "RegisterComponent",
  data() {
    return {
      nombre: "",
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async register() {
      try {
        // Usar la variable de entorno de Vite
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/auth/register`, {
          nombre: this.nombre,
          email: this.email,
          password: this.password,
        });

        console.log("Usuario registrado:", response.data);
        this.$router.push("/login"); // Redirigir al login tras registrarse
      } catch (error) {
        console.error("Error al registrarse:", error.response?.data?.msg || error.message);
        this.error = error.response?.data?.msg || "Error al registrarse. Inténtalo de nuevo.";
      }
    },
    irALogin() {
      this.$router.push("/login");
    },
  },
};
  </script>
  
  <style scoped>
  .v-container {
    margin-top: 100px;
  }
  </style>
  