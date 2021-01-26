<template>
  <section>
     <div class="text-center">
        <h2 >
        Serveless Application Model Template Generator.
      </h2>
      <p>
        This application will Generate you a custom .JSON file with everything
        you need help you build a reliable, secure , and scaleable
        infrastructure. That Follows Best Practices
      </p>
     </div>
    <v-container fill-height>
      <v-row justify="center">
        <v-col cols="6">
          <ServerlessFunction @sendToEditor="send" />
        </v-col>
        <v-col cols="6" style="background-color:#eeeeee;">
          <p>
          <pre>{{ code }}</pre>
          </p>
        </v-col>
      </v-row>
    </v-container>

  </section>
</template>

<script>
import ServerlessFunction from "@/components/dashboard/ServerlessFunction";
import Editor from "@/components/dashboard/Editor.vue";

export default {
  name: "Home",
  data() {
    return {
      code: ""
    };
  },
  components: {
    ServerlessFunction,
    Editor
  },
  methods: {
    send(e) {
      this.code = e;
    }
  }
};
</script>

<style lang="scss" scoped></style>
