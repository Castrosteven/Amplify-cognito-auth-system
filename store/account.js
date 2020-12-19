import { Auth } from "aws-amplify";
export const state = () => {};
export const mutation = {};
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
  }
};
