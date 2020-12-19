import { Auth } from "aws-amplify";

export const state = () => ({
  attributes: []
});
export const mutations = {
  setAttibutes(state, res) {
    state.attributes = res;
  }
};
export const actions = {
  async passwordReset({ commit }, { oldPassword, newPassword }) {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.changePassword(user, oldPassword, newPassword)
      .then(() => {
        commit("setMessage", "Password Changed Succesfully", {
          root: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  async updateUserAttributes({ rootState, commit }, { username }) {
    const user = rootState.user;
    await Auth.updateUserAttributes(user, { "custom:username": username })
      .then(res => {
        commit("setMessage", res, { root: true });
      })
      .catch(err => {
        commit("setError", err, { root: true });
      });
  },
  async userAttributes({ rootState, commit }) {
    const user = rootState.user;
    await Auth.userAttributes(user)
      .then(res => {
        commit("setAttibutes", res);
        // console.log(res);
      })
      .catch(err => {
        commit("setErr", err, { root: true });
      });
  }
};
