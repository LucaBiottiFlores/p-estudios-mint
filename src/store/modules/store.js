import Firebase from "firebase";

export const ModuloProductos = {
  namespaced: true,
  state: {
    search: "",
    products: [],
  },
  getters: {
    sendingProducts(state) {
      return state.products;
    },

    searchedProducts(state) {
      if (state.search === "") {
        return state.products;
      } else {
        return state.products.filter(
          (product) =>
            product.name.toLowerCase().includes(state.search.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(state.search.toLowerCase()) ||
            product.color.toLowerCase().includes(state.search.toLowerCase()) ||
            product.category.toLowerCase().includes(state.search.toLowerCase())
        );
      }
    },
  },
  mutations: {
    // MUTATE_PRODUCTS(state, products) {
    //   state.products = products;
    // },

    // setear busqueda
    SET_SEARCH(state, newSearch) {
      state.search = newSearch;
    },
    // setear agregar producto a la lista de productos (ADMIN)
    ADD_PRODUCT_TO_PRODUCT_LIST(state, newProduct) {
      state.products.push(newProduct);
    },

    //setea productos
    SET_PRODUCTS(state, newProduct) {
      state.products = newProduct;
    },
  },
  actions: {
    setSearch(context, newSearch) {
      if (typeof newSearch === "string") {
        context.commit("SET_SEARCH", newSearch);
      } else {
        console.warn(
          `newSearch debiese de ser de tipo string y recibir un tipo ${typeof newSearch}`
        );
      }
    },
    clickOnCheckout(context) {
      return new Promise((resolve) => {
        setTimeout(() => {
          context.commit("CLEAR_SHOPPING_CART");
          resolve();
        }, 1000);
      });
    },
    AllProducts(context) {
      Firebase.firestore()
        .collection("products")
        .get()
        .then((documents) => {
          const products = [];
          documents.forEach((document) => {
            products.push({ id: document.id, ...document.data() });
          });
          context.commit("SET_PRODUCTS", products);
        });
    },
    // bringProducts({ commit }) {
    //   Firebase.firestore()
    //     .collection("products")
    //     .onSnapshot((result) => {
    //       let products = [];
    //       result.forEach((element) => {
    //         products.push({
    //           price: element.data().price,
    //           name: element.data().name,
    //           category: element.data().category,
    //           color: element.data().color,
    //           src: element.data().src,
    //           description: element.data().description,
    //         });
    //       });
    //       commit("MUTATE_PRODUCTS", products);
    //     });
    // },

    // updateProducts(context, product) {
    //   return Firebase.firestore()
    //     .collection("products")
    //     .doc(product.productId)
    //     .update({ ...product });
    // },
  },
};
