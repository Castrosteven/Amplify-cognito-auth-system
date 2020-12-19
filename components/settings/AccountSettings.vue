<template>
  <v-card>
    <v-card-title>Account Settings</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="update">
        <v-text-field
          filled
          label="Username"
          v-model="username"
          :placeholder="attributes[2].Value"
        ></v-text-field>
        <v-text-field
          filled
          label="Email"
          v-model="email"
          :placeholder="attributes[3].Value"
        ></v-text-field>

        <v-btn type="submit">Submit </v-btn>
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
      username: "",
      email: ""
    };
  },
  computed: {
    ...mapState("account", {
      attributes: state => state.attributes
    })
  },
  methods: {
    update() {
      this.$store.dispatch("account/updateUserAttributes", {
        username: this.username
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
