<template>
  <div>
    <v-app-bar app dark>
      <v-toolbar-title>Estudios Mint</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-img src="../assets/logo.png" max-height="90" max-width="90"></v-img>
      <v-col class="mb-3" cols="12">
        <v-row justify="end" class="mr-5">
          <v-btn
            color="white"
            link
            text
            v-for="(link, i) in links"
            :key="i"
            :to="link.to"
          >
            {{ link.name }}
          </v-btn>
        </v-row>
      </v-col>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
    links: [
      {
        name: "Inicio",
        to: "/",
      },
      {
        name: "Agenda tu hora",
        to: "/agendar-hora",
      },
      {
        name: "Tienda",
        to: "/tienda",
      },
      {
        name: "Carrito de compras",
        to: "/carrito-de-compras",
      },
    ],
  }),
};
</script>

<style scoped></style>
