<template>
  <div>
    <v-alert v-if="message" type="success">
      {{ message }}
    </v-alert>
    <v-alert v-else-if="error" type="error">
      {{ error.message }}
    </v-alert>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "NotificationComponent",
  computed: {
    ...mapState({
      message: state => state.msg,
      error: state => state.error
    })
  }
};
</script>

<style lang="scss" scoped></style>
