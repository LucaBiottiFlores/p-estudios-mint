<template>
  <div>
    <ShoppingCart v-if="$store.state.shopCart.cart.length > 0" />
    <div v-else class="d-flex justify-center mt-5">
      <p>No hay productos agregados al carrito aún</p>
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

</style>
