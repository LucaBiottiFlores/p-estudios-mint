<template>
  <div>
    <v-app-bar app dark>
      <v-img src="../assets/logo.png" max-height="90" max-width="90"></v-img>
      <v-spacer></v-spacer>
      <v-col class="mb-3 d-none d-md-flex" cols="12">
        <v-row justify="end" class="mr-14 pr-5 ml-0">
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
    </v-app-bar>
    <v-navigation-drawer
      temporary
      app
      v-model="drawer"
      class="d-flex d-md-none"
    >
      <v-list>
        <v-list-item-group>
          <v-list-item link v-for="(link, i) in links" :key="i" :to="link.to">
            <v-list-item-content>
              <v-list-item-title>{{ link.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
    drawer: true,
    links: [
      {
        name: 'Inicio',
        to: '/'
      },
      {
        name: 'Agenda tu hora',
        to: '/agendar-hora'
      },
      {
        name: 'Tienda',
        to: '/tienda'
      },
      {
        name: 'Carrito de compras',
        to: '/carrito-de-compras'
      }
    ]
  }),
  methods: {
    log() {
      console.log('holitas')
    }
  }
}
</script>


