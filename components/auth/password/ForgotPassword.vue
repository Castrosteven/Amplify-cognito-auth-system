<template>
  <div>
    <forgot-password-confirmation v-if="confirmation" />
    <v-card v-else>
      <v-card-title>Forgot Password</v-card-title>
      <v-card-text>
        <v-form
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
import ForgotPasswordConfirmation from "@/components/auth/password/ForgotPasswordConfirmation";

export default {
  name: "ForgotPassword",
  components: { ForgotPasswordConfirmation },
  data() {
    return {
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
    forgotPassword() {
      if (this.$refs.form.validate())
        this.$store.dispatch("auth/forgotPassword", {
          username: this.username
        });
    },
    forgotSwitch() {
      this.$emit("forgot");
    }
  }
};
</script>

<style lang="scss" scoped></style>
