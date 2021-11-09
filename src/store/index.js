import Vue from "vue";
import Vuex from "vuex";

import { ModuloProductos } from "./modules/store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    products: ModuloProductos,
  },
});
