<template>
  <section>
    <v-container fill-height>
      <v-row justify="center">
        <v-col cols="12">
          <Generator />
        </v-col>
      </v-row>
    </v-container>
    <v-container fill-height>
      <v-row justify="center">
        <v-col cols="12">
          <editor />
        </v-col>
      </v-row>
    </v-container>
  </section>
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
