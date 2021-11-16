<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="btn_register" dark v-bind="attrs" v-on="on">
        Regístrate
      </v-btn>
    </template>
    <v-card>
      <v-form
        ref="form"
        @submit.prevent="RegisterUser"
        lazy-validation
        class="container"
      >
        <v-text-field
          v-model="email"
          :counter="10"
          :rules="emailRules"
          label="Correo"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Contraseña"
          required
        ></v-text-field>

        <v-btn
          dark
          :disabled="!valid"
          color="green accent-2"
          class="mr-4"
          type="submit"
          @click="validate"
        >
          Registrarse
        </v-btn>

        <v-btn color="black" text @click="dialog = false"> Cerrar </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import Firebase from "firebase";
export default {
  data: () => ({
    dialog: false,
    valid: true,
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    RegisterUser() {
      Firebase.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          console.log(userCredential);
          alert("Registro exitoso");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.btn_register {
  font-family: "Bebas Neue", cursive;
}
</style>
