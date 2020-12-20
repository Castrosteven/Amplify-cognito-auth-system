<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <login-component
          v-if="!registerComponent && !forgot"
          @switch="switchComponents"
          @forgot="switchToForgot"
        />
        <register-component
          v-else-if="registerComponent"
          @switch="switchComponents"
        />
        <forgot-password @forgot="switchToForgot" v-if="forgot" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginComponent from "@/components/auth/LoginComponent.vue";
import RegisterComponent from "@/components/auth/RegisterComponent.vue";
import ForgotPassword from "@/components/auth/password/ForgotPassword.vue";

export default {
  components: {
    LoginComponent,
    RegisterComponent,
    ForgotPassword
  },
  name: "Auth",
  data() {
    return {
      registerComponent: false,
      forgot: false
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    needsConfirmation() {
      return this.$store.state.needsConfirmation;
    }
  },
  methods: {
    switchComponents() {
      this.registerComponent = !this.registerComponent;
    },
    switchToForgot() {
      this.forgot = !this.forgot;
    }
  }
};
</script>

<style lang="scss" scoped></style>
