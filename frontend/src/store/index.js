import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import password from './password'
import register from './register'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    password,
    register,
  },
})
