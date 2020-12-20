<template>
  <v-container>
    <v-card>
      <v-tabs v-model="tab" background-color="primary" dark>
        <v-tab v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.tab">
          <component v-bind:is="item.content"></component>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import AccountSettings from "@/components/settings/AccountSettings.vue";
import ResetPassword from "@/components/settings/ResetPassword.vue";

export default {
  name: "settings",
  data() {
    return {
      tab: null,

      items: [
        { tab: "Account", content: "AccountSettings" },
        { tab: "Password", content: "ResetPassword" }
      ]
    };
  },
  components: {
    AccountSettings,
    ResetPassword
  }
};
</script>

<style lang="scss" scoped></style>
