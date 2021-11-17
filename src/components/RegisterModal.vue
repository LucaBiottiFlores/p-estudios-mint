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
        ref="form"
        @submit.prevent="handleFormSubmit"
        lazy-validation
        class="container"
      >
        <v-text-field
          v-model="form.email"
          :counter="10"
          :rules="[required]"
          label="Correo"
          required
          type="email"
          name="email"
          :disabled="loading"
        ></v-text-field>

        <v-text-field
          label="Contraseña"
          v-model="form.password"
          :rules="[required]"
          type="password"
          name="password"
          :disabled="loading"
        ></v-text-field>

        <v-btn
          dark
          color="green accent-2"
          class="mr-4"
          type="submit"
          @click="handleFormSubmit"
        >
          Login
        </v-btn>

        <v-btn color="black" text @click="dialog = false"> Cerrar </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import delay from 'delay'
export default {
  data: () => ({
    dialog: false,
    loading: false,
    color: 'success',
    form: { email: '', password: '' }
  }),
  methods: {
    async handleFormSubmit() {
      if (this.$refs.userForm.validate()) {
        try {
          this.loading = true
          await this.$store.dispatch('sesion/signIn', this.form)
          this.dialog = false
          this.loading = false
        } catch (e) {
          this.loading = false
          this.color = 'error'
          await delay(2000)
          this.color = 'success'
        }
      }
    },
    required(value) {
      return !!value || 'Este campo es obligatorio'
    }
  }
}
</script>

<style scoped>
.btn_register {
  font-family: 'Bebas Neue', cursive;
}
</style>
