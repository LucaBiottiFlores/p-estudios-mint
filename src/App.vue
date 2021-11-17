<template>
  <v-app>
    <Navbar />
    <v-main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer.vue'
import Firebase from 'firebase'
import Swal from 'sweetalert2'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  mounted() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('sesion/loadingUser', user)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'ingreso exitoso',
          showConfirmButton: false,
          timer: 1600
        })
      } else {
        this.$store.dispatch('sesion/loadingUser', null)
      }
    })
  },
  data: () => ({
    //
  })
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
