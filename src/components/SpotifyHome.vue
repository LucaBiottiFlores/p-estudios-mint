<template>
  <div class="spotifySection d-flex justify-center flex-column align-center">
    <h2 class="spotifySectionTitle">Escucha nuestras playlist recomendadas</h2>
    <div class="d-flex justify-center align-center flex-wrap">
      <template v-if="artistData">
        <v-card
          class="mx-5 my-5"
          v-for="(playlist, $index) in artistData.items"
          :key="$index"
        >
          <v-card-title>{{ playlist.name }}</v-card-title>
          <v-card-text>
            <a :href="`https://open.spotify.com/playlist/${playlist.id}`">
              <v-img
                aspect-ratio="1"
                min-width="300px"
                :src="playlist.images[0].url"
              >
              </v-img>
            </a>
          </v-card-text>
        </v-card>
      </template>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

const serialize = function (obj) {
  var str = [];
  for (var p in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }
  return str.join("&");
};

export default {
  data: () => {
    return {
      artistData: null,
    };
  },
  mounted() {
    this.startSpotify();
  },
  created() {
    this.startSpotify();
  },
  methods: {
    async startSpotify() {
      const clientId = "46766ccda4a84cb587332f9a62bd989e";
      const clientSecret = "c3d204142048482b88579dd0ad1ee65f";

      const {
        data: { access_token: spotifyAccessToken },
      } = await Axios.post(
        "https://accounts.spotify.com/api/token",
        serialize({ grant_type: "client_credentials" }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              new Buffer(`${clientId}:${clientSecret}`).toString("base64"),
          },
        }
      );

      const { data: artistData } = await Axios.get(
        // "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg",
        //'https://api.spotify.com/v1/users/jmperezperez',
        "https://api.spotify.com/v1/users/12138060996/playlists",
        {
          headers: {
            Authorization: `Bearer ${spotifyAccessToken}`,
          },
        }
      );

      this.artistData = artistData;

      console.log({ artistData: this.artistData });
    },
  },
};
//funciones generadoras
function* contador() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

const micontador = contador();
micontador.next();
micontador.next();
</script>

<style>
.spotifySection {
  height: 1000px;
  background-color: #ede8e8;
}
.spotifySectionTitle {
  text-align: center;
  font-family: "Bebas Neue", cursive;
  font-size: 70px;
  margin-bottom: 1.5em;
}
</style>
