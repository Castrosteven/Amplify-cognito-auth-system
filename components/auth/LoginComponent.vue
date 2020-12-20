<template>
  <div>
    <ConfirmationComponent v-if="confirmLogin" :email="email" />
    <v-card v-else>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form
          @submit.prevent="login"
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
            required
          ></v-text-field>

          <v-btn :disabled="!valid" type="submit" color="primary">Login</v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col>
              <p @click="sendSwitchSignal">
                Don't have an account? Register
              </p>
            </v-col>
            <v-col>
              <p @click="forgotSwitch">Forgot Password</p>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import ConfirmationComponent from "@/components/auth/ConfirmationComponent";
export default {
  name: "LoginComponent",
  components: {
    ConfirmationComponent
  },
  data() {
    return {
      value: "",
      email: "",
      password: "",

      valid: true,
      rules: {
        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        passwordRules: [value => !!value || "Please type password."]
      },
      confirmLogin: false
    };
  },
  methods: {
    sendSwitchSignal() {
      this.$emit("switch");
    },
    async login() {
      if (this.$refs.form.validate())
        await this.$store.dispatch("auth/signIn", {
          username: this.email,
          password: this.password
        });
      const err = this.$store.state.error;
      if (err === "User is not confirmed.") {
        this.$store.dispatch("auth/resendCode", { username: this.email });
        this.confirmLogin = true;
      }
    },
    forgotSwitch() {
      this.$emit("forgot");
    }
  }
};
</script>

<style lang="scss" scoped></style>
