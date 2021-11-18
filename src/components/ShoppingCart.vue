<template>
  <div>
    <h1 class="text-center mt-5 m-5 font-weight-light">CARRITO DE COMPRAS</h1>
    <div width="100vw" class="green accent-1 mb-5">
      <v-row>
        <v-col md="4" sm="12">
          <v-card
            class="ms-5 mt-5 mb-5"
            outlined
            v-for="(product, i) in $store.state.shopCart.cart"
            :key="product.id"
          >
            <v-img
              width="150px"
              class="mx-auto mt-5"
              :src="product.src"
            ></v-img>

            <v-card-title class="text-h7 mb-4 justify-center">
              {{ product.description }}
            </v-card-title>
            <v-card-title class="text-h6 mt-5 justify-center"
              >Total: ${{
                parseInt($store.getters["shopCart/totalAmount"]).toLocaleString(
                  "de-DE"
                )
              }}</v-card-title
            >

            <v-card-actions class="justify-start">
              <p class="mt-3 text-h7">
                Cantidad del producto: {{ product.quantity }}
              </p>
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
        </v-col>
      </v-row>
    </div>
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
.title_color_mint {
  color: #90d4ac;
}
</style>
