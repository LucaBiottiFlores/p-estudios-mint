<template>
  <v-app>
    <main class="hero_store">
      <!-- presentacion tienda -->
    </main>

    <ProductList />
  </v-app>
</template>

<script>
import ProductList from "../components/ProductList.vue";

export default {
  components: {
    ProductList,
  },
};
</script>

<style>
.hero_store {
  background-image: url("../assets/carrito.jpg");
  background-repeat: no-repeat;
}
</style>
