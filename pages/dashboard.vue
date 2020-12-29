<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="6">
        <Generator />
      </v-col>
      <v-col cols="6">
        <editor />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Generator from "@/components/dashboard/Generator";
import Editor from "@/components/dashboard/Editor.vue";
export default {
  name: "Dashboard",
  components: {
    Generator,
    Editor
  }
};
</script>

<style lang="scss" scoped></style>
