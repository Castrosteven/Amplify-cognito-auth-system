<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <h1 class="text-center">Welcome to Alloy</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  beforeCreate() {
    if (this.$store.state.isAuthenticated)
      this.$store.dispatch("account/userAttributes");
  }
};
</script>

<style lang="scss" scoped></style>
