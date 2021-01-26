<template>
  <v-card flat>
    <v-card-title>Edit Account Settings</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="update" v-model="valid" ref="form">
        <v-text-field
          filled
          label="Username"
          :value="username"
          :placeholder="username"
          :rules="rules.usernameRules"
        ></v-text-field>

        <v-btn type="submit" :disabled="!valid" color="indigo" dark
          >Edit
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AccountSettings",
  data() {
    return {
      valid: true,
      rules: {
        usernameRules: [v => !!v || "Username is required"]
      }
    };
  },
  computed: {
    ...mapState({
      username: state => state.user.attributes["custom:username"]
    })
    // username: {
    //   get() {
    //     return this.user.attributes["custom:username"];
    //   },
    //   set(value) {
    //     if (this.$refs.form.validate())
    //       this.$store.dispatch("account/updateUserAttributes", {
    //         username: value
    //       });
    //   }
    // }
  },
  methods: {
    update(e) {
      if (this.$refs.form.validate())
        this.$store.dispatch("account/updateUserAttributes", {
          username: e.target[0].value
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
