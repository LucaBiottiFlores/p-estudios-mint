<template>
  <div class="container shopping-cart">
    <table class="table table-bordered">
      <tbody>
        <tr
          v-for="(product, i) in $store.state.shopCart.cart"
          :key="product.id"
        >
          <td class="td-item-img align-middle text-center">
            <img :src="product.src" alt="" class="img-fluid" />
          </td>
          <td class="td-item-name align-middle">
            <h3>
              {{ product.name }}
            </h3>
            <p>{{ product.description }}</p>
          </td>
          <td class="td-item-quantity align-middle text-center">
            <button
              class="btn change-quantity-button mr-2"
              @click="reduceProductQuantity(i)"
            >
              -</button
            >{{ product.quantity
            }}<button
              class="btn change-quantity-button ml-2"
              @click="incrementProductQuantity(product)"
            >
              +
            </button>
            <hr />
            <button
              class="btn-delete"
              @click="removeProductFromShoppingCart(i)"
            >
              Eliminar
            </button>
          </td>
          <td class="td-item-price align-middle text-center">
            <h5>Total Producto</h5>
            <h4 class="total-shopping-cart">
              ${{
                parseInt(product.price * product.quantity).toLocaleString(
                  'de-DE'
                )
              }}
            </h4>
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <div class="mt-5 text-right" v-if="$store.state.shopCart.cart.length > 0">
        <h4 class="total">
          El total a pagar es: ${{
            parseInt($store.getters['shopCart/totalAmount']).toLocaleString(
              'de-DE'
            )
          }}
        </h4>
        <!-- <div v-if="$store.getters['totalDiscountShoppingCart'] > 0">
          <p class="product-quantity">
            Tienes
            {{ $store.getters.totalQuantityInShoppingCart }} productos en tu
            carro de compras
            <br />
            Estarías ahorrando ${{
              parseInt(
                $store.getters['totalDiscountShoppingCart']
              ).toLocaleString('de-DE')
            }}
            en esta compra 😉
          </p>
        </div>
        <div v-else>
          <p class="product-quantity">
            Tienes
            {{ $store.getters.totalQuantityInShoppingCart }} productos en tu
            carro de compras
          </p>
        </div> -->
        <div class="container text-right">
          <button class="btn btn_color_mint btn-outline-primary mt-3" @click="clickOnCheckout">
            Comprar 😃
          </button>
        </div>
      </div>

      <h4 class="mt-5" v-else>
        No tienes productos en tu carrito de compras actualmente
      </h4>
    </div>
  </div>
</template>

<script>
//import PurchaseModal from './PurchaseModal.vue'

export default {
  name: 'ShoppingCart',
  // components: {
  //   PurchaseModal
  // },
  props: {
    products: { type: Array, require: true }
  },
  methods: {
    reduceProductQuantity(i) {
      this.$store.dispatch('shopCart/reduceProductQuantity', i)
    },
    incrementProductQuantity(product) {
      this.$store.dispatch('shopCart/incrementProductQuantity', product)
    },
    removeProductFromShoppingCart(i) {
      this.$store.dispatch('shopCart/removeProductFromShoppingCart', i)
    },
    async clickOnCheckout() {
      await this.$store.dispatch('shopCart/clickOnCheckout')
      this.$router.push('/checkout')
    }
  }
}
</script>

<style>
.btn_color_mint {
  color: black;
  background-color: #95f5bd ;
  border-color: #95f5bd;
  font-family: "Bebas Neue", cursive;
  font-size: 25px;
  width: 150px;
  height: 50px;
}
.btn_color_mint:hover {
  background-color: #43444D;
  border-color: #43444D;
}
.title_color_mint {
  color: #90d4ac;
}

.td-item-img {
  width: 20%;
}

.td-item-name {
  width: 30%;
}

.td-item-quantity {
  width: 25%;
  font-size: 20px;
}

.td-item-price {
  width: 25%;
}

.btn:hover {
  color: #95f5bd;
}

.change-quantity-button {
  border-radius: 25%;
  background-color: #00aa47;
  color: #ffffff;
  border-color: #95f5bd;
  font-size: 16px;
}

.btn-delete {
  background-color: transparent;
  border-color: transparent;
  font-size: 14px;
  color: #5a5a5a;
  text-decoration: underline;
}

.btn-delete:hover {
  color: #d454c3;
}

.image-discount {
  height: 30px;
}

.product-price {
  font-weight: bold;
  font-size: 20px;
}

.total-shopping-cart {
  font-weight: bold;
}

.total {
  font-weight: bold;
}

.product-quantity {
  font-size: 14px;
  font-weight: normal;
}
</style>
