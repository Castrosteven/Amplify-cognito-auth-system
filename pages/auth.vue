<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <login-component
          v-if="
            !registerComponent &&
              !isAuthenticated &&
              confirmed == null &&
              !forgot
          "
          @switch="switchComponents"
          @forgot="switchToForgot"
        />
        <register-component
          v-else-if="registerComponent && !isAuthenticated && confirmed == null"
          @switch="switchComponents"
        />
        <confirmation-component v-if="confirmed == false" />
        <forgot-password v-if="forgot" @forgot="switchToForgot" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginComponent from "@/components/auth/LoginComponent.vue";
import RegisterComponent from "@/components/auth/RegisterComponent.vue";
import ConfirmationComponent from "@/components/auth/ConfirmationComponent.vue";
import ForgotPassword from "@/components/auth/password/ForgotPassword.vue";

export default {
  components: {
    LoginComponent,
    RegisterComponent,
    ConfirmationComponent,
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
    confirmed() {
      return this.$store.state.user.userConfirmed;
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
