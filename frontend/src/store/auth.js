import auth from '@/api/auth'
import session from '@/api/session'

import {
  LOGIN_BEGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  REMOVE_TOKEN,
  SET_TOKEN,
} from './mutation-types'

const TOKEN_STORAGE_KEY = 'SCAFFOLD_TOKEN_STORAGE_KEY'

export default {
  namespaced: true,
  state: {
    authenticating: false,
    authError: false,
    token: null,
  },
  getters: {
    isAuthenticated: state => !!state.token
  },
  actions: {
    login({ commit }, { email, password }) {
      commit(LOGIN_BEGIN)
      return auth.login(email, password)
        .then(({ data }) => {
          commit(SET_TOKEN, data.key)
          commit(LOGIN_SUCCESS)
        })
        .catch((errorMessage) => {
          commit(LOGIN_FAILURE)
          throw errorMessage;
        })
    },
    logout({ commit }) {
      return auth.logout()
        .then(() => commit(LOGOUT))
        .finally(() => commit(REMOVE_TOKEN))
    },
    initialize({ commit }) {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY)

      if (token) {
        commit(SET_TOKEN, token)
      } else {
        commit(REMOVE_TOKEN)
      }
    },
  },
  mutations: {
    [LOGIN_BEGIN](state) {
      state.authenticating = true
      state.authError = false
    },
    [LOGIN_FAILURE](state) {
      state.authenticating = false
      state.authError = true
    },
    [LOGIN_SUCCESS](state) {
      state.authenticating = false
      state.authError = false
    },
    [LOGOUT](state) {
      state.authenticating = false
      state.authError = false
    },
    [SET_TOKEN](state, token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token)
      session.defaults.headers.Authorization = `Token ${token}`
      state.token = token
    },
    [REMOVE_TOKEN](state) {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      delete session.defaults.headers.Authorization
      state.token = null
    },
  },
}
