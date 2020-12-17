<template>
  <v-container>
    <v-alert type="success" v-if="this.$store.state.auth.msg != null">{{
      this.$store.state.auth.msg
    }}</v-alert>
    <v-alert type="error" v-if="this.$store.state.auth.error != null">{{
      this.$store.state.auth.error.message
    }}</v-alert>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <login-component v-if="!registerComponent" @switch="switchComponents" />
        <register-component
          v-else-if="registerComponent"
          @switch="switchComponents"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginComponent from "@/components/auth/LoginComponent.vue";
import RegisterComponent from "@/components/auth/RegisterComponent.vue";

export default {
  components: { LoginComponent, RegisterComponent },
  name: "Auth",
  data() {
    return {
      registerComponent: false
    };
  },
  methods: {
    switchComponents() {
      this.registerComponent = !this.registerComponent;
    }
  }
};
</script>

<style lang="scss" scoped></style>
