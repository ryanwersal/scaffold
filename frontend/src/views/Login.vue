<template>
    <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Log In</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="attemptLogin(inputs)">
              <v-text-field
                ref="email"
                v-validate="'required|email'"
                :error-messages="errors.first('email')"
                v-model="inputs.email"
                prepend-icon="person"
                name="email"
                label="Email"
                id="email"
                type="email">
              </v-text-field>
              <v-text-field
                v-model="inputs.password"
                v-validate="'required'"
                :error-messages="errors.first('password')"
                prepend-icon="lock"
                name="password"
                label="Password"
                id="password"
                type="password">
              </v-text-field>
              <v-alert type="error" :value="authError">
                {{ errorMessage }}
              </v-alert>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit" :disabled="authenticating">Log In</v-btn>
              </v-card-actions>
              <router-link to="/password_reset">Forgot Password</router-link>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
 </template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
} from 'vuex'

export default {
  data () {
    return {
      inputs: {
        email: '',
        password: '',
      },
      errorMessage: '',
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapState('auth', [
    'authenticating',
    'authError',
    ]),
  },
  methods: {
    ...mapActions('auth', ['login']),
    attemptLogin ({ email, password }) {
      this.$validator.validateAll()
        .then((valid) => {
          if (!valid) return;

          this.login({ email, password })
            .then(() => {
              if (this.isAuthenticated) {
                this.$router.push('/main')
              }
            })
            .catch((errorMessage) => {
              this.errorMessage = errorMessage
            })
        })
    },
  },
  mounted () {
    this.$refs.email.focus()
  },
}
</script>
