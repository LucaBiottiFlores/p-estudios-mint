<template>
  <div>
    <h3 class="text-center mt-5 m-5">CARRITO DE COMPRAS</h3>
    <template>
      <v-card
        class="ms-5 mt-5"
        max-width="700"
        max-height="500"
        outlined
        v-for="(product, i) in $store.state.shopCart.cart"
        :key="product.id"
      >
        <v-list-item three-line>
          <v-list-item-avatar tile size="200" color="grey">
            <v-img :src="product.src"></v-img>
          </v-list-item-avatar>
          <v-list-item-content class="text-center">
            <v-list-item-title class="text-h5 mb-4">
              {{ product.description }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-start"></v-list-item-subtitle>
            <v-list-item-title class="text-h5 mt-5"
              >Total: ${{
                parseInt($store.getters["shopCart/totalAmount"]).toLocaleString(
                  "de-DE"
                )
              }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-card-actions class="justify-start">
          <p class="mt-3">Cantidad del producto: {{ product.quantity }}</p>
          <v-btn
            x-small
            outlined
            rounded
            text
            class="ms-5"
            @click="reduceProductQuantity(i)"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-btn
            x-small
            rounded
            class="teal accent-3"
            @click="incrementProductQuantity(product)"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-actions class="justify-end">
          <v-btn
            small
            outlined
            rounded
            text
            @click="removeProductFromShoppingCart(i)"
            >Quitar producto</v-btn
          >
          <PurchaseModal />
        </v-card-actions>
      </v-card>
    </template>
  </div>
</template>

<script>
import PurchaseModal from "./PurchaseModal.vue";

export default {
  name: "ShoppingCart",
  components: {
    PurchaseModal,
  },
  props: {
    products: { type: Array, require: true },
  },
  methods: {
    reduceProductQuantity(i) {
      this.$store.dispatch("shopCart/reduceProductQuantity", i);
    },
    incrementProductQuantity(product) {
      this.$store.dispatch("shopCart/incrementProductQuantity", product);
    },
    removeProductFromShoppingCart(i) {
      this.$store.dispatch("shopCart/removeProductFromShoppingCart", i);
    },
  },
};
</script>

<style>
.btn_color_mint {
  color: #95f5bd;
}
</style>
