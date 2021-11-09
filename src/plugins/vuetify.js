import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#a4f9c8", // Magic Mint
        secondary: "#43444d", // Dark Liver
        tertiary: "#ede8e8", // Isabelline
        error: "#b71c1c",
      },
    },
  },
});
