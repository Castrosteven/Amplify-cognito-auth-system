<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <AccountSettings />
      </v-col>
      <v-col>
        <ResetPassword />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AccountSettings from "@/components/settings/AccountSettings.vue";
import ResetPassword from "@/components/settings/ResetPassword.vue";

export default {
  name: "settings",
  components: {
    AccountSettings,
    ResetPassword
  }
};
</script>

<style lang="scss" scoped></style>
