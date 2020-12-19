import { Auth } from "aws-amplify";

export const state = () => ({});
export const mutations = {};
export const actions = {
  async signUp({ commit }, { username, password }) {
    await Auth.signUp({
      username,
      password,
      attributes: {
        // email, // optional
        // phone_number, // optional - E.164 number convention
        // // other custom attributes
      }
    })
      .then(user => {
        commit("setUser", user, { root: true });
        if (user.userConfirmed == false)
          commit(
            "setMessage",
            `Verification code sent to ${user.codeDeliveryDetails.Destination}`,
            {
              root: true
            }
          );
      })
      .catch(err => {
        commit("setError", err, { root: true });
      });
  },
  async confirm({ rootState, commit }, { code }) {
    const username = rootState.user.user.username;
    await Auth.confirmSignUp(username, code)
      .then(res => {
        commit("setMessage", res, { root: true });
      })
      .catch(err => {
        commit("setError", err, { root: true });
      });
  },
  async signIn({ redirect, commit }, { username, password }) {
    await Auth.signIn(username, password)
      .then(res => {
        commit("setUser", res, { root: true });
        commit("setAuth", true, { root: true });
        $nuxt.$router.push("/");
      })
      .catch(err => {
        commit("setError", err, { root: true });
      });
  },
  async isAuthenticated({ commit }) {
    await Auth.currentAuthenticatedUser()
      .then(res => {
        commit("setUser", res, { root: true });
        commit("setAuth", true, { root: true });
      })
      .catch(err => {
        console.log(err);
      });
  },
  async signOut() {
    await Auth.signOut();
  },
  async resendCode({ rootState, commit }) {
    const username = rootState.user.user.username;
    await Auth.resendSignUp(username)
      .then(res => {
        commit("setMessage", res, { root: true });
      })
      .catch(err => {
        commit("setError", err, { root: true });
      });
  }
};
