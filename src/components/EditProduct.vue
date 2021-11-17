<template>
  <v-container>
    <v-card>
      <v-container>
        <h1>Editar producto: {{ $route.params.id }}</h1>
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
          console.log(vm.product)
        });
      });
  },
  data: () => ({
    product: {},
  }),

  methods: {
    SaveChanges() {
      if (this.$refs.form.validate()) {
        Firebase.firestore()
          .collection("products")
          .doc(this.product.id)
          .update(this.product)
          .then(() => {
            this.$router.push("/administrar");
          })
          .catch(() => {
            console.log("error -->", this.product)
          });
      }
    },
    // validate() {
    //   this.$refs.form.validate();
    //   if (this.$refs.form.validate()) {
    //     let newProduct = {
    //       price: parseInt(this.price),
    //       name: this.name,
    //       category: this.category,
    //       color: this.color,
    //       src: this.src,
    //       description: this.description,
    //     };
    //     this.$store.dispatch("updateProduct", newProduct).then(() => {
    //       setTimeout(() => {
    //         this.$router.replace({ name: "Administrar productos" });
    //       }, 1000);
    //     });
    //   }
    // },
    // mounted() {
    //   let foundProduct = this.sendingProducts.find(
    //     (result) => result.productId === this.id
    //   );
    //   if (foundProduct !== undefined) {
    //     this.price = parseInt(foundProduct.price);
    //     this.name = foundProduct.name;
    //     this.category = foundProduct.category;
    //     this.color = foundProduct.color;
    //     this.src = foundProduct.src;
    //     this.description = foundProduct.description;
    //   }
    // },
  },
};
</script>
