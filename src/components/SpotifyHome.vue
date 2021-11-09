<template>
  <div class="spotifySection d-flex justify-center align-center">
    <img :src="playlist.images[1].url" />
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data: () => {
    return {
      artistResponse: {
        data: []
      }
    }
  },
  mounted() {
    this.$store.dispatch('session/subscribeToAuthStateChange')
    this.startSpotify()
  },
  created() {
    this.startSpotify()
  },
  methods: {
    async startSpotify() {
      const clientId = '46766ccda4a84cb587332f9a62bd989e'
      const clientSecret = 'c3d204142048482b88579dd0ad1ee65f'
      const serialize = function (obj) {
        var str = []
        for (var p in obj) {
          // eslint-disable-next-line no-prototype-builtins
          if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
          }
        }
        return str.join('&')
      }
      const tokenResponse = await Axios.post(
        'https://accounts.spotify.com/api/token',
        serialize({ grant_type: 'client_credentials' }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
              'Basic ' +
              new Buffer(`${clientId}:${clientSecret}`).toString('base64')
          }
        }
      )
      console.log({ tokenResponse })
      const artistResponse = await Axios.get(
        // "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg",
        //'https://api.spotify.com/v1/users/jmperezperez',
        'https://api.spotify.com/v1/users/12138060996/playlists',
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.access_token}`
          }
        }
      ).then((data) => {
        this.artistResponse = data.data
        this.data.push.artistResponse.data
      })
      console.log(artistResponse.data.items[0])
    }
  },
  computed: {
    playlist() {
      return this.artistResponse.items[0]
    }
  }
}
</script>

<style>
.spotifySection {
  height: 1000px;
  background-color: #ede8e8;
}
.playlistSongs {
}
</style>
