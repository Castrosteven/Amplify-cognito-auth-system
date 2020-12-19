<template>
  <v-card>
    <v-card-title>Account Settings</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="update">
        <v-text-field
          filled
          label="Username"
          :placeholder="user.username"
        ></v-text-field>
        <v-text-field
          filled
          label="Email"
          :placeholder="user.attributes.email"
        ></v-text-field>
        <v-btn type="submit">Submit </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  name: "AccountSettings",

  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    update() {
      alert("clicked");
    }
  }
};
</script>

<style lang="scss" scoped></style>
