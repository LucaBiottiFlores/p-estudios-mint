export const ModuloCarrito = {
  namespaced: true,
  state: {
    Cart: [],
  },
  getters: {
    productsOnShoppingCart(state) {
      return state.Cart.map((item) => {
        const product = state.products.find(
          (product) => product.name === item.name
        );
        return {
          name: product.name,
          description: product.description,
          price: product.price,
          // discount: product.discount,
          // clearance: product.clearance,
          src: product.src,
          quantity: item.quantity,
        };
      });
    },

    totalAmount(state) {
      return state.Cart.reduce((accumulator, item) => {
        accumulator =
          accumulator + item.price * (1 - item.discount / 100) * item.quantity;
        return accumulator;
      }, 0);
    },

    totalQuantityInShoppingCart(state) {
      return state.Cart.reduce((accumulator, item) => {
        accumulator = accumulator + item.quantity;
        return accumulator;
      }, 0);
    },
    // totalDiscountShoppingCart(state) {
    //   return state.Cart.reduce((accumulator, item) => {
    //     accumulator =
    //       accumulator +
    //       (item.price * item.quantity -
    //         item.price * (1 - item.discount / 100) * item.quantity);
    //     return accumulator;
    //   }, 0);
    // },
  },
  mutations: {
    ADD_PRODUCT(state, product) {
      state.Cart.push({ ...product, quantity: 1 });
    },
    // setear aumentar numero de productos en carrito
    INCREMENT_PRODUCT_QUANTITY(state, productAlreadyInShoppinCart) {
      productAlreadyInShoppinCart.quantity++;
    },
    // setear disminuir numero de productos en carrito
    REDUCE_PRODUCT_QUANTITY(state, index) {
      state.Cart[index].quantity--;
    },
    // setear eliminar producto de carrito
    REMOVE_PRODUCT(state, index) {
      state.Cart.splice(index, 1);
    },
    // setear eliminar todos los productos del carrito
    CLEAR_SHOPPING_CART(state) {
      state.Cart = [];
    },
  },
  actions: {
    addProductToShoppingCart(context, product) {
      const productAlreadyInShoppinCart = context.state.Cart.find(
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
        context.commit("ADD_PRODUCT", product);
      }
    },

    reduceProductQuantity(context, index) {
      if (context.state.Cart[index].quantity > 1) {
        context.commit("REDUCE_PRODUCT_QUANTITY", index);
      } else {
        context.commit("REMOVE_PRODUCT", index);
      }
    },
    removeProductFromShoppingCart(context, index) {
      const productIndex = context.state.Cart[index];
      context.commit("REMOVE_PRODUCT", productIndex);
    },
  },
};
