import Vue from "vue";
import Vuex from "vuex";
import { ModuloProductos } from "./modules/store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: "",
    shoppingCart: [],
    products: [
      {
        name: "Polera Madonna",
        description: "Polera Madonna Tallas XL - S - Negro",
        category: "Polera",
        color: "Negro",
        price: 5000,
        src: "https://cdn.shopify.com/s/files/1/0384/0921/products/madonna-true-blue-t-shirt.main_d96d18f3-17b2-4b44-a31a-c0c1c3cd79c1.jpg?v=1590641785",
      },
      {
        name: "Poleron Rolling Stones",
        description: "Poleron Rolling Stones Tallas XL - S - Rojo",
        category: "Poleron",
        color: "Rojo",
        price: 10000,
        src: "https://www.ecamisetas.com/blog/wp-content/uploads/2012/08/Sudadera-Merchandising-para-Grupos.jpg",
      },
      {
        name: "Gorro Guns n'Roses",
        description: "Gorro Guns n' Roses Talla Única - Negro",
        category: "Gorro",
        color: "Negro",
        price: 2000,
        src: "https://houseofrockweb.com/8497-thickbox_default/gorra-guns-n-roses-logo.jpg",
      },
      {
        name: "Polera Drake",
        description: "Polera Drake Tallas XL - S - Blanco",
        category: "Polera",
        color: "Blanco",
        price: 5000,
        src: "https://m.media-amazon.com/images/I/71jQIIksrkL._AC_UL1500_.jpg",
      },
      {
        name: "Taza Guitarra Eléctrica",
        description:
          "Taza De Ceramica Diseño Guitarra Electrica - Blanco y negro",
        category: "Taza",
        color: "Blanco",
        price: 2000,
        src: "https://http2.mlstatic.com/D_731868-CBT44371076646_122020-O.jpg",
      },
      {
        name: "Polera AC/DC",
        description: "Polera AC/DC Tallas XL - S - Negro",
        category: "Polera",
        color: "Negro",
        price: 5000,
        src: "https://m.media-amazon.com/images/I/61nJVKNfxNL._AC_UX385_.jpg",
      },
    ],
  },
  modules: {
    ModuloProductos,
  },
});
