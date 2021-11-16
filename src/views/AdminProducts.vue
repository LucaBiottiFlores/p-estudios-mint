<template>
  <div>
    <AddProduct />
    <AdminProducts />
  </div>
</template>

<script>
import AdminProducts from "../components/AdminProducts.vue";
import AddProduct from "../components/AddProduct.vue";

export default {
  components: {
    AdminProducts,
    AddProduct,
  },
};
</script>

<style scoped></style>
