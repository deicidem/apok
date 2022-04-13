import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PolygonFillpattern from "vue2-leaflet-polygonfillpattern";
Vue.use(PolygonFillpattern);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
