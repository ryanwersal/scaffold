<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Reset Password</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <template v-if="resetLoading">
              Resetting password...
            </template>
            <template v-else-if="!resetCompleted">
              <v-form @submit.prevent="tryResetPassword(inputs)">
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
                <v-alert type="error" :value="resetError">
                  {{ errorMessage }}
                </v-alert>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" type="submit" :disabled="resetLoading">Reset Password</v-btn>
                </v-card-actions>
              </v-form>
            </template>
            <template v-else>
              Your password has been reset.
              <v-spacer></v-spacer>
              <router-link to="/login">Click here to Log In.</router-link>
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
        password: '',
        confirmPassword: '',
        uid: this.$route.params.uid,
        token: this.$route.params.token,
      },
      errorMessage: '',
    }
  },
  computed: mapState('password', [
    'resetCompleted',
    'resetError',
    'resetLoading',
  ]),
  methods: {
    ...mapActions('password', [
    'resetPassword',
    'clearResetStatus',
    ]),
    tryResetPassword ({ uid, token, password, confirmPassword }) {
      this.$validator.validateAll()
        .then((valid) => {
          if (!valid) return;
          this.resetPassword({ uid, token, password, confirmPassword })
          .catch((errorMessage) => {
            this.errorMessage = errorMessage
          })
        })
    },
  },
  beforeRouteLeave (to, from, next) {
    this.clearResetStatus()
    next()
  },
  mounted () {
    this.$refs.password.focus()
  },
}
</script>
