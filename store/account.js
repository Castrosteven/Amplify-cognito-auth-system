import { Auth } from "aws-amplify";

export const state = () => ({});
export const mutations = {};
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
        commit("setError", err.message, { root: true });
      });
  },
  async updateUserAttributes({ rootState, commit }, { username }) {
    const user = rootState.user;
    await Auth.updateUserAttributes(user, {
      "custom:username": username
    })
      .then(res => {
        commit("setMessage", res, { root: true });
      })
      .catch(err => {
        commit("setError", err, { root: true });
      });
  }
};
