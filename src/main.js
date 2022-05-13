import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PortalVue from 'portal-vue'
Vue.use(PortalVue)

Vue.config.productionTip = false

// store.dispatch('plans/load')
// store.dispatch('tasks/load')
// store.dispatch('search/load')


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
