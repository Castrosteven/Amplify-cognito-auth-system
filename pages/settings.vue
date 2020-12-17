<template>
  <v-container>
    <v-row>
      <v-col>
        <AccountSettings />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AccountSettings from "@/components/settings/AccountSettings.vue";
export default {
  name: "settings",
  components: {
    AccountSettings
  }
};
</script>

<style lang="scss" scoped></style>
