<template>
  <v-app>
    <main class="hero_store d-none d-md-block">
      <div class="hero_store_title ml-5">
        <h1 class="white--text title_color_white">TIENDA</h1>
        <h1 class="title_color_mint">DE PRODUCTOS</h1>
      </div>
    </main>
    <v-container class="form_container text-center" width="100%">
      <label class="mt-5 form_title"></label>
      <input
        type="text"
        class="mt-3 form_filter"
        placeholder="  Busca tu Producto: Filtra por nombre, categoría, color o descripción"
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
      <div class="product-not-found my-5 text-center">Ups! Nada por aquí</div>
      <div class="text-center">
        <img
          src="../assets/pulp-fiction-john-travolta.gif"
          alt=""
          class="img-fluid"
        />
      </div>
    </div>
  </v-app>
</template>

<script>
import ProductList from '../components/ProductList.vue'

export default {
  name: 'products',
  components: {
    ProductList
  },
  mounted() {
    this.$store.dispatch('products/AllProducts')
  }
}
</script>

<style scoped>
.hero_store {
  height: 500px;
  background-image: url('../assets/carrito.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-position-y: 2px;
}
.hero_store_title {
  position: relative;
  padding-top: 200px;
}
.title_color_white {
  font-size: 80px;
}
.title_color_mint {
  color: #95f5bd;
  font-size: 80px;
}
.form_container {
  display: flex;
  flex-wrap: nowrap;
}

.form_filter {
  width: 100%;
  height: 40px;
  border: solid 1px #95f5bd;
}

.product-not-found {
  font-size: 24px;
  font-weight: bold;
}
</style>
