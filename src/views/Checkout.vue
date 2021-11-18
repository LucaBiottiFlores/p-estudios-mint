<template>
  <div class="home text-center">
    <section class="banner-checkout">
      <div class="pt-5">
        <div>
          <h4>¡Genial! tu producto llegará en 2 horas 🎉</h4>
        </div>
        <div class="container text-center">
          <button type="button" class="btn btn-outline-light mt-5">
            <router-link :to="{ name: 'Home' }" class="nav-link"
              >Seguir Comprando</router-link
            >
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home'
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}

section {
  width: 100%;
  height: 100vh;
  background: linear-gradient(-45deg, #43444D, #A4F9C8, #A4F9C8, #EDE8E8);
  background-size: 400% 400%;
  animation: gradient 8s ease infinite;
  position: relative;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.btn-grad {
  background-image: linear-gradient(
    to right,
    #A4F9C8 0%,
    #97CCB1 51%,
    #43444D 100%
  );
  width: 300px;
}
.btn-grad {
  text-align: center;
  transition: 0.5s;
  background-size: 200% auto;
  color: black;
  box-shadow: 0 0 20px #000;
  border-radius: 10px;
  display: block;
}

.btn-grad:hover {
  background-position: right center;
  color: #000;
  text-decoration: none;
  background-image: linear-gradient(
    to right,
    #43444D 0%,
    #000000 51%,
    #000000 100%
  );
}

.nav-link:hover {
  text-decoration: none !important;
  color: #43444D !important;
}

.banner-checkout {
  padding-top: 300px;
  color: black;
}
</style>
