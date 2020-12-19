<template>
  <div>
    <v-card>
      <v-card-title>
        Register
      </v-card-title>
      <v-card-text>
        <v-form
          @submit.prevent="register"
          lazy-validation
          v-model="valid"
          ref="form"
        >
          <v-text-field
            placeholder="Email"
            type="email"
            v-model="email"
            prepend-inner-icon="mdi-email"
            :rules="rules.emailRules"
            required
          ></v-text-field>
          <v-text-field
            placeholder="Password"
            v-model="password"
            :rules="rules.passwordRules"
            prepend-inner-icon="mdi-lock"
            :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (value = !value)"
            :type="value ? 'text' : 'password'"
            counter
            required
          ></v-text-field>
          <v-text-field
            placeholder="Password Confirmation"
            v-model="passwordConfirmation"
            :rules="rules.confirmPasswordRules"
            prepend-inner-icon="mdi-lock"
            :append-icon="value1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (value1 = !value1)"
            :type="value1 ? 'text' : 'password'"
            counter
            required
          ></v-text-field>
          <v-btn :disabled="!valid" type="submit" color="primary"
            >Register</v-btn
          >
        </v-form>
      </v-card-text>
      <v-card-actions>
        <p @click="sendSwitchSignal">
          Already have an account? Login
        </p>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "RegisterComponent",
  data() {
    return {
      valid: true,
      email: "",
      password: "",
      passwordConfirmation: "",
      value: "",
      value1: "",
      rules: {
        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        passwordRules: [
          value => !!value || "Please type password.",
          value => (value && value.length >= 6) || "minimum 6 characters"
        ],
        confirmPasswordRules: [
          value => !!value || "type confirm password",
          value =>
            value === this.password ||
            "The password confirmation does not match."
        ]
      }
    };
  },
  methods: {
    sendSwitchSignal() {
      this.$emit("switch");
    },
    register() {
      this.$refs.form.validate()
        ? this.$store.dispatch("auth/signUp", {
            username: this.email,
            password: this.password
          })
        : null;
    }
  }
};
</script>

<style lang="scss" scoped></style>
