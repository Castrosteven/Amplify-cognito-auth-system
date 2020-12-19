export const state = () => ({
  msg: null,
  error: null,
  user: {},
  isAuthenticated: false
});
export const mutations = {
  setMessage(state, msg) {
    state.msg = msg;
  },
  setError(state, error) {
    state.error = error;
  },
  setUser(state, user) {
    state.user = user;
  },
  setAuth(state, bool) {
    state.isAuthenticated = bool;
  }
};
