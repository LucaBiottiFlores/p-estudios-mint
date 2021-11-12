<template>
  <div>
    <ShoppingCart v-if="$store.state.shopCart.cart.length > 0" />
    <div v-else>
      <p>No hay productos agregados aún al carrito</p>
    </div>
  </div>
</template>

<script>
import ShoppingCart from "../components/ShoppingCart.vue";

export default {
  components: {
    ShoppingCart,
  },
  mounted() {
    this.$store.dispatch("products/AllProducts");
  },
};
</script>

<style>
.btn_color_mint {
  color: #95f5bd;
}
</style>
