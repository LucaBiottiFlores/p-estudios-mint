import Vue from "vue";
import Vuex from "vuex";

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

    productsOnShoppingCart(state) {
      return state.shoppingCart.map((item) => {
        const product = state.products.find(
          (product) => product.name === item.name
        );
        return {
          name: product.name,
          description: product.description,
          price: product.price,
          discount: product.discount,
          clearance: product.clearance,
          src: product.src,
          quantity: item.quantity,
        };
      });
    },

    totalAmountShoppingCart(state) {
      return state.shoppingCart.reduce((accumulator, item) => {
        accumulator =
          accumulator + item.price * (1 - item.discount / 100) * item.quantity;
        return accumulator;
      }, 0);
    },

    totalQuantityInShoppingCart(state) {
      return state.shoppingCart.reduce((accumulator, item) => {
        accumulator = accumulator + item.quantity;
        return accumulator;
      }, 0);
    },

    totalDiscountShoppingCart(state) {
      return state.shoppingCart.reduce((accumulator, item) => {
        accumulator =
          accumulator +
          (item.price * item.quantity -
            item.price * (1 - item.discount / 100) * item.quantity);
        return accumulator;
      }, 0);
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
    // setear agregar producto a carrito (ADMIN)
    ADD_PRODUCT_TO_SHOPPING_CART(state, product) {
      state.shoppingCart.push({ ...product, quantity: 1 });
    },
    // setear aumentar numero de productos en carrito
    INCREMENT_PRODUCT_QUANTITY(state, productAlreadyInShoppinCart) {
      productAlreadyInShoppinCart.quantity++;
    },
    // setear disminuir numero de productos en carrito
    REDUCE_PRODUCT_QUANTITY(state, index) {
      state.shoppingCart[index].quantity--;
    },
    // setear eliminar producto de carrito
    REMOVE_PRODUCT_FROM_SHOPPING_CART(state, index) {
      state.shoppingCart.splice(index, 1);
    },
    // setear eliminar todos los productos del carrito
    CLEAR_SHOPPING_CART(state) {
      state.shoppingCart = [];
    },
  },
  actions: {
    setSearch(context, newSearch) {
      context.commit("SET_SEARCH", newSearch);
    },
    // Agregar producto a la lista de productos(ADMIN)
    addProductToProductList(context, newProduct) {
      context.commit("ADD_PRODUCT_TO_PRODUCT_LIST", { ...newProduct });
    },

    addProductToShoppingCart(context, product) {
      const productAlreadyInShoppinCart = context.state.shoppingCart.find(
        (productAlreadyInShoppinCart) =>
          (product.name && product.description) ===
          (productAlreadyInShoppinCart.name &&
            productAlreadyInShoppinCart.description)
      );

      if (productAlreadyInShoppinCart) {
        context.commit(
          "INCREMENT_PRODUCT_QUANTITY",
          productAlreadyInShoppinCart
        );
      } else {
        context.commit("ADD_PRODUCT_TO_SHOPPING_CART", product);
      }
    },

    reduceProductQuantity(context, index) {
      if (context.state.shoppingCart[index].quantity > 1) {
        context.commit("REDUCE_PRODUCT_QUANTITY", index);
      } else {
        context.commit("REMOVE_PRODUCT_FROM_SHOPPING_CART", index);
      }
    },
    removeProductFromShoppingCart(context, index) {
      const productIndex = context.state.shoppingCart[index];
      context.commit("REMOVE_PRODUCT_FROM_SHOPPING_CART", productIndex);
    },

    clickOnCheckout(context) {
      return new Promise((resolve) => {
        setTimeout(() => {
          context.commit("CLEAR_SHOPPING_CART");
          resolve();
        }, 1000);
      });
    },
  },
  modules: {},
});
