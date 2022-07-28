import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PortalVue from 'portal-vue'
import Vuelidate from 'vuelidate'
import {
  addErrorHandler
} from "@/api/http";
Vue.use(Vuelidate)
Vue.use(PortalVue)
Vue.config.productionTip = false;

addErrorHandler(setErrorHandler)

store.dispatch('users/setCookie').then(async () => {
  return store.dispatch('plans/load');
}).then(() => {
  return store.dispatch('search/load');
}).then(() => {
  return store.dispatch('search/loadSatelites');
}).then(() => {
  return store.dispatch('groupTypes/fetchGroupTypes');
}).then(() => {
  return store.dispatch('users/auth');
}).then(() => {
  return store.dispatch('notifications/fetchUnreadCount');
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


function setErrorHandler(error) {
  // if(error.response.status === 401 && error.config.silence401 !== true){
  //   //await 
  //   store.dispatch('user/cleanUser');
  //   router.push({ name: 'login' }, function(){
  //     // document.location.reload(); // опционально, либо чистим склад
  //   });
  // }

  // if(!('errorSuppression' in error.config)){
  //   return Promise.reject(error);
  // }

  // let es = error.config.errorSuppression;

  // if('exclude' in es && es.exclude.includes(error.response.status)){
  //   return Promise.reject(error);
  // }

  // if('text' in es){
  //   let alert = { text: `Ошибка ответа от сервера ${es.text}` };

  //   if('critical' in es){
  //     alert.text += ' Рекомендуем перезагрузить страницу!';
  //   }
  //   else{
  //     alert.timeout = 3000;
  //   }

  //   store.dispatch('alerts/add', alert);
  // }
  // return { data: { ok: false } };
  let config = error.config;
  let alert = {};
  console.log(error.config);
  if ('errorTitle' in error.config) {
    alert.title = config.errorTitle;
  } else {
    alert.title = "Ошибка";
  }
  if (error.response.status == 500) {
    alert.message = "На сервере что-то пошло не так";
  } else {
    alert.message = error.response.data.message;
  }
  store.dispatch('alerts/addAlert', alert);
  return new Promise.reject(error);
}