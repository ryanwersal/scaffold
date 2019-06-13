import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

const requireAuthenticated = (to, from, next) => {
  store.dispatch('auth/initialize')
    .then(() => {
      if (!store.getters['auth/isAuthenticated']) {
        next('/login')
      } else {
        next()
      }
    })
}

const requireUnauthenticated = (to, from, next) => {
  store.dispatch('auth/initialize')
    .then(() => {
      if (store.getters['auth/isAuthenticated']) {
        next('/main');
      } else {
        next();
      }
    });
};

const redirectLogout = (to, from, next) => {
  store.dispatch('auth/logout')
    .then(() => next('/'));
};

const routerOptions = [
  { path: '/', view: 'Home', beforeEnter: requireUnauthenticated },
  { path: '/login', view: 'Login', beforeEnter: requireUnauthenticated },
  { path: '/logout', beforeEnter: redirectLogout },
  { path: '/register', view: 'Register' },
  { path: '/register/:key', view: 'ActivateAccount' },
  { path: '/password_reset', view: 'PasswordReset' },
  { path: '/password_reset/:uid/:token', view: 'PasswordResetConfirm' },
  { path: '/main', view: 'Main', beforeEnter: requireAuthenticated },
  { path: '*', view: '404' },
]

const routes = routerOptions.map(opt => {
  let route = {
    path: opt.path,
  }

  if (opt.view) {
    route.component = () => import(`@/views/${opt.view}.vue`)
    route.name = opt.view.toLowerCase()
  } else {
    route.name = opt.path.replace('/', '')
  }

  if (opt.beforeEnter) {
    route.beforeEnter = opt.beforeEnter
  }

  return route;
})

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
