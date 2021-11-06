<template>
  <v-app>
    <!-- vista tienda -->
    <v-divider></v-divider>

    <div class="teal accent-2">
      <v-container class="mt-5">
        <v-row>
          <v-col
            v-for="product in $store.state.products"
            :key="product.id"
            cols="12"
            sm="3"
            md="4"
          >
            <v-card class="mx-auto text-center">
              <v-img :src="product.src" height="420px" width="500px"></v-img>

              <v-card-title class="justify-center">{{
                product.name
              }}</v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle>{{ product.description }}</v-card-subtitle>
              <v-card-text>
                <v-avatar><v-icon>mdi-star</v-icon></v-avatar>
                Precio: ${{ product.price.toLocaleString() }}
              </v-card-text>
              <v-btn dark class="justify-content-right mb-3"
                >Agregar al carrito</v-btn
              >
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
};
</script>

<style></style>
