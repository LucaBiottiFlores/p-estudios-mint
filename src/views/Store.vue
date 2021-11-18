<template>
  <v-app>
    <main class="hero_store d-none d-md-block">
      <div class="hero_store_title ml-5">
        <h1 class="white--text title_color_white">TIENDA</h1>
        <h1 class="title_color_mint">DE PRODUCTOS</h1>
      </div>
    </main>
    <v-container class="form_container" width="100vw">
      <label class="mt-5 ms-5 form_title">Busca tu producto:</label>
      <input
        type="text"
        class="ms-3 mt-3 form_filter"
        placeholder=" Filtra por nombre, categoría, color o descripción"
        :value="$store.state.products.search"
        @input="$store.dispatch('products/setSearch', $event.target.value)"
      />
    </v-container>
    <!-- <ProductList /> -->
    <ProductList
      v-if="$store.getters['products/searchedProducts'].length > 0"
      :products="$store.getters['products/searchedProducts']"
    />
    <div v-else>
      <div class="my-5">Producto no encontrado</div>
    </div>
  </v-app>
</template>

<script>
import ProductList from "../components/ProductList.vue";

export default {
  name: "products",
  components: {
    ProductList,
  },
  mounted() {
    this.$store.dispatch("products/AllProducts");
  },
};
</script>

<style scoped>
.hero_store {
  height: 650px;
  background-image: url("../assets/carrito.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-position-y: 2px;
}
.hero_store_title {
  position: relative;
  padding-top: 370px;
}
.title_color_white {
  font-size: 80px;
}
.title_color_mint {
  color: #95f5bd;
  font-size: 80px;
}
.form_container {
  margin: 10px;
  width: 800px;
  display: flex;
  flex-wrap: nowrap;
}

.form_filter {
  width: 400px;
  height: 40px;
  border: solid 1px #95f5bd;
}
</style>
