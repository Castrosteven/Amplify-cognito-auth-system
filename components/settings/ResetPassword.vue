<template>
  <v-card>
    <v-card-title>Password Reset</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="resetPassword">
        <v-text-field
          v-model="oldPassword"
          label="Enter old password"
        ></v-text-field>
        <v-text-field v-model="newPassword" label="Enter new password">
        </v-text-field>
        <v-btn type="submit">Reset Password</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ResetPassword",
  data() {
    return {
      oldPassword: "",
      newPassword: ""
    };
  },
  methods: {
    resetPassword() {
      this.$store.dispatch("account/passwordReset", {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
