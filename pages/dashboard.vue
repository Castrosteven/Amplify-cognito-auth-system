<template>
  <section>
    <v-container fill-height>
      <v-row justify="center">
        <v-col cols="12">
          <Generator @sendToEditor="send" />
        </v-col>
      </v-row>
    </v-container>
    <v-container fill-height>
      <v-row justify="center">
        <v-col cols="12">
          <editor :code="code" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import Generator from "@/components/dashboard/Generator";
import Editor from "@/components/dashboard/Editor.vue";
import dedent from "dedent";

export default {
  name: "Dashboard",
  data() {
    return {
      code: ""
    };
  },
  components: {
    Generator,
    Editor
  },
  methods: {
    send(e) {
      this.code = dedent(JSON.stringify(e));
    }
  }
};
</script>

<style lang="scss" scoped></style>
