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
        "custom:username": username
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
        commit("setError", err.message, { root: true });
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
  async signIn({ commit }, { username, password }) {
    await Auth.signIn(username, password)
      .then(user => {
        commit("setUser", user, { root: true });
        commit("setAuth", true, { root: true });
        $nuxt.$router.push("/");

      })
      .catch(error => {
        commit("setError", error.message, { root: true });
        if (error.code == "UserNotConfirmedException")
          commit("notConfirmed", true, { root: true });
      });
  },
  async isAuthenticated({ commit }) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      commit("setUser", user, { root: true });
      commit("setAuth", true, { root: true });
      return user
    } catch (error) {
      commit("setAuth", false, { root: true });
      console.log(error);
    }
  },
  async signOut() {
    await Auth.signOut({ global: true }).then(() => {
      $nuxt.$router.go();
      $nuxt.$router.push("/");
      window.localStorage.clear();
    });
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
  },
  async forgotPassword({ commit }, { username }) {
    console.log(username);
    await Auth.forgotPassword(username)
      .then(() => {
        commit("setMessage", `Sent Verification Code`, { root: true });
      })
      .catch(err => {
        console.log(err);
        commit("setError", err.message, { root: true });
      });
  }
};
