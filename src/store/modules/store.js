import Firebase from "firebase";

export const ModuloProductos = {
  namespaced: true,
  state: {
    search: "",
    products: [],
  },
  getters: {
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
    searchProductByClearance(state) {
      return state.products.filter((product) => product.clearance === true);
    },
  },
  mutations: {
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
      context.commit("SET_SEARCH", newSearch);
    },
    // Agregar producto a la lista de productos(ADMIN)
    // addProductToProductList(context, newProduct) {
    //   context.commit("ADD_PRODUCT_TO_PRODUCT_LIST", { ...newProduct });
    // },
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
  },
};
