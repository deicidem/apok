import * as userNotificationsApi from "@/api/userNotifications";

export default {
  namespaced: true,
  state: {
    notifications: null,
    pagination: {
      currentPage: null,
      totalPages: null,
      first: null,
      last: null,
      prev: null,
      next: null,
    },
    paginationSize: 8,
    pending: false,
    unreadCount: null,
  },
  getters: {
    getNotifications(state) {
      return state.notifications;
    },
    isPending(state) {
      return state.pending;
    },
    getPagination(state) {
      return state.pagination
    },
    getPaginationSize(state) {
      return state.paginationSize;
    },
    getNotificationsMap(state) {
      let map = {};
      for (let i = 0; i < state.notifications.length; i++) {
        let notification = state.notifications[i];
        map[notification.id] = {
          data: notification,
          index: i
        }
      }
      return map;
    },
    getUnreadCount(state) {
      return state.unreadCount;
    }
  },
  mutations: {
    setNotifications(state, payload) {
      state.notifications = payload;
    },
    deleteNotification(state, i) {
      state.notifications.splice(i, 1);
    },
    setPagination(state, payload) {
      state.pagination = payload;
    },
    setPending(state, payload) {
      state.pending = payload;
    },
    setUnreadCount(state, payload) {
      state.unreadCount = payload;
    }
  },
  actions: {
    deleteNotification(store, i) {
      store.commit('deleteNotification', i)
    },
    async fetchNotifications({
      commit,
      dispatch,
      getters
    }, page = 1) {
      commit('setPending', true);
      let res = await userNotificationsApi.all({
        page,
        size: getters.getPaginationSize
      });

      let notifications = res.data.data;
      let meta = res.data.meta;

      commit('setPagination', {
        currentPage: meta.current_page,
        first: 1,
        last: meta.last_page,
        prev: meta.current_page == 1 ? null : meta.current_page - 1,
        next: meta.current_page == meta.last_page ? null : meta.current_page + 1,
      })

      commit('setNotifications', notifications);
      commit('setPending', false);
      dispatch('fetchUnreadCount');
      return notifications;
    },
    async fetchUnreadCount({commit}) {
      let res = await userNotificationsApi.unreadCount();
      let cnt = res.data;
      commit('setUnreadCount', cnt);
    }
  }
}

//  function setNotifications() {
  

//   return [
//     {
//       id: 1,
//       text: 'Задача №1 “Выявление изменений” выполнена',
//       seen: false,
//       result: 'https://gptl.ru/',
//       theme: 'task',
//     },
//     {
//       id: 2,
//       text: 'Задача №2 “Выявление изменений” выполнена',
//       seen: true,
//       result: 'https://gptl.ru/',
//       theme: 'task',
//     },
//     {
//       id: 3,
//       text: 'Задача №3 “Выявление изменений” выполнена',
//       seen: false,
//       result: 'https://gptl.ru/',
//       theme: 'task',
//     },
//     {
//       id: 4,
//       text: 'Загрузка данных выполнена',
//       seen: false,
//       result: 'https://gptl.ru/',
//       theme: 'data',
//     },
//     // {
//     //   id: 5,
//     //   text: 'Доступ  ...  предоставлен',
//     //   seen: false,
//     //   result: 'https://gptl.ru/',
//     //   theme: 'access',
//     // },
//     {
//       id: 6,
//       text: 'Загрузка данных выполнена',
//       seen: false,
//       result: 'https://gptl.ru/',
//       theme: 'data',
//     },
//     // {
//     //   id: 7,
//     //   text: 'Доступ  ...  предоставлен',
//     //   seen: false,
//     //   result: 'https://gptl.ru/',
//     //   theme: 'access',
//     // },
//   ]
// }