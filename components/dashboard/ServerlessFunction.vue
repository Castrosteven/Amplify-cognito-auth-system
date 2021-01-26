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
                  label="Function Name "
                  placeholder="Function Description"
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
                    <!-- Event Type Chooser -->
                    <v-col
                      cols="4"
                      v-for="source in EventSources"
                      :key="source.name"
                      align-self="center"
                    >
                      <v-img
                        contain
                        :src="require(`~/assets/awsIcons/${source.icon}.png`)"
                        max-height="40"
                        max-width="40"
                        @click="eventChooser(source.name)"
                      >
                      </v-img>
                      <span>{{ source.name }}</span>
                    </v-col>
                    <!-- Sourece Properties -->
                    <v-col cols="12">
                      <div v-if="trigger.selected">
                        <p>You Choose {{ lambdaFunction.type }}</p>
                      </div>
                    </v-col>
                    <v-col cols="12" v-if="lambdaFunction.type == 'Api'">
                      <ApiEvent />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-btn block type="submit" color="indigo" dark
                >Make Servless Function Resource</v-btn
              >
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ServerlessFunction from "../../services/ServerlessFunction";
import ApiEvent from "./SFEvents/ApiEvent";
import dedent from "dedent";

export default {
  name: "ServerlessFunction",
  components: { ApiEvent },
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
      EventSources: [
        { name: "AlexaSkill", icon: "Res_IoT_Alexa_Skill_48_Light" },
        {
          name: "CloudWatchEvent",
          icon: "Res_Amazon-Cloudwatch_Event-Based_48_Light"
        },
        { name: "CloudWatchLogs", icon: "Res_Cloudwatch_Logs_48_Light" },
        { name: "Cognito", icon: "Arch_Amazon-Cognito_64" },
        { name: "DynamoDB", icon: "Arch_Amazon-DynamoDB_64" },
        { name: "EventBridgeRule", icon: "Arch_Amazon-EventBridge_64" },
        { name: "HttpApi", icon: "Arch_Amazon-API-Gateway_64" },
        {
          name: "Api",
          icon: "Arch_Amazon-API-Gateway_64"
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
      this.$emit("sendToEditor", template);
    },
    eventChooser(e) {
      this.trigger.selected = true;
      this.lambdaFunction.type = e;
    }
  }
};
</script>

<style lang="scss" scoped></style>
