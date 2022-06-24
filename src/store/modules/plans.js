import * as plansApi from '@/api/plans';
import * as tasksApi from '@/api/tasks';

export default {
  namespaced: true,
  state: {
    plans: null,
    activePlanIndex: null
  },
  getters: {
    getPlans(state) {
      return state.plans;
    },
    plansMap(state) {
      let plansMap = {};

      for (let i = 0; i < state.plans.length; i++) {
        let plan = state.plans[i];
        plan.index = i;
        plansMap[plan.id] = plan;
      }
      return plansMap;
    },
    plan: (state, getters) => (id) => {
      return getters.plansMap[id];
    },
    activePlanIndex(state) {
      return state.activePlanIndex;
    }
  },
  mutations: {
    setPlans(state, items) {
      state.plans = items;
    },
    setDataObject(state, data) {
      state.plans[data.planIndex].data[data.dataIndex].dzzIndex = data.dzzIndex;
    },
    setDataFile(state, data) {
      state.plans[data.planIndex].data[data.dataIndex].file = data.file;
    },
    changeText(state, data) {
      state.plans[data.planIndex].data[data.dataIndex].text = data.text;
    },
    setActivePlanIndex(state, i) {
      state.activePlanIndex = i;
    }
  },
  actions: {
    
    setDataObject(store, data) {
      store.commit('setDataObject', data);
    },
    selectPlan(store, data) {
      store.commit('setActivePlanIndex', data);
      store.dispatch('results/resetResultSelection', { planIndex: data }, { root: true })
    },
    setDataFile(store, data) {
      store.commit('setDataFile', data);
    },
    changeText(store, data) {
      store.commit('changeText', data);
    },

    async load({ commit }) {
      let plans = await plansApi.all();
      plans.forEach(el => {
        el.data.forEach(d => {
          d.dzzIndex = null;
          d.file = null;
          d.text = null;
        });
      });
      commit("setPlans", plans)
      return plans;
    },

    async planNewTask(store, i) {
      let dzzs = [];
      let params = [];
      let vectors = [];
      let files = [];
      let plan = store.getters.getPlans[i];
      let links = {
        dzzs: [],
        params: [],
        vectors: [],
        files: []
      };
      let planId = plan.id;

      plan.data.forEach(el => {
        if (el.file != null) {
          files.push(el.file);
          links.files.push(el.id);
        } else if (el.dzzIndex != null) {
          dzzs.push(el.dzzIndex)
          links.dzzs.push(el.id);
        } else if (el.text != null) {
          params.push(el.text)
          links.params.push(el.id);
        } else {
          vectors.push(store.rootGetters['map/getActivePolygonJson']);
          links.vectors.push(el.id);
        }
      })
      console.log({ dzzs, params, vectors, files, planId, links });
      tasksApi.add({ dzzs, params, vectors, files, planId, links }).catch((e) => {
        console.log(e);
      });
    }
  }
}

// function setPlans() {
//   return [
//     {
//       id: 1,
//       title: "Формирование температурных карт",
//       shortText: "Построение карты температур по тепловым каналам КА Landsat-8 производится с целью вычисления значений температур поверхности в градусах Цельсия, выявления тепловых аномалий.",
//       fullText: "Построение карты температур по тепловым каналам КА Landsat-8 производится с целью вычисления значений температур поверхности в градусах Цельсия, выявления тепловых аномалий. Для определения температуры поверхности производятся вычисления спектральной интенсивности излучения, поверхностной яркостной температуры, спектрального коэффициента излучения, значений температур поверхности в градусах Цельсия. Результатом обработки является векторная карта температур и отчетная форма с информацией об используемом изображении. Для более наглядного представления результата используется универсальная температурная шкала [-100; +100]. Красным отображаются области высоких температур (очаги пожаров), синим – области низких температур. ",
//       image: "img.jpg",
//       requirements: {
//         data: "мультиспектральные оптические материалы с космического аппарата (КА) Landsat 8.",
//         time: "с мая по сентябрь включительно.",
//         cloudiness: "не более 20%."
//       },
//       data: {
//         dzzIndex: "Формирование температурных карт",
//       },
//     },
//     {
//       id: 2,
//       title: "Формирование температурных карт 2",
//       shortText: "Построение карты температур по тепловым каналам КА Landsat-8 производится с целью вычисления значений температур поверхности в градусах Цельсия, выявления тепловых аномалий.",
//       fullText: "Построение карты температур по тепловым каналам КА Landsat-8 производится с целью вычисления значений температур поверхности в градусах Цельсия, выявления тепловых аномалий. Для определения температуры поверхности производятся вычисления спектральной интенсивности излучения, поверхностной яркостной температуры, спектрального коэффициента излучения, значений температур поверхности в градусах Цельсия. Результатом обработки является векторная карта температур и отчетная форма с информацией об используемом изображении. Для более наглядного представления результата используется универсальная температурная шкала [-100; +100]. Красным отображаются области высоких температур (очаги пожаров), синим – области низких температур. ",
//       image: "img.jpg",
//       requirements: [
//         {
//           title: "Данные",
//           text: "мультиспектральные оптические материалы с космического аппарата (КА) Landsat 8.",
//           icon: ""
//         },
//         {
//           title: "Сезон съемки",
//           text: "с мая по сентябрь включительно.",
//           icon: ""
//         },
//         {
//           title: "Облачность",
//           text: "не более 20%.",
//           icon: ""
//         }
//       ],
//       data: {
//         dzzIndex: "Формирование температурных карт",
//       },
//     },
//     {
//       id: 3,
//       title: "Формирование температурных карт 3",
//       shortText: "Построение карты температур по тепловым каналам КА Landsat-8 производится с целью вычисления значений температур поверхности в градусах Цельсия, выявления тепловых аномалий.",
//       fullText: "Построение карты температур по тепловым каналам КА Landsat-8 производится с целью вычисления значений температур поверхности в градусах Цельсия, выявления тепловых аномалий. Для определения температуры поверхности производятся вычисления спектральной интенсивности излучения, поверхностной яркостной температуры, спектрального коэффициента излучения, значений температур поверхности в градусах Цельсия. Результатом обработки является векторная карта температур и отчетная форма с информацией об используемом изображении. Для более наглядного представления результата используется универсальная температурная шкала [-100; +100]. Красным отображаются области высоких температур (очаги пожаров), синим – области низких температур. ",
//       image: "img.jpg",
//       requirements: [
//         {
//           title: "Данные",
//           text: "мультиспектральные оптические материалы с космического аппарата (КА) Landsat 8.",
//           icon: ""
//         },
//         {
//           title: "Сезон съемки",
//           text: "с мая по сентябрь включительно.",
//           icon: ""
//         },
//         {
//           title: "Облачность",
//           text: "не более 20%.",
//           icon: ""
//         }
//       ],
//       data: {
//         dzzIndex: "Формирование температурных карт",
//       },
//     }
//   ]
// }
