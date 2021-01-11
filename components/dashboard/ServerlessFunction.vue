<template>
  <div class="div">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Serveless Function Generator</v-card-title>
            <v-form @submit.prevent="makeServelessFunctionResource">
              <v-card-text>
                <v-text-field
                  placeholder="Project Description"
                  v-model="lambdaFunction.description"
                  outlined
                ></v-text-field>
                <v-select
                  :items="runtimes"
                  label="Select a Runtime"
                  outlined
                  v-model="lambdaFunction.runtime"
                ></v-select>
                <p>What Event should trigger this function?</p>
                <v-container>
                  <v-row justify="center" align-content="center">
                    <v-col v-for="source in sources" :key="source.name">
                      <v-btn
                        @click="eventChooser(source.name)"
                        icon
                        v-model="trigger.event"
                      >
                        <v-img
                          contain
                          :src="require(`~/assets/awsIcons/${source.icon}.png`)"
                          max-height="40"
                          max-width="40"
                        ></v-img>
                      </v-btn>
                      <p>{{ source.name }}</p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-btn block type="submit">Make Servless Function Resource</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ServerlessFunction from "../../services/ServerlessFunction";
import dedent from "dedent";
export default {
  name: "ServerlessFunction",
  data() {
    return {
      // https://github.com/boto/botocore/blob/develop/botocore/data/lambda/2015-03-31/service-2.json
      runtimes: [
        "nodejs",
        "nodejs4.3",
        "nodejs6.10",
        "nodejs8.10",
        "nodejs10.x",
        "nodejs12.x",
        "java8",
        "java8.al2",
        "java11",
        "python2.7",
        "python3.6",
        "python3.7",
        "python3.8",
        "dotnetcore1.0",
        "dotnetcore2.0",
        "dotnetcore2.1",
        "dotnetcore3.1",
        "nodejs4.3-edge",
        "go1.x",
        "ruby2.5",
        "ruby2.7",
        "provided",
        "provided.al2"
      ],
      sources: [
        {
          name: "Api",
          icon: "Arch_Amazon-API-Gateway_64@5x"
        },
        {
          name: "S3",
          icon: "Arch_Amazon-S3-Standard_64"
        }
      ],
      trigger: {
        selected: false,
        event: ""
      },
      lambdaFunction: {
        description: "",
        runtime: "",
        type: ""
      }
    };
  },
  methods: {
    makeServelessFunctionResource() {
      const lambdaFunction = this.lambdaFunction;
      const SamApitemplate = new ServerlessFunction(lambdaFunction);
      const template = SamApitemplate.finalTemplate;
      this.lambdaFunction = {};
      this.$emit("sendToEditor", template);
    },
    eventChooser(e) {
      console.log(e);
      this.trigger.selected = true;
      this.lambdaFunction.type = e;
    }
  }
};
</script>

<style lang="scss" scoped></style>
