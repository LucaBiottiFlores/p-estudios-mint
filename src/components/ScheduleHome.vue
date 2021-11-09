<template>
  <div class="schedule d-flex flex-column align-center justify-center">
    <div>
      <h2 class="scheduleTitle">
        Agenda tu hora <br />
        es rápido, fácil y seguro
      </h2>
    </div>
    <div class="my-16">
      <v-sheet
        class="d-flex justify-center align-center"
        height="110"
        rounded
        width="300"
      >
        <v-btn class="scheduleButton" elevation="1" plain x-large
          ><router-link to="/agendar-hora">Agenda aquí</router-link></v-btn
        >
      </v-sheet>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.scheduleButton {
  font-family: "Bebas Neue", cursive;
  background-color: #97ccb1;
  font-size: 30px;
  color: white;
}

.schedule {
  height: 500px;
  width: auto;
  background-image: url("../assets/agendar-hora2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.scheduleTitle {
  font-family: "Bebas Neue", cursive;
  color: white;
  font-size: 60px;
  text-align: center;
}

.theme--light .v-sheet {
  background-color: rgba(255, 255, 255, 0.5);
}
a:-webkit-any-link {
  text-decoration: none;
  color: white;
}
</style>
