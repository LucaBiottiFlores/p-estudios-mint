import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/carrito-de-compras",
    name: "CarritoDeCompras",
    component: () => import("../views/ShopCart.vue"),
  },
  {
    path: "/agendar-hora",
    name: "Agendar hora",
    component: () => import("../views/AppointmentCalendar.vue"),
  },
  {
    path: "/tienda",
    name: "tienda",
    component: () => import("../views/Store.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
