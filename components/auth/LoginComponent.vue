<template>
  <div>
    <v-card v-if="!userNotConfirmedError">
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
        <p @click="sendSwitchSignal">
          Don't have an account? Register
        </p>
      </v-card-actions>
    </v-card>
    <div v-else-if="userNotConfirmedError">
      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <confirmation-component :resendEmail="email" />
          </v-col>
          <v-col cols="12">
            <v-btn color="primary" @click="resendCode">
              Send me a new confirmation code to {{ this.email }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import ConfirmationComponent from "./ConfirmationComponent.vue";
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
      userNotConfirmedError: false,
      valid: true,
      rules: {
        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        passwordRules: [value => !!value || "Please type password."]
      }
    };
  },
  methods: {
    sendSwitchSignal() {
      this.$emit("switch");
    },
    login() {
      this.$refs.form.validate()
        ? this.$store
            .dispatch("auth/signIn", {
              username: this.email,
              password: this.password
            })
            .then(() => {
              this.$store.state.auth.isAuthenticated
                ? this.$router.push("/")
                : this.$store.state.auth.error.code ===
                  "UserNotConfirmedException"
                ? (this.userNotConfirmedError = true)
                : null;
            })
        : null;
    },
    resendCode() {
      this.$store
        .dispatch("reSendSignUp", { username: this.email })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
