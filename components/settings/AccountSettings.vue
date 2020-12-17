<template>
  <v-card>
    <v-card-text>
      <v-card-title>Account Settings</v-card-title>
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
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "AccountSettings",
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  }
};
</script>

<style lang="scss" scoped></style>
