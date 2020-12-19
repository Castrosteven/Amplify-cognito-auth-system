<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <login-component
          v-if="!registerComponent && !isAuthenticated && confirmed == null"
          @switch="switchComponents"
        />
        <register-component
          v-else-if="registerComponent && !isAuthenticated && confirmed == null"
          @switch="switchComponents"
        />
        <ConfirmationComponent v-if="confirmed == false" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginComponent from "@/components/auth/LoginComponent.vue";
import RegisterComponent from "@/components/auth/RegisterComponent.vue";
import ConfirmationComponent from "@/components/auth/ConfirmationComponent.vue";

export default {
  components: { LoginComponent, RegisterComponent, ConfirmationComponent },
  name: "Auth",
  data() {
    return {
      registerComponent: false
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
