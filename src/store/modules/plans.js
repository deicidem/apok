import * as plansApi from '@/api/plans'

export default {
  namespaced: true,
  state: {
    plans: setPlans()
  },
  getters: {
    getPlans(state) {
      return state.plans;
    },
    plansMap(state) {
      let plansMap = {};

      for (let i = 0; i < state.plans.length; i++) {
        let plan = state.plans[i];
        plansMap[plan.id] = plan;
      }
      return plansMap;
    },
    plan: (state, getters) => (id) => {
      return getters.plansMap[id];
    }
  },
  mutations: {
    setPlans(state, items) {
      state.plans = items;
    },
    setDataObject(state, data) {
      state.plans[data.planIndex].data[data.dataIndex].ref = data.ref;
    }
  },
  actions: {
    async load({commit}) {
      let plans = await plansApi.all();
      plans.forEach(el => {
        el.data.forEach(d => {
          d.ref = null;
        });
      });
      commit("setPlans", plans)
      return plans;
    },
    setDataObject(store, data) {
      store.commit('setDataObject', data);
    }
  }
}

function setPlans() {
  return [
    {
      id: 1,
      title: "Формирование температурных карт",
      shortText: "Построение карты температур по тепловым каналам КА Landsat-8 производится с целью вычисления значений температур поверхности в градусах Цельсия, выявления тепловых аномалий.",
      fullText: "Построение карты температур по тепловым каналам КА Landsat-8 производится с целью вычисления значений температур поверхности в градусах Цельсия, выявления тепловых аномалий. Для определения температуры поверхности производятся вычисления спектральной интенсивности излучения, поверхностной яркостной температуры, спектрального коэффициента излучения, значений температур поверхности в градусах Цельсия. Результатом обработки является векторная карта температур и отчетная форма с информацией об используемом изображении. Для более наглядного представления результата используется универсальная температурная шкала [-100; +100]. Красным отображаются области высоких температур (очаги пожаров), синим – области низких температур. ",
      image: "img.jpg",
      requirements: {
        data: "мультиспектральные оптические материалы с космического аппарата (КА) Landsat 8.",
        time: "с мая по сентябрь включительно.",
        cloudiness: "не более 20%."
      }
    },
    {
      id: 2,
      title: "Формирование температурных карт 2",
      shortText: "Построение карты температур по тепловым каналам КА Landsat-8 производится с целью вычисления значений температур поверхности в градусах Цельсия, выявления тепловых аномалий.",
      fullText: "Построение карты температур по тепловым каналам КА Landsat-8 производится с целью вычисления значений температур поверхности в градусах Цельсия, выявления тепловых аномалий. Для определения температуры поверхности производятся вычисления спектральной интенсивности излучения, поверхностной яркостной температуры, спектрального коэффициента излучения, значений температур поверхности в градусах Цельсия. Результатом обработки является векторная карта температур и отчетная форма с информацией об используемом изображении. Для более наглядного представления результата используется универсальная температурная шкала [-100; +100]. Красным отображаются области высоких температур (очаги пожаров), синим – области низких температур. ",
      image: "img.jpg",
      requirements: [
        {
          title: "Данные",
          text: "мультиспектральные оптические материалы с космического аппарата (КА) Landsat 8.",
          icon: ""
        },
        {
          title: "Сезон съемки",
          text: "с мая по сентябрь включительно.",
          icon: ""
        },
        {
          title: "Облачность",
          text: "не более 20%.",
          icon: ""
        }
      ]
    },
    {
      id: 3,
      title: "Формирование температурных карт 3",
      shortText: "Построение карты температур по тепловым каналам КА Landsat-8 производится с целью вычисления значений температур поверхности в градусах Цельсия, выявления тепловых аномалий.",
      fullText: "Построение карты температур по тепловым каналам КА Landsat-8 производится с целью вычисления значений температур поверхности в градусах Цельсия, выявления тепловых аномалий. Для определения температуры поверхности производятся вычисления спектральной интенсивности излучения, поверхностной яркостной температуры, спектрального коэффициента излучения, значений температур поверхности в градусах Цельсия. Результатом обработки является векторная карта температур и отчетная форма с информацией об используемом изображении. Для более наглядного представления результата используется универсальная температурная шкала [-100; +100]. Красным отображаются области высоких температур (очаги пожаров), синим – области низких температур. ",
      image: "img.jpg",
      requirements: [
        {
          title: "Данные",
          text: "мультиспектральные оптические материалы с космического аппарата (КА) Landsat 8.",
          icon: ""
        },
        {
          title: "Сезон съемки",
          text: "с мая по сентябрь включительно.",
          icon: ""
        },
        {
          title: "Облачность",
          text: "не более 20%.",
          icon: ""
        }
      ]
    }
  ]
}
