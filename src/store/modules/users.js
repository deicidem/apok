import * as userApi from "@/api/user";

export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    getUsers(state) {
      return state.users;
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    setUser(store, user) {
      store.commit('setUser', user)
    },
    async authorizeUser(store, user) {
      let res = await userApi.login({email: user.email,password: user.password});
      store.commit('setUser', res.data.user);
      return res;
    },
    async regUser(store, user) {
      let res = await userApi.register({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password.password,
        password_confirmation: user.password.confirm
      });
      console.log(res);
      store.commit('setUser', res.data.user);
      return res;
    },
  }
}