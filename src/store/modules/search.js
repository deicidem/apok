import * as dzzApi from "@/api/dzz";
import * as satelitesApi from "@/api/satelites";
export default {
  namespaced: true,
  state: {
    timeInterval: {
      from: null,
      to: null,
      months: [
        {
          cnt: 1,
          name: "январь",
          active: true,
        },
        {
          cnt: 2,
          name: "февраль",
          active: true,
        },
        {
          cnt: 3,
          name: "март",
          active: true,
        },
        {
          cnt: 4,
          name: "апрель",
          active: true,
        },
        {
          cnt: 5,
          name: "май",
          active: true,
        },
        {
          cnt: 6,
          name: "июнь",
          active: true,
        },
        {
          cnt: 7,
          name: "июль",
          active: true,
        },
        {
          cnt: 8,
          name: "август",
          active: true,
        },
        {
          cnt: 9,
          name: "сентябрь",
          active: true,
        },
        {
          cnt: 10,
          name: "октябрь",
          active: true,
        },
        {
          cnt: 11,
          name: "ноябрь",
          active: true,
        },
        {
          cnt: 12,
          name: "декабрь",
          active: true,
        },
      ],
    },
    cloudiness: {
      from: 0,
      to: 20
    },
    satelites: null,
    satelitesSelected: [],
    searchStatus: null
  },
  getters: {
    getTimeInterval(state) {
      return state.timeInterval;
    },
    getSatelites(state) {
      return state.satelites;
    },
    getSelectedSatelites(state) {
      let res = [];
      state.satelites.forEach(el => {
        el.satelites.forEach(m => {
          if (m.checked) {
            res.push(m.id)
          }
        });
      });
      return res;
    },
    getCloudiness(state) {
      return [state.cloudiness.from, state.cloudiness.to];
    },
    getSearchStatus(state) {
      return state.searchStatus;
    }
    // isSelected(state) {
    //   return ({seriesInd, scInd}) => {
    //     return state.satelites[seriesInd].models[scInd].checked;
    //   }
    // }
  },
  mutations: {
    setCloudiness(state, {
      from,
      to
    }) {
      state.cloudiness.from = from;
      state.cloudiness.to = to;
    },
    setTimeInterval(state, data) {
      state.timeInterval = data;
    },
    setSearchStatus(state, data) {
      state.searchStatus = data;
    },
    setSatelites(state, newsatelites) {
      state.satelites = newsatelites;
    },
    selectSeries(state, {
      seriesInd,
      val
    }) {
      state.satelites[seriesInd].checked = val;
      state.satelites[seriesInd].satelites.forEach(m => {
        m.checked = val;
        m.pss = val;
        m.mss = val;
      });
    },
    unSelectSatelites(state) {
      state.satelites.forEach(series => {
        series.checked = false;
        series.satelites.forEach(s => {
          s.checked = false;
          s.pss = false;
          s.mss = false;
        })
      })
    },
    unSelectMonths(state) {
      state.timeInterval.months.forEach(el => {
        el.active = false;
      });
    },
    selectSatelite(state, {
      seriesInd,
      scInd,
      checked,
      pss,
      mss
    }) {
      state.satelites[seriesInd].satelites[scInd].pss = pss;
      state.satelites[seriesInd].satelites[scInd].mss = mss;
      state.satelites[seriesInd].satelites[scInd].checked = checked;
    },

  },
  actions: {
    clearData(store) {
      store.commit('setCloudiness', {
        from: 0,
        to: 20
      });
      store.commit('setSearchStatus', null);
      store.commit('unSelectSatelites');
      store.commit('setTimeInterval', {from: null, to: null, months: store.getters.getTimeInterval.months});
      store.commit('unSelectMonths');
      store.dispatch('map/clearCoordinates', {}, {root: true});
      store.dispatch('map/removeCirclePolygon', {}, {root: true});
      store.dispatch('map/removeFilePolygon', {}, {root: true});
    },
    setCloudiness(store, data) {
      store.commit('setCloudiness', data);
    },
    setSearchStatus(store, data) {
      store.commit('setSearchStatus', data);
    },
    setTimeInterval(store, data) {
      store.commit('setTimeInterval', data);
    },
    setSatelites(store, newsatelites) {
      store.commit('setSatelites', newsatelites);
    },
    selectSatelite(store, data) {
      store.commit('selectSatelite', data);
    },
    selectSeries(store, data) {
      store.commit('selectSeries', data);
    },
    async load({
      dispatch
    }) {
      let params = {
        startDate: new Date("2010-04-22"),
        endDate: new Date("2022-08-30"),
        startCloudiness: 0,
        endCloudiness: 100,
        months: [{
          cnt: 1
        }, {
          cnt: 2
        }, {
          cnt: 3
        }, {
          cnt: 4
        }, {
          cnt: 5
        }, {
          cnt: 6
        }, {
          cnt: 7
        }, {
          cnt: 8
        }, {
          cnt: 9
        }, {
          cnt: 10
        }, {
          cnt: 11
        }, {
          cnt: 12
        }],
        satelites: [1, 2, 3, 4, 5, 6],
        polygon: '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[163.300781,85.051129],[-4.921875,85.051129],[-4.921875,-13.410994],[163.300781,-13.410994],[163.300781,85.051129]]]}}'
      }
      let results = await dzzApi.all(params);

      dispatch('results/setResults', results, {
        root: true
      });
    },
    async search({
      dispatch,
      getters,
      rootGetters
    }) {
      let polygon = rootGetters['map/getActivePolygonJson'];
      let timeInterval = getters.getTimeInterval;
      let cloudiness = getters.getCloudiness;
      let satelites = getters.getSelectedSatelites;
      if (
        timeInterval.from == null ||
        timeInterval.to == null ||
        timeInterval.months.length == 0 ||
        polygon == null ||
        cloudiness[0] == null ||
        cloudiness[1] == null ||
        satelites.length == 0
      ) {
        dispatch('setSearchStatus', "ERROR");
        return;
      }

      let params = {
        startDate: timeInterval.from,
        endDate: timeInterval.to,
        startCloudiness: cloudiness[0],
        endCloudiness: cloudiness[1],
        months: timeInterval.months,
        satelites,
        polygon
      }

      let results = await dzzApi.all(params);
      dispatch('results/setResults', results, {
        root: true
      });
    },
    async loadSatelites({
      dispatch
    }) {
      let res = await satelitesApi.all();
      let satelites = res.data.satelites;
      satelites.forEach(el => {
        el.checked = false;
        el.satelites.forEach(s => {
          s.checked = false;
        })
      })

      dispatch('setSatelites', satelites);
    }
  }
}