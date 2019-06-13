<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Create Account</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <template v-if="registrationLoading">
              Creating new account...
            </template>
            <template v-else-if="!registrationCompleted">
              <v-form @submit.prevent="register(inputs)">
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
                  v-validate="'required|min:8|max:16'"
                  :error-messages="errors.first('password')"
                  ref="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  id="password"
                  type="password">
                </v-text-field>
                <v-text-field
                  v-model="inputs.confirmPassword"
                  v-validate="'required|confirmed:password'"
                  :error-messages="errors.first('confirmPassword')"
                  data-vv-as="password"
                  prepend-icon="lock"
                  name="confirmPassword"
                  label="Confirm Password"
                  id="confirmPassword"
                  type="password">
                </v-text-field>
                <v-alert type="error" :value="registrationError">
                  {{ errorMessage }}
                </v-alert>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" type="submit" :disabled="registrationLoading">Create</v-btn>
                </v-card-actions>
              </v-form>
            </template>
            <template v-else>
              Registration complete. You should receive an email shortly
              with a link to activate your account.
            </template>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
 </template>

<script>
import {
  mapState,
  mapActions,
} from 'vuex'

export default {
  data () {
    return {
      inputs: {
        email: '',
        password: '',
        confirmPassword: '',
      },
      errorMessage: '',
    }
  },
  computed: mapState('register', [
    'registrationCompleted',
    'registrationError',
    'registrationLoading',
  ]),
  methods: {
    ...mapActions('register', [
      'createAccount',
      'clearRegistrationStatus',
    ]),
    register ({ email, password, confirmPassword }) {
      this.$validator.validateAll()
        .then((valid) => {
          if (!valid) return;
          this.createAccount({ email, password, confirmPassword })
            .catch((errorMessage) => {
              this.errorMessage = errorMessage
            })
        })
    },
  },
  mounted () {
    this.$refs.email.focus()
  },
  beforeRouteLeave (to, from, next) {
    this.clearRegistrationStatus()
    next()
  },
}
</script>
