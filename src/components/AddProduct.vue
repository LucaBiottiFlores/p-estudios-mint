<template>
  <v-dialog width="1000px">
    <template class="d-flex justify-end" v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on"> Agregar un producto nuevo </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-form @submit.prevent="AddProduct" ref="form">
          <v-text-field v-model="product.name" label="Nombre"></v-text-field>
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
            label="Descripcion"
          ></v-text-field>
          <v-text-field
            v-model.number="product.price"
            type="number"
            label="Costo"
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
  </v-dialog>
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
    product: {
      name: "",
      category: "",
      color: "",
      description: "",
      price: 0,
      src: "",
    },
  }),
  methods: {
    AddProduct() {
      if (this.$refs.form.validate()) {
        console.log("formulario valido");
        Firebase.firestore()
          .collection("products")
          .doc(this.product.id)
          .set(this.product)
          .then(() => {
            this.$router.push("/administrar");
          });
      }
    },
  },
};
</script>
