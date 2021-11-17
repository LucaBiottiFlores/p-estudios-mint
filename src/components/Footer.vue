<template>
  <div>
    <v-footer class="black d-flex justify-center align-center">
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 my-3 white--text"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>

        <div class="mr-14">
          <v-btn icon @click="handleLogout" color="white">
            <span class="ml-3 text-caption d-none d-sm-inline" alt="Salir"
              >LogOut</span
            >
            <v-icon
              right
              class="mr-0 mr-sm-14 mr-md-14 ml-16 ml-sm-1"
              alt="Salida"
              >mdi-logout</v-icon
            >
          </v-btn>
          <RegisterModal />
        </div>

        <p class="footerText my-3">Todos los derechos reservados</p>
      </div>
    </v-footer>
  </div>
</template>

<script>
import RegisterModal from './RegisterModal.vue'
export default {
  components: {
    RegisterModal
  },
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-instagram']
  }),
  methods: {
    async handleLogout() {
      await this.$store.dispatch('sesion/signOut')
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>
.footerText {
  color: white;
}
</style>
