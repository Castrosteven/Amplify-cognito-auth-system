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
          :placeholder="msg"
          v-model="code"
          :rules="rules"
          counter="6"
        ></v-text-field>
        <v-btn :disabled="!valid" color="primary" type="submit">Submit</v-btn>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="resendCode">Resend Verfication Code</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ConfirmationComponent",
  props: {
    email: String
  },
  data() {
    return {
      valid: false,
      code: null,
      rules: [
        v => !!v || "Code is required",
        value => (value && value.length >= 6) || "minimum 6 characters"
      ]
    };
  },
  computed: {
    msg() {
      return `Enter Verfication Code Emailed to ${this.email}`;
    }
  },
  methods: {
    confirm() {
      try {
        if (this.$refs.form.validate())
          this.$store.dispatch("auth/confirm", {
            username: this.email,
            code: this.code
          });
        this.$router.go();
      } catch (error) {}
    },
    resendCode() {
      this.$store.dispatch("auth/resendCode", { username: this.email });
    }
  }
};
</script>

<style lang="scss" scoped></style>
