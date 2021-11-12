<template>
  <v-app>
    <div class="container_store">
      <v-container width="300px">
        <v-row>
          <v-col
            v-for="product in $store.state.products.products"
            :key="product.id"
            cols="12"
            md="4"
            sm="12"
          >
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-card
                  class="text-center rounded-xl"
                  :elevation="hover ? 24 : 5"
                >
                  <v-container fluid>
                    <img class="image_store mx-auto" :src="product.src" />
                  </v-container>

                  <v-card-title class="justify-center">{{
                    product.name
                  }}</v-card-title>
                  <v-card-subtitle>{{ product.description }} </v-card-subtitle>

                  <v-card-title class="justify-center price_container"
                    ><v-avatar
                      ><v-icon color="yellow" large class="ms-3 mb-1"
                        >mdi-star</v-icon
                      ></v-avatar
                    >
                    ${{ product.price.toLocaleString() }}
                  </v-card-title>

                  <v-card-actions class="d-flex justify-center">
                    <v-btn
                      rounded
                      dark
                      class="mb-3 teal accent-4 btn_store"
                      @click="addToShoppingCart(product)"
                      >Agregar al carrito</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </template>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ProductList",
  props: {
    products: { type: Array, require: true },
  },

  methods: {
    ...mapActions(["add_ToShoppingCart"]),

    addToShoppingCart(product) {
      this.$store.dispatch("shopCart/addProductToShoppingCart", product);
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
  height: 200px;
}
.price_container {
  margin: 0;
  padding: 0;
}

.store_price {
  font-size: 30px;
}
</style>
