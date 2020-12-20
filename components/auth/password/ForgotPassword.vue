<template>
  <div>
    <v-card>
      <v-card-title>Forgot Password</v-card-title>
      <v-card-text>
        <ForgotPasswordConfirm v-if="confirmation" :username="username" />
        <v-form
          v-else
          @submit.prevent="forgotPassword"
          lazy-validation
          v-model="valid"
          ref="form"
        >
          <v-text-field
            placeholder="Enter Your Email"
            v-model="username"
            :rules="rules.emailRules"
          ></v-text-field>
          <v-btn :disabled="!valid" type="submit" color="primary">
            Send Verification Code
          </v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions
        ><p @click="forgotSwitch">Back to Login</p></v-card-actions
      >
    </v-card>
  </div>
</template>

<script>
import ForgotPasswordConfirm from "./ForgotPasswordConfirm";
export default {
  name: "ForgotPassword",
  components: {
    ForgotPasswordConfirm
  },
  data() {
    return {
      code: "",
      valid: true,
      username: "",
      confirmation: false,
      rules: {
        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ]
      }
    };
  },
  methods: {
    async forgotPassword() {
      if (this.$refs.form.validate())
        try {
          await this.$store.dispatch("auth/forgotPassword", {
            username: this.username
          });
          this.confirmation = true;
        } catch (error) {}
    },
    confirm() {
      if (this.form.$refs.validate())
        this.$store.dispatch("auth/confirmPasswordReset", {
          username: this.username,
          code: this.code
        });
    },
    forgotSwitch() {
      this.$emit("forgot");
    }
  }
};
</script>

<style lang="scss" scoped></style>
