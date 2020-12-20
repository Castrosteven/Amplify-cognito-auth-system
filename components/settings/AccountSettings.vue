<template>
  <v-card flat>
    <v-card-title>Edit Account Settings</v-card-title>
    <v-card-text>
      <v-form
        @submit.prevent="update"
        lazy-validation
        v-model="valid"
        ref="form"
      >
        <v-text-field
          filled
          label="Username"
          v-model="username"
          :placeholder="attributes[2].Value"
          :rules="rules.usernameRules"
        ></v-text-field>

        <v-btn type="submit" :disabled="!valid" color="primary">Edit </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { Auth } from "aws-amplify";
import { mapState } from "vuex";
export default {
  name: "AccountSettings",
  data() {
    return {
      valid: true,
      username: "",
      rules: {
        usernameRules: [v => !!v || "Username is required"]
      }
    };
  },
  computed: {
    ...mapState({
      attributes: state => state.attributes
    })
  },
  methods: {
    update() {
      if (this.$refs.form.validate())
        this.$store.dispatch("account/updateUserAttributes", {
          username: this.username
        });
      this.username = "";
    }
  }
};
</script>

<style lang="scss" scoped></style>
