<template>
  <v-card>
    <v-card-title><v-text-field v-model="name"></v-text-field></v-card-title>
    <v-card-text>
      <v-text-field v-model="description"></v-text-field>
      <v-btn @click="submit">Send</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { Todo } from "@/src/models/index.js";
import { DataStore } from "aws-amplify";
export default {
  name: "Todo",
  data() {
    return {
      name: "",
      description: ""
    };
  },
  methods: {
    async submit() {
      await DataStore.save(
        new Todo({
          name: this.name,
          description: this.description
        })
      )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(er);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
