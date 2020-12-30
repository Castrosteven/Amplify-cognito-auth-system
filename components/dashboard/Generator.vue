<template>
  <div class="div">
    <section>
      <h2>
        Serveless Application Model Template Generator.
      </h2>
      <p>
        This application will Generate you a custom .JSON file with everything
        you need help you build a reliable, secure , and scaleable
        infrastructure. That Follows Best Practices
      </p>
    </section>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Serveless Function Generator</v-card-title>
            <v-form @submit.prevent="makeApi">
              <v-card-text>
                <v-text-field
                  placeholder="Project Description"
                  v-model="lambdaFunction.description"
                ></v-text-field>
              </v-card-text>
              <v-select
                :items="runtimes"
                label="Select a Runtime"
                outlined
                v-model="lambdaFunction.runtime"
              ></v-select>
              <v-btn block type="submit">Make Api Template</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Api from "../../services/SAM_API.JS";
import dedent from "dedent";
export default {
  name: "Generator",
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
      lambdaFunction: {
        description: "",
        runtime: ""
      }
    };
  },
  methods: {
    makeApi() {
      const lambdaFunction = this.lambdaFunction;
      const SamApitemplate = new Api(lambdaFunction);
      const template = SamApitemplate.finalTemplate;
      this.lambdaFunction = {};
      this.$emit("sendToEditor", template);
    }
  }
};
</script>

<style lang="scss" scoped></style>
