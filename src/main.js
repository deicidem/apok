import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PortalVue from 'portal-vue'
import VueCompositionAPI from '@vue/composition-api'


Vue.use(PortalVue)
Vue.use(VueCompositionAPI)



Vue.config.productionTip = false;
store.dispatch('plans/load').then(async () => {
  return store.dispatch('search/load');
}).then(()=> {
  return store.dispatch('users/auth');
}).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}).catch(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})

