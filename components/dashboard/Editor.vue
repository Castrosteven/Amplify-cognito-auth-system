<template>
  <client-only>
    <codemirror
      class="codemirror"
      v-model="code"
      :options="cmOption"
      @cursorActivity="onCmCursorActivity"
      @ready="onCmReady"
      @focus="onCmFocus"
      @blur="onCmBlur"
    />
  </client-only>
</template>

<script>
import dedent from "dedent";
export default {
  name: "Editor",
  data() {
    return {
      cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "text/x-vue",
        theme: "base16-dark"
      },
      code: dedent`
          <template>
            <main>
              <h1>Hello World!</h1>
              <p>{{ message }}</p>
            </main>
          </template>
          <script>
            export default {
              data() {
                return {
                  message: 'Hi!'
                }
              }
            }
          ${"<\/script>"}
          <style lang="scss">
            @import './sass/variables';
            main {
              position: relative;
            }
          </style>
        `
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
};
</script>

<style lang="css" scoped></style>
