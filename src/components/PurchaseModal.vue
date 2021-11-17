<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          class="teal accent-4"
          outlined
          rounded
          text
          v-bind="attrs"
          v-on="on"
        >
          Comprar
        </v-btn>
      </template>

      <v-card class="rounded-xl">
        <v-card-title
          class="modal_card_title text-white mb-5 d-flex justify-center"
        >
          Exito
        </v-card-title>
        <v-card-text
          class="modal_card_text mt-5 mb-1 text-h6 d-flex justify-center"
        >
          Compra realizada!
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="teal accent-4"
            dark
            rounded
            text
            @click="
              dialog = false;
              removeProductFromShoppingCart(i);
            "
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
  }),
  methods: {
    removeProductFromShoppingCart(i) {
      this.$store.dispatch("shopCart/removeProductFromShoppingCart", i);
    },
  },
};
</script>
<style scoped>
.modal_card_title {
  background: #97ccb1;
}
</style>
