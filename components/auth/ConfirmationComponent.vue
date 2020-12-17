<template>
  <v-card>
    <v-card-text>
      <v-form
        @submit.prevent="confirm"
        lazy-validation
        v-model="valid"
        ref="form"
      >
        <v-text-field
          type="number"
          :placeholder="displayEMail"
          v-model="code"
          :rules="rules"
          counter="6"
        ></v-text-field>
        <v-btn :disabled="!valid" color="primary" type="submit">Submit</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ConfirmationComponent",
  props: {
    resendEmail: String
  },
  data() {
    return {
      valid: true,
      email: this.$store.state.auth.user.username,
      code: null,
      rules: [
        v => !!v || "Code is required",
        value => (value && value.length >= 6) || "minimum 6 characters"
      ]
    };
  },
  computed: {
    displayEMail() {
      if (this.email) {
        return ` Enter Verification code sent to ${this.email}`;
      } else if (this.resendEmail) {
        return `Enter Verification code sent to ${this.resendEmail}`;
      } else {
        return null;
      }
    }
  },
  methods: {
    confirm() {
      const sendCode = email => {
        this.$store
          .dispatch("auth/confirmSignUp", {
            username: email,
            code: this.code
          })
          .then(res => {
            console.log(res);
            if (res === "SUCCESS") {
              this.$store.commit(
                "message",
                `${res}, we are sending you to the login page ...`
              );
              setTimeout(() => {
                this.$router.go(this.$router.currentRoute);
              }, 5000);
            }
          });
      };
      if (this.email) {
        sendCode(this.email);
      } else if (this.resendEmail) {
        sendCode(this.resendEmail);
      } else {
        return null;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
