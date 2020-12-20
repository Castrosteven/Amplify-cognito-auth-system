import { Auth } from "aws-amplify";

export const state = () => ({});
export const mutations = {};
export const actions = {
  async signUp({ commit }, { username, password }) {
    try {
      const user = await Auth.signUp({
        username,
        password,
        attributes: {
          "custom:username": username
        }
      });
      commit("setUser", user, { root: true });
      if (user.userConfirmed == false)
        commit(
          "setMessage",
          `Verification code sent to ${user.codeDeliveryDetails.Destination}`,
          {
            root: true
          }
        );
      return user;
    } catch (error) {
      commit("setError", error.message, { root: true });
      return error;
    }
  },
  async confirm({ commit }, { username, code }) {
    await Auth.confirmSignUp(username, code)
      .then(res => {
        console.log(res);
        commit("setMessage", res, { root: true });
      })
      .catch(err => {
        console.log(err);
        commit("setError", err.message, { root: true });
      });
  },
  async signIn({ commit }, { username, password }) {
    try {
      const user = await Auth.signIn(username, password);
      commit("setUser", user, { root: true });
      commit("setAuth", true, { root: true });
      $nuxt.$router.push("/");
      return user;
    } catch (error) {
      commit("setError", error.message, { root: true });
      return error;
    }
  },
  async isAuthenticated({ commit }) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      commit("setUser", user, { root: true });
      commit("setAuth", true, { root: true });
      return user;
    } catch (error) {
      commit("setAuth", false, { root: true });
      console.log(error);
    }
  },
  async signOut() {
    await Auth.signOut({ global: true }).then(() => {
      $nuxt.$router.go();
      $nuxt.$router.push("/");
    });
  },
  async resendCode({ commit }, { username }) {
    await Auth.resendSignUp(username)
      .then(res => {
        commit("setMessage", `Sent Verification Code`, { root: true });
      })
      .catch(err => {
        commit("setError", err.message, { root: true });
      });
  },
  async forgotPassword({ commit }, { username }) {
    await Auth.forgotPassword(username)
      .then(() => {
        commit("setMessage", `Sent Verification Code to ${usernames}`, {
          root: true
        });
      })
      .catch(err => {
        console.log(err);
        commit("setError", err.message, { root: true });
      });
  },
  async forgotPasswordSubmit({ commit }, { username, code, password }) {
    await Auth.forgotPasswordSubmit(username, code, password)
      .then(() => {
        commit("setMessage", `Changed Password Succesfully`, { root: true });
      })
      .catch(err => {
        commit("setError", err.message, { root: true });
      });
  }
};
