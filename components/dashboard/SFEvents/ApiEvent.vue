<template>
  <v-form @submit.prevent="addEvents">
    <v-card>
      <v-card-title>Select The Properties of your Event</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-btn-toggle v-model="event.Method">
                <v-btn v-for="(method, index) in methods" :key="index">
                  {{ method }}
                </v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col>
              <v-text-field placeholder="/path" outlined label="Enter Path">
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: "SFEvent",
  data() {
    return {
      event: {
        Auth: "",
        Method: "",
        Path: ""
      },
      methods: ["GET", "POST", "PUT", "DELETE"]
    };
  }
};
</script>

<style lang="scss" scoped></style>
