<template>
  <div>
    <ShoppingCart />
    <!-- <ShoppingCart
      v-for="(product, index) in $store.state.shoppingCart.Cart"
      :key="index"
      :product="product"
    /> -->
  </div>
</template>

<script>
import ShoppingCart from "../components/ShoppingCart.vue";

export default {
  components: {
    ShoppingCart,
  },
};
</script>

<style>
.btn_color_mint {
  color: #95f5bd;
}
</style>
