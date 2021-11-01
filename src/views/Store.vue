<template>
  <v-app>
    <main class="hero_store"></main>
    <form>
      <input
        class="form-control"
        type="search"
        placeholder=" Busca tu producto por nombre, color o según descripcion"
        aria-label="Search"
        :value="$store.state.search"
        @input="$store.dispatch('setSearch', $event.target.value)"
      />
    </form>
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
  height: 1000px;
  background-image: url("../assets/carrito.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: center;
}
</style>
