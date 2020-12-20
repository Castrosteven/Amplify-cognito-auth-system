<template>
  <v-form @submit.prevent="confirm" lazy-validation v-model="valid" ref="form">
    <v-text-field
      placeholder="Enter your new Password"
      type="password"
      v-model="password"
    ></v-text-field>
    <v-text-field
      v-model="code"
      :placeholder="`Enter Code Sent to ${this.username}`"
    ></v-text-field>
    <v-btn type="submite" color="primary"> Change Password </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "ForgotPasswordConfirm",
  props: {
    username: String
  },
  data() {
    return {
      valid: "",
      password: "",
      code: ""
    };
  },
  methods: {
    async confirm() {
      if (this.$refs.form.validate())
        try {
          await this.$store.dispatch("auth/forgotPasswordSubmit", {
            username: this.username,
            code: this.code,
            password: this.password
          });
          this.$router.go();
        } catch (error) {}
    }
  }
};
</script>

<style lang="scss" scoped></style>
