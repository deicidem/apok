import * as authApi from "@/api/auth";

export default {
  namespaced: true,
  state: {
    users: [{
      login: "login",
      password: "password"
    }]
  },
  getters: {
    getUsers(state) {
      return state.users;
    }
  },
  mutations: {
    addUser(state, user) {
      state.users.push(user);
    }
  },
  actions: {
    addUser(store, user) {
      store.commit('addUser', user)
    },
    async authorizeUser({state}, user) {
      let foundUser = false;
      for (let i = 0; i < state.users.length; i++) {
        const u = state.users[i];
        if (u.login == user.login && u.password == user.password) {
          foundUser = true;
        }
      }
      if (foundUser) {
        console.log("Вы авторизованы");
      } else {
        console.log("Вы не авторизованы");
      }
      let res = await authApi.login(user.email, user.password);
      return res;
    },

  }
}