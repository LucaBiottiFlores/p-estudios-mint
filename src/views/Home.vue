<template>
  <div>
    <hello-world />
    <spotify-home />
    <schedule-home />
    <store-home />
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld'
import SpotifyHome from '../components/SpotifyHome.vue'
import ScheduleHome from '../components/ScheduleHome.vue'
import StoreHome from '../components/StoreHome.vue'
export default {
  name: 'Home',

  components: {
    HelloWorld,
    SpotifyHome,
    ScheduleHome,
    StoreHome
  }
}
</script>
