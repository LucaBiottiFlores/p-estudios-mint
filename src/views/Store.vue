<template>
  <v-app>
    <main class="hero_store d-none d-md-block">
      <div class="hero_store_title ml-5">
        <h2 class="white--text">TIENDA</h2>
        <h2 class="title_color_mint">DE PRODUCTOS</h2>
      </div>
    </main>
    <div class="form_container" width="100vw">
      <label class="ms-5">Busca tu producto:</label>
      <input
        width="100vw"
        class="form-control ms-3 form_filter"
        type="search"
        placeholder=" Filtra por nombre, categoría, color o descripcion"
        aria-label="Search"
        :value="$store.state.search"
        @input="$store.dispatch('setSearch', $event.target.value)"
      />
    </div>
    <div>
      <ProductList
        v-if="$store.getters.searchedProducts.length > 0"
        :products="$store.getters.searchedProducts"
      />

      <div v-else>
        <div class="product-not-found my-5">Producto no encontrado! D:</div>
        <div></div>
      </div>
    </div>
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
  height: 650px;
  background-image: url("../assets/carrito.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-position-y: 50px;
}
.hero_store_title {
  position: relative;
  padding-top: 350px;
  font-size: 60px;
}
.title_color_mint {
  color: #95f5bd;
}
.form_container {
  margin: 10px;
}
.form_filter {
  width: 440px;
  height: 40px;
}
</style>
