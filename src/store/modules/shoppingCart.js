export const ModuloCarrito = {
  namespaced: true,
  state: {
    cart: [],
    products: []
  },
  getters: {
    productsOnShoppingCart(state) {
      return state.cart.map((item) => {
        const product = state.products.find(
          (product) => product.name === item.name
        )
        return {
          name: product.name,
          description: product.description,
          price: product.price,
          // discount: product.discount,
          // clearance: product.clearance,
          src: product.src,
          quantity: item.quantity
        }
      })
    },

    totalAmount(state) {
      return state.cart.reduce((accumulator, item) => {
        accumulator = accumulator + item.price * item.quantity
        return accumulator
      }, 0)
    },

    totalQuantityInShoppingCart(state) {
      return state.cart.reduce((accumulator, item) => {
        accumulator = accumulator + item.quantity
        return accumulator
      }, 0)
    }
  },
  mutations: {
    //agregar al carrito
    ADD_TO_CART(state, product) {
      state.cart.push({ ...product, quantity: 1 })
    },
    //aumentar y disminuir cantidad producto
    ADD_PRODUCT(state, product) {
      state.cart.push({ ...product, quantity: 1 })
    },

    INCREMENT_PRODUCT_QUANTITY(state, productInShoppinCart) {
      productInShoppinCart.quantity++
    },

    REDUCE_PRODUCT_QUANTITY(state, i) {
      state.cart[i].quantity--
    },

    REMOVE_PRODUCT(state, i) {
      state.cart.splice(i, 1)
    },

    CLEAR_SHOPPING_CART(state) {
      state.cart = []
    }
  },
  actions: {
    addProductToShoppingCart(context, product) {
      const productInShoppinCart = context.state.cart.find(
        (productInShoppinCart) =>
          (product.name && product.description) ===
          (productInShoppinCart.name && productInShoppinCart.description)
      )
      if (productInShoppinCart) {
        context.commit('INCREMENT_PRODUCT_QUANTITY', productInShoppinCart)
      } else {
        context.commit('ADD_TO_CART', product)
      }
    },

    incrementProductQuantity({ commit }, product) {
      commit('INCREMENT_PRODUCT_QUANTITY', product)
    },

    reduceProductQuantity(context, i) {
      if (context.state.cart[i].quantity > 1) {
        context.commit('REDUCE_PRODUCT_QUANTITY', i)
      } else {
        context.commit('REMOVE_PRODUCT', i)
      }
    },
    removeProductFromShoppingCart(context, i) {
      const productIndex = context.state.cart[i]
      context.commit('REMOVE_PRODUCT', productIndex)
    },

    clickOnCheckout(context) {
      return new Promise((resolve) => {
        setTimeout(() => {
          context.commit('CLEAR_SHOPPING_CART')
          resolve()
        }, 1000)
      })
    }
  }
}
