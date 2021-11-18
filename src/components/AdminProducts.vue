<template>
  <v-container>
    <h3 class="text-center mb-5">Administrar productos</h3>
    <v-data-table :items="$store.state.products.products" :headers="headers">
      <!-- costo -->
      <template v-slot:[`item.price`]="{ item }">
        <v-chip class="teal accent-1"
          >${{ item.price.toLocaleString() }}</v-chip
        >
      </template>
      <!-- nombre-->
      <template v-slot:[`item.name`]="{ item }">
        <v-chip class="teal accent-1">
          {{ item.name }}
        </v-chip>
      </template>
      <!-- categoria -->
      <template v-slot:[`item.category`]="{ item }">
        <v-chip class="teal accent-1">
          {{ item.category ? item.category : "Sin informacion" }}
        </v-chip>
      </template>
      <!-- color -->
      <template v-slot:[`item.color`]="{ item }">
        <v-chip class="teal accent-1">
          {{ item.category ? item.color : "Sin informacion" }}
        </v-chip>
      </template>
      <!-- descripcion -->
      <template v-slot:[`item.description`]="{ item }">
        <v-chip class="teal accent-1">
          {{ item.description ? item.description : "Sin informacion" }}
        </v-chip>
        <!-- imagen -->
      </template>
      <!-- <template v-slot:[`item.src`]="{ item }">
        {{ item.src }}
      </template> -->
      <template v-slot:[`item.acciones`]="{ item }">
        <div class="div">
          <v-btn icon @click="ChangeToEdit(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="DeleteProduct(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import Firebase from "firebase";

export default {
  name: "ProductsTable",
  data: () => ({
    link: "VERYLONGTOSH..",
    headers: [
      { text: "Nombre", value: "name" },
      { text: "Precio", value: "price" },
      { text: "descripción", value: "description" },
      { text: "color", value: "color" },
      { text: "categoria", value: "category" },
      // { text: "Imagen", value: "src" },
      { text: "Acciones", value: "acciones" },
    ],
  }),
  methods: {
    ChangeToEdit(item) {
      this.$router.push(`/editar-producto/${item.id}`);
    },
    DeleteProduct(item) {
      console.log("eliminar el item => ", item);
      Firebase.firestore()
        .collection("products")
        .doc(item.id)
        .delete()
        .then(() => {
          this.$store.dispatch("products/AllProducts");
        });
    },
  },
};
</script>
<style scoped></style>
