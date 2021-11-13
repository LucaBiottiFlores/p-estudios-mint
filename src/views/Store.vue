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
      <v-text-field
        class="ms-3 form_filter"
        label=" Filtra por nombre, categoría, color o descripción"
        :value="$store.state.search"
        @input="$store.dispatch('setSearch', $event.target.value)"
      >
      </v-text-field>
    </v-container>
    <ProductList />
    <!-- <ProductList
      v-if="$store.getters['products/searchedProducts'] > 0"
      :products="$store.getters['products/searchedProducts']"
    />
    <div>
      <div class="my-5">Producto no encontrado! D:</div>
    </div> -->
  </v-app>
</template>

<script>
import ProductList from "../components/ProductList.vue";

export default {
  components: {
    ProductList,
  },
  mounted() {
    this.$store.dispatch("products/AllProducts");
  },
};
</script>

<style>
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
.form_title {
}
.form_filter {
  width: 400px;
  height: 40px;
}
</style>
