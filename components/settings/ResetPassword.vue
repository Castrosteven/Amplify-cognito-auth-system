<template>
  <v-card>
    <v-card-title>Password Reset</v-card-title>
    <v-card-text>
      <v-form
        @submit.prevent="resetPassword"
        v-model="valid"
        lazy-validation
        ref="form"
      >
        <v-text-field
          placeholder="Old Password"
          v-model="oldPassword"
          :rules="rules.passwordRules"
          prepend-inner-icon="mdi-lock"
          :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="() => (value = !value)"
          :type="value ? 'text' : 'password'"
          counter
          required
        ></v-text-field>
        <v-text-field
          placeholder="New Password"
          v-model="newPassword"
          :rules="rules.passwordRules"
          prepend-inner-icon="mdi-lock"
          :append-icon="value1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="() => (value1 = !value1)"
          :type="value1 ? 'text' : 'password'"
          counter
          required
        ></v-text-field>
        <v-btn :disabled="!valid" type="submit" color="indigo" dark
          >Change Password</v-btn
        >
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ResetPassword",
  data() {
    return {
      valid: true,
      oldPassword: "",
      newPassword: "",
      value: "",
      value1: "",
      rules: {
        passwordRules: [
          value => !!value || "Please type password.",
          value => (value && value.length >= 6) || "minimum 6 characters"
        ]
      }
    };
  },
  methods: {
    resetPassword() {
      if (this.$refs.form.validate())
        this.$store.dispatch("account/passwordReset", {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        });
      (this.oldPassword = ""), (this.newPassword = "");
    }
  }
};
</script>

<style lang="scss" scoped></style>
