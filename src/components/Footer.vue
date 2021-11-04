<template>
  <div>
    <v-footer class="black d-flex justify-center align-center">
      <div>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 my-3 white--text" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
        <p class="footerText my-3">Todos los derechos reservados</p>
      </div>
    </v-footer>
  </div>
</template>

<script>
export default {
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-instagram']
  })
}
</script>

<style>
.footerText {
  color: white;
}
</style>
