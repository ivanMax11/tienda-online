<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>Iniciar Sesión</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="login">
                            <v-text-field v-model="email" label="Correo Electrónico" type="email" required></v-text-field>
                            <v-text-field v-model="password" label="Contraseña" type="password" required></v-text-field>
                            <v-btn type="submit" color="primary" class="mt-4">Iniciar Sesión</v-btn>
                        </v-form>
                        <p class="mt-4">
                            ¿No tienes una cuenta?
                            <v-btn text color="indigo" @click="irARegistro">Regístrate aquí</v-btn>
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
    name: "LoginComponent",
    data() {
        return {
            email: "",
            password: "",
            error: "",
        };
    },
    methods: {
        async login() {
            try {
                // Realizar la petición de login al servidor
                const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/auth/login`, {
                    email: this.email,
                    password: this.password,
                });

                // Almacenar el token y la información del usuario en el Vuex Store
                console.log('Usuario autenticado:', response.data);
                this.$store.dispatch("auth/login", { email: this.email, password: this.password });

                // Almacenar el token en localStorage para mantener la sesión
                localStorage.setItem("token", response.data.token);

                // Redirigir al usuario a la página de productos
                this.$router.push("/productos-component");

            } catch (error) {
                console.error('Error en login:', error.response?.data?.msg || error.message);
                throw new Error('Error al iniciar sesión');
            }
        },

        irARegistro() {
            this.$router.push("/register");
        },
    },
};
</script>

<style scoped>
.v-container {
    margin-top: 100px;
}
</style>
