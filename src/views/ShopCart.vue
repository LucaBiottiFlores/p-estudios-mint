<template>
  <div>
    <h3 class="text-center mt-4 font-weight-black">CARRITO DE COMPRAS</h3>
    <template>
      <v-card class="ms-5 mt-5" max-width="500" outlined>
        <v-list-item three-line>
          <v-list-item-avatar tile size="80" color="grey">
            <v-img></v-img>
          </v-list-item-avatar>
          <v-list-item-content class="text-center">
            <v-list-item-title class="text-h5 mb-4">
              Nombre del producto
            </v-list-item-title>
            <v-list-item-subtitle class="text-start"
              >descripcion del producto</v-list-item-subtitle
            >
            <v-list-item-title class="text-h5 mt-5">Total: $</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions class="justify-start">
          <p class="mt-3">Cantidad del producto:</p>
          <v-btn small outlined rounded text class="ms-5">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-btn small rounded class="teal accent-3">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-actions class="justify-end">
          <v-btn class="teal accent-4" dark outlined rounded text
            >Comprar</v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </div>
</template>

<script>
export default {};
</script>

<style>
.btn_color_mint {
  color: #95f5bd;
}
</style>
