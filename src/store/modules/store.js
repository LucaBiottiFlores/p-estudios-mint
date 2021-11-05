// import Firebase from "firebase";

export const ModuloProductos = {
  namespaced: true,
  state: {
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
    // mutations: {
    //   SET_PRODUCTS(state, newProduct) {
    //     state.products = newProduct;
    //   },
    // },

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
  // actions: {
  //   TodosLosCursos(context) {
  //     Firebase.firestore()
  //       .collection("products")
  //       .get()
  //       .then((documents) => {
  //         const products = [];
  //         documents.forEach((document) => {
  //           products.push({ id: document.id, ...document.data() });
  //           context.commit("SET_PRODUCTS", products);
  //         });
  //       });
  //   },
  // },
};
