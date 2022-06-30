import * as dzzApi from "@/api/dzz";
import * as satelitesApi from "@/api/satelites";
export default {
  namespaced: true,
  state: {
    timeInterval: {
      from: null,
      to: null,
      months: []
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


// function setupsatelites() {
//   return [{
//     id: 1,
//     name: "Канопус В",
//     checked: false,
//     models: [{
//       id: 1,
//       name: "Канопус В 1",
//       checked: false,
//       mss: false,
//       pss: false
//     },
//     {
//       id: 2,
//       name: "Канопус В 2",
//       checked: false,
//       mss: false,
//       pss: false
//     },
//     {
//       id: 3,
//       name: "Канопус В 3",
//       checked: false,
//       mss: false,
//       pss: false
//     },
//     {
//       id: 4,
//       name: "Канопус В 4",
//       checked: false,
//       mss: false,
//       pss: false
//     },
//     {
//       id: 5,
//       name: "Канопус В 5",
//       checked: false,
//       mss: false,
//       pss: false
//     },
//     {
//       id: 6,
//       name: "Канопус В 6",
//       checked: false,
//       mss: false,
//       pss: false
//     },
//     ]
//   },
//   {
//     id: 2,
//     name: "Ресурс П",
//     checked: false,
//     models: [{
//       id: 0,
//       name: "Ресурс П 1",
//       checked: false,
//       mss: false,
//       pss: false
//     },
//     {
//       id: 1,
//       name: "Ресурс П 2",
//       checked: false,
//       mss: false,
//       pss: false
//     },
//     {
//       id: 2,
//       name: "Ресурс П 3",
//       checked: false,
//       mss: false,
//       pss: false
//     },
//     ]
//   }
//   ]
// }

// function setupResults() {
//   return [
//    {
//     id: 1,
//     name: "ETRIS.KV3.MSS.23121.1.0.2022-04-04.L0.FKL_KLG.NTSOMZ_MSK",
//     round: "23121",
//     route: "1",
//     scName: "Канопус-В-3",
//     date: "04.04.2022",
//     cloudiness: 80,
//     processingLevel: "1",
//     geography: {
//       "type": "Feature",
//       "properties": {},
//       "geometry": {
//         "type": "Polygon",
//         "bounds": [
//           [43.539726516356005, 36.382933900683454],
//           [45.66351373527003, 39.27154542776307],
//         ],
//         "coordinates": [
//           [
//             [
//               36.95827938552311,
//               45.66351373527003
//             ],
//             [
//               36.382933900683454,
//               43.95279779154811
//             ],
//             [
//               38.62953946820189,
//               43.539726516356005
//             ],
//             [
//               39.27154542776307,
//               45.246411064541334
//             ],
//             [
//               36.95827938552311,
//               45.66351373527003
//             ]
//           ]
//         ]
//       },
//     },
//     previewPath: "https://www.imgonline.com.ua/examples/bee-on-daisy.jpg"
//   }]
// }