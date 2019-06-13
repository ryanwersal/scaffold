<template>
  <div id="navbar">
    <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in visibleMenuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      appTitle: 'Scaffold',
      sidebar: false,
      menuItems: [
        { title: 'Sign Up', path: '/register', icon: 'face', requiresAuth: false },
        { title: 'Log In', path: '/login', icon: 'lock_open', requiresAuth: false },
        { title: 'Log Out', path: '/logout', icon: 'exit_to_app', requiresAuth: true },
      ]
    }
  },
  computed: {
    visibleMenuItems () {
      return this.menuItems.filter(item => item.requiresAuth === this.$store.getters['auth/isAuthenticated'])
    },
  },
}
</script>
