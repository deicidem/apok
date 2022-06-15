import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PortalVue from 'portal-vue'
import VueCompositionAPI from '@vue/composition-api'


Vue.use(PortalVue)
Vue.use(VueCompositionAPI)



Vue.config.productionTip = false;

store.dispatch('users/setCookie').then(async () => {
  return store.dispatch('plans/load');
}).then(()=> {
  return store.dispatch('search/load');
}).then(()=> {
  return store.dispatch('users/auth');
}).then(()=> {
  // return store.dispatch('users/loadFiles');
}).then(() => {

  new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
      let params = new URLSearchParams(window.location.search);
      if (params.has('emailUrl')) {
        let url = new URLSearchParams(window.location.search).get('emailUrl');
        store.dispatch('users/verifyEmail', url);
      }
    }
  }).$mount('#app')

}).catch(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
      let params = new URLSearchParams(window.location.search);
      if (params.has('emailUrl')) {
        let url = new URLSearchParams(window.location.search).get('emailUrl');
        store.dispatch('users/verifyEmail', url);
      }
    }
  }).$mount('#app')
})


