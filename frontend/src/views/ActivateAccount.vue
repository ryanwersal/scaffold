<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Account Confirmation</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <template v-if="activationLoading">Confirming account...</template>
            <template v-else-if="activationError">{{ errorMessage }}</template>
            <template v-else-if="activationCompleted">
              Account confirmation was successful!
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
  mapActions,
  mapState,
} from 'vuex'

export default {
  data () {
    return {
      errorMessage: '',
    }
  },
  computed: {
    ...mapState('register', [
      'activationCompleted',
      'activationError',
      'activationLoading',
    ]),
  },
  methods: mapActions('register', [
    'activateAccount',
    'clearActivationStatus',
  ]),
  created () {
    this.activateAccount(this.$route.params)
      .catch((errorMessage) => {
        this.errorMessage = errorMessage
      })
  },
  beforeRouteLeaveTo (to, from, next) {
    this.clearActivationStatus()
    next()
  },
}
</script>
