<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="btn_register" dark v-bind="attrs" v-on="on">
        Login
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-form
        v-model="valid"
        ref="form"
        @submit.prevent="validate"
        lazy-validation
        class="container"
      >
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :counter="20"
          :rules="passwordRules"
          label="Password"
          required
          type="password"
        ></v-text-field>

        <v-btn
          dark
          color="green accent-2"
          class="mr-4"
          type="submit"
          @click="validate"
        >
          Login
        </v-btn>

        <v-btn color="black" text @click="dialog = false"> Cerrar </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import Firebase from 'firebase'
export default {
  data() {
    return {
      dialog: false,
      loading: false,
      color: 'success',
      form: { email: '', password: '' },
      valid: true,
      password: '',
      passwordRules: [
        (v) => !!v || 'Se requiere contraseña',
        (v) =>
          (v && v.length >= 8) ||
          'Escribe una contraseña igual o mayor a 8 caracteres'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'Se requiere correo electrónico',
        (v) => /.+@.+\..+/.test(v) || 'Escribe un correo electrónico válido'
      ]
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        Firebase.auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            setTimeout(() => {
              this.$router
                .push({ name: 'Administrar productos' })
                .catch((error) => {
                  console.info(error.message)
                })
            }, 500)
          })
          .catch((error) => {
            console.error(error)
          })
      } else {
        console.log('error al logear')
      }
    }
  }
}
</script>

<style scoped>
.btn_register {
  font-family: 'Bebas Neue', cursive;
}
</style>
