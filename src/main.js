import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PortalVue from 'portal-vue'

Vue.use(PortalVue)

Vue.config.productionTip = false
// store.dispatch('users/authorizeUser', {email: 'test@example.com', password: 'password'}).then(()=> {
  store.dispatch('plans/load')
    .then(() => {
    return store.dispatch('search/load');
  }).then(() => {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  })
// store.dispatch('tasks/load')
// });




