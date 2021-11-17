<template>
  <v-container>
    <template>
      <v-btn color="primary" dark> Editar producto </v-btn>
    </template>
    <v-card>
      <h1>Editar producto: {{ $route.params.id }}</h1>
      <v-container>
        <v-form @submit.prevent="SaveChanges" ref="form">
          <v-text-field
            v-model="product.name"
            type="text"
            label="Nombre"
          ></v-text-field>
          <v-text-field
            v-model.number="product.price"
            type="number"
            label="Precio"
          ></v-text-field>
          <v-text-field
            v-model="product.category"
            type="text"
            label="Categoria"
          ></v-text-field>
          <v-text-field
            v-model="product.color"
            type="text"
            label="Color"
          ></v-text-field>
          <v-text-field
            v-model="product.description"
            type="text"
            label="Descripción"
          ></v-text-field>
          <v-text-field
            v-model="product.src"
            type="text"
            label="Imagen"
          ></v-text-field>
          <v-btn type="submit" color="success">Guardar datos</v-btn>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import Firebase from "firebase";

export default {
  BeforeRouteEnter(to, from, next) {
    Firebase.firestore()
      .collection("products")
      .doc(to.params.id)
      .get()
      .then((document) => {
        next((vm) => {
          vm.product = { id: document.id, ...document.products() };
        });
      });
  },
  data: () => ({
    product: {},
  }),
  methods: {
    SaveChanges() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        Firebase.firestore()
          .collection("products")
          .doc(this.product.id)
          .update(this.product)
          .then(() => {
            this.loading = false;
            this.$router.push("/AdminProducts");
          });
      }
    },
  },
};
</script>
