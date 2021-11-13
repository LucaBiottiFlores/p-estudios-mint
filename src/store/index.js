import Vue from "vue";
import Vuex from "vuex";

import { ModuloCarrito } from "./modules/shoppingCart";
import { ModuloProductos } from "./modules/store";
import { ModuloSesion } from "./modules/sesion";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    products: ModuloProductos,
    shopCart: ModuloCarrito,
    sesion: ModuloSesion,
  },
});
