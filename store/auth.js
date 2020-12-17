import { Auth } from "aws-amplify";
export const state = () => ({
  isAuthenticated: false,
  user: {},
  error: null,
  msg: null,
  sentCode: null,
  confirmed: null
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setError(state, error) {
    state.error = error;
  },
  message(state, msg) {
    state.msg = msg;
  },
  isAuth(state, bool) {
    state.isAuthenticated = bool;
  },
  sentCode(state, bool) {
    state.sentCode = bool;
  }
};

export const actions = {
  async signIn({ commit }, { username, password }) {
    commit("setError", null);
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      commit("isAuth", true);
      commit("setUser", user);
      return user;
    } catch (error) {
      commit("setError", error);
      console.log("error signing in", error);
      return error;
    }
  },
  async signOut() {
    console.log("ran");
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  },
  async signUp({ commit }, { username, password }) {
    commit("setError", null);
    console.log(username, password);
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          // email, // optional
          // phone_number, // optional - E.164 number convention
          // // other custom attributes
        }
      });
      user != null
        ? commit("message", `Verification code sent to ${user.username}`)
        : null;
      commit("setUser", user);
      console.log(user);
      commit("sentCode", true);
    } catch (error) {
      console.log("error signing up:", error);
      commit("setError", error);
    }
  },
  async confirmSignUp({ commit }, { username, code }) {
    commit("setError", null);
    try {
      return await Auth.confirmSignUp(username, code);
    } catch (error) {
      commit("setError", error);
      console.log("error confirming sign up", error);
    }
  },
  async reSendSignUp({ commit }, { username }) {
    commit("setError", null);
    commit("setMessage", null);
    console.log(username);
    try {
      const r = await Auth.resendSignUp(username);
      commit("message", `Verification code sent`);
      return r;
    } catch (error) {
      commit("setError", error);
    }
  },
  async isAuthenticated({ commit }) {
    await Auth.currentAuthenticatedUser()
      .then(res => {
        commit("setUser", res);
        commit("isAuth", true);
      })
      .catch(() => {
        commit("isAuth", false);
      });
    // await Auth.currentUserInfo().then((res) => {
    //   commit("setUser", res);
    // });
  }
};
