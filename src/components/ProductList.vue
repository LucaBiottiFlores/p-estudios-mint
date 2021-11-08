<template>
  <v-app>
    <!-- vista tienda -->
    <v-divider></v-divider>

    <div class="teal accent-2">
      <v-container width="300px">
        <v-row>
          <v-col
            v-for="product in $store.state.store.products"
            :key="product.id"
            cols="12"
            md="4"
            sm="12"
          >
            <v-card class="text-center">
              <v-container fluid>
                <v-img class="image_store mx-auto" :src="product.src"></v-img>
              </v-container>

              <v-card-title class="justify-center">{{
                product.name
              }}</v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle>{{ product.description }}</v-card-subtitle>
              <v-divider></v-divider>
              <v-card-title class="justify-center"
                ><v-avatar
                  ><v-icon color="yellow" large class="ms-3 mb-1"
                    >mdi-star</v-icon
                  ></v-avatar
                >
                ${{ product.price.toLocaleString() }}
              </v-card-title>
              <v-divider></v-divider>
              <v-card-actions class="d-flex justify-end">
                <v-btn
                  dark
                  class="mb-3 teal accent-4 btn_store"
                  @click="addToShoppingCart(product)"
                  >Agregar al carrito</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "ProductList",
  props: {
    products: { type: Array, require: true },
  },
  methods: {
    addToShoppingCart(product) {
      console.log("submit addToShoppingCart");
      this.$store.dispatch("addProductToShoppingCart", product);
    },
  },
};
</script>

<style>
.container_store {
  background-color: #a4f9c8;
}
.image_store {
  width: 200px;
  height: 230px;
}

.store_price {
  font-size: 30px;
}
</style>
