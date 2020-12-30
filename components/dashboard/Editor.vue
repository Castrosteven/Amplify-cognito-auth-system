<template>
  <client-only>
    <codemirror
      class="codemirror"
      :v-model="code"
      :options="cmOption"
      @cursorActivity="onCmCursorActivity"
      @ready="onCmReady"
      @focus="onCmFocus"
      @blur="onCmBlur"
    />
  </client-only>
</template>

<script>
export default {
  name: "Editor",
  props: {
    code: String
  },
  data() {
    return {
      cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "javascript",
        theme: "base16-dark"
      }
    };
  },
  methods: {
    onCmCursorActivity(codemirror) {
      console.debug("onCmCursorActivity", codemirror);
    },
    onCmReady(codemirror) {
      console.debug("onCmReady", codemirror);
    },
    onCmFocus(codemirror) {
      console.debug("onCmFocus", codemirror);
    },
    onCmBlur(codemirror) {
      console.debug("onCmBlur", codemirror);
    }
  }
  // computed: {
  //   code: {
  //     get() {
  //       return JSON.stringify({
  //         AWSTemplateFormatVersion: "2010-09-09",
  //         Transform: "AWS::Serverless-2016-10-31",
  //         Resources: {
  //           MyHelloMundoEC2: {
  //             Type: "AWS::EC2::Instance",
  //             Properties: {
  //               ImageId: "ami-0be2609ba883822ec"
  //             }
  //           }
  //         }
  //       });
  //     },
  //     set() {}
  //   }
  // }
};
</script>

<style lang="css" scoped></style>
