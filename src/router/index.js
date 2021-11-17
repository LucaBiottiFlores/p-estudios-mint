import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/carrito-de-compras',
    name: 'CarritoDeCompras',
    component: () => import('../views/ShopCart.vue')
  },
  {
    path: '/agendar-hora',
    name: 'Agendar hora',
    component: () => import('../views/AppointmentCalendar.vue')
  },
  {
    path: '/tienda',
    name: 'tienda',
    component: () => import('../views/Store.vue')
  },

  //////ADMIN
  {
    path: '/administrar',
    name: 'Administrar productos',
    component: () => import('../views/AdminProducts.vue'),
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/editar-producto/:id',
    name: 'Editar producto',
    component: () => import('../views/EditProduct.vue'),
    meta: {
      requiredLogin: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = Store.state.sesion.user // {user} | null
  const requiredLogin = to.meta.requiredLogin // undefined | true

  console.log({ currentUser, requiredLogin })

  if (requiredLogin) {
    if (currentUser) {
      next()
    } else {
      next({ name: 'Home' })
    }
  } else {
    next()
  }
})

export default router
