<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Reset Password</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <template v-if="emailLoading">
              Sending reset password email...
            </template>
            <template v-else-if="!emailCompleted">
              <v-form @submit.prevent="resetPassword(inputs)">
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
                <v-alert type="error" :value="emailError">
                  An error occured while processing your request. Please try again.
                </v-alert>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" type="submit" :disabled="emailLoading">Reset Password</v-btn>
                </v-card-actions>
              </v-form>
            </template>
            <template v-else>
              Email sent with a reset password link. Please check your spam folder if you don't receive it within a few minutes.
              <v-spacer></v-spacer>
              <router-link to="/">Click here to return Home.</router-link>
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
      },
    }
  },
  computed: mapState('password', [
    'emailCompleted',
    'emailError',
    'emailLoading',
  ]),
  methods: {
    ...mapActions('password', [
    'sendPasswordResetEmail',
    'clearEmailStatus',
    ]),
    resetPassword ({ email }) {
      this.$validator.validateAll()
        .then((valid) => {
          if (!valid) return;
          this.sendPasswordResetEmail({ email })
        })
    },
  },
  beforeRouteLeave (to, from, next) {
    this.clearEmailStatus()
    next()
  },
  mounted () {
    this.$refs.email.focus()
  },
}
</script>
