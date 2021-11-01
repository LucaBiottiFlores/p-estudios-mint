<template>
  <div>
    <hello-world />
    <spotify-home />
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld'
import SpotifyHome from '../components/SpotifyHome.vue'
export default {
  name: 'Home',

  components: {
    HelloWorld,
    SpotifyHome
  }
}
</script>
