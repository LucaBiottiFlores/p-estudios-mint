<template>
  <div class="storeHomeContainer d-flex flex-column justify-center">
    <h2 class="storeHomeTitle">Conoce los productos</h2>
    <h3 class="storeHomeSubTitle">de nuestra tienda</h3>
    <router-link class="size" to="/tienda">
      <div class="d-flex justify-center">
        <div class="whiteContainer">
          <v-row>
            <v-col
              v-for="product in $store.state.products.products"
              :key="product.id"
              sm="12"
              lg="4"
              md="6"
              class="d-flex justify-center"
            >
              <v-card class="mx-auto px-5 py-5" max-width="350">
                <v-img :src="product.src" width="200" height="200"></v-img>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
.storeHomeContainer {
  max-height: 3000px;
  padding-top: 100px;
  background-color: #97ccb1;
}
.whiteContainer {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 30px;
  margin-bottom: 40px;
  width: 80%;
}
.storeHomeTitle {
  text-align: center;
  font-family: "Bebas Neue", cursive;
  font-size: 70px;
  color: white;
}
.storeHomeSubTitle {
  font-family: "Bebas Neue", cursive;
  font-size: 60px;
  text-align: center;
  margin-bottom: 10px;
}
</style>
