<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <login-component
          v-if="
            !registerComponent &&
              !forgot &&
              !needsConfirmation &&
              !userConfirmed
          "
          @switch="switchComponents"
          @forgot="switchToForgot"
        />
        <register-component
          v-else-if="registerComponent && !forgot && !userConfirmed"
          @switch="switchComponents"
        />
        <confirmation-component v-if="userConfirmed == false" />
        <forgot-password v-if="forgot" @forgot="switchToForgot" />
        <login-not-confirmed-code v-if="needsConfirmation" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginComponent from "@/components/auth/login/LoginComponent.vue";
import LoginNotConfirmedCode from "@/components/auth/login/LoginNotConfirmedCode.vue";
import RegisterComponent from "@/components/auth/register/RegisterComponent.vue";
import ConfirmationComponent from "@/components/auth/register/ConfirmationComponent.vue";
import ForgotPassword from "@/components/auth/password/ForgotPassword.vue";

export default {
  components: {
    LoginComponent,
    RegisterComponent,
    ConfirmationComponent,
    ForgotPassword,
    LoginNotConfirmedCode
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
    },
    userConfirmed() {
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
