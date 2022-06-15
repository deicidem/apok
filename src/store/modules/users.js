import * as userApi from "@/api/user";

export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    isAuth(state) {
      return state.user != null;
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
      await userApi.login({email: user.email,password: user.password});
      store.dispatch('auth');
    },
    async regUser(store, user) {
      await userApi.register({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password.password,
        password_confirmation: user.password.confirm
      });
      store.dispatch('auth');
    },
    async auth(store) {
      let {data} = await userApi.auth();
      store.commit('setUser', data.user);
      return data;
    },
    async updateUser(store, data) {
      await userApi.update(data);
      return await store.dispatch('auth');
    },
    async updatePassword(store, data) {
      await userApi.updatePassword({email: store.getters.getUser.email, ...data});
      return await store.dispatch('auth');
    },
    async logout(store) {
      await userApi.logout();
      store.commit('setUser', null);
    },
    async verifyEmail(store, url) {
      let res = await userApi.verifyEmail(url);
      console.log(res);
    }
  }
}