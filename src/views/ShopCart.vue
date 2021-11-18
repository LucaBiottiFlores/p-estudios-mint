<template>
  <div>
    <ShoppingCart v-if="$store.state.shopCart.cart.length > 0" />
    <div v-else>
      <div class="product-not-found my-12 text-center">
        Aún no hay productos en tu carro de compras 🙁
      </div>
      <div class="text-center">
        <img src="../assets/empty-shopping-cart.gif" alt="" class="img-fluid" />
      </div>
    </div>
  </div>
</template>

<script>
import ShoppingCart from '../components/ShoppingCart.vue'

export default {
  components: {
    ShoppingCart
  },
  mounted() {
    this.$store.dispatch('products/AllProducts')
  }
}
</script>

<style>
.product-not-found {
  font-size: 24px;
  font-weight: bold;
}
</style>
