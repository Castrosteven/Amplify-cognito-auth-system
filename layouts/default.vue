<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="this.$store.state.auth.isAuthenticated"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Alloy
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ user }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon
        v-if="this.$store.state.auth.isAuthenticated"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn @click="signOut" v-if="this.$store.state.auth.isAuthenticated">
        Sign Out
      </v-btn>
      <v-btn to="/auth" v-else> Login </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch("auth/isAuthenticated");
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-home",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-cog",
          title: "Settings",
          to: "/settings"
        },
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/dashboard"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js"
    };
  },
  computed: {
    user() {
      if (!this.$store.state.auth.isAuthenticated) {
        return "";
      } else {
        return this.$store.state.auth.user.attributes.email;
      }
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch("auth/signOut");
      this.$router.go("/");
    }
  }
};
</script>
