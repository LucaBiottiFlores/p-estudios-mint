<template>
  <div>
    <v-app-bar app dark>
      <v-img src="../assets/logo.png" max-height="90" max-width="90"></v-img>
      <v-spacer></v-spacer>
      <v-col class="mb-3 d-none d-md-flex" cols="12">
        <v-row justify="end" class="mr-5 pr-5 ml-0">
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
      <v-spacer></v-spacer>
      <!-- vista mobile -->
      <v-app-bar-nav-icon
        class="d-flex d-md-none"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <!-- <v-navigation-drawer
        app
        temporary
        v-model="drawer"
        class="d-flex d-md-none"
      >
        <v-card>
          <v-list>
            <v-list-item-content
              v-for="(link, i) in links"
              :key="i"
              :to="link.to"
            >
              <v-list-title>{{ link.name }}</v-list-title>
            </v-list-item-content>
          </v-list>
        </v-card>
      </v-navigation-drawer> -->
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
    drawer: true,
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
