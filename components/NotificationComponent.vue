<template>
  <div>
    <v-alert v-if="msg !== null" type="success">
      {{ msg }}
    </v-alert>
    <v-alert v-else-if="error !== null" type="error">
      {{ error }}
    </v-alert>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "NotificationComponent",
  computed: mapState(["msg", "error"]),
  watch: {
    msg(old, neww) {
      if (old != "")
        setTimeout(() => {
          this.$store.commit("setMessage", null);
        }, 5000);
    },
    error(old, neww) {
      if (old != "")
        setTimeout(() => {
          this.$store.commit("setError", null);
        }, 5000);
    }
  }
};
</script>

<style lang="scss" scoped></style>
