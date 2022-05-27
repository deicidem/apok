import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PortalVue from 'portal-vue'

Vue.use(PortalVue)

Vue.config.productionTip = false;
store.dispatch('plans/load').then(async () => {
  // await store.dispatch('search/load');
  await store.dispatch('tasks/load');
}).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})



