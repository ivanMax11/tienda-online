<template>
    <v-container>
      <v-form ref="form" v-model="isValid" @submit.prevent="submitProducto">
        <v-text-field
          v-model="producto.nombre"
          label="Nombre del producto"
          required
        ></v-text-field>
  
        <v-textarea
          v-model="producto.descripcion"
          label="Descripción"
          rows="3"
          required
        ></v-textarea>
  
        <v-text-field
          v-model="producto.precio"
          label="Precio"
          type="number"
          required
        ></v-text-field>
  
        <v-select
          v-model="producto.categoria"
          :items="categorias"
          label="Categoría"
          required
        ></v-select>
  
        <v-text-field
          v-model="producto.stock"
          label="Stock"
          type="number"
          required
        ></v-text-field>
  
        <v-file-input
          v-model="imagen"
          label="Imagen del producto"
          accept="image/*"
          required
        ></v-file-input>
  
        <v-btn :disabled="!isValid" type="submit" color="primary">Agregar Producto</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        isValid: false,
        producto: {
          nombre: "",
          descripcion: "",
          precio: null,
          categoria: "",
          stock: 0,
        },
        imagen: null,
        categorias: ["Ropa", "Calzado", "Electrónica", "Hogar", "Deportes"], // Puedes agregar más categorías
      };
    },
    methods: {
      async submitProducto() {
        try {
          const formData = new FormData();
  
          // Añadir los datos del producto
          for (const key in this.producto) {
            formData.append(key, this.producto[key]);
          }
  
          // Añadir la imagen
          if (this.imagen) {
            formData.append("imagen", this.imagen);
          }
  
          // Enviar el producto al backend
          await axios.post(
            "http://localhost:5000/api/productos",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
  
          alert("Producto agregado exitosamente");
          this.resetForm();
        } catch (error) {
          console.error("Error al agregar el producto:", error);
          alert("Hubo un error al agregar el producto");
        }
      },
      resetForm() {
        this.producto = {
          nombre: "",
          descripcion: "",
          precio: null,
          categoria: "",
          stock: 0,
        };
        this.imagen = null;
        this.$refs.form.reset();
      },
    },
  };
  </script>
  
  <style scoped>
  .v-container {
    margin-top: 100px;
  }
  </style>
  