import * as dzzApi from "@/api/dzz";
import * as L from "leaflet";
import '@geoman-io/leaflet-geoman-free';  
export default {
  namespaced: true,
  state: {
    activePolygon: null,
    timeInterval: {
      from: '',
      to: '',
      months: []
    },
    cloudiness: {
      from: 0,
      to: 100
    },
    spacecrafts: setupSpacecrafts(),
    spacecraftsSelected: [],
  },
  getters: {
    getActivePolygon(state) {
      return state.activePolygon;
    },
    getTimeInterval(state) {
      return state.timeInterval;
    },
    getSpacecrafts(state) {
      return state.spacecrafts;
    },
    getSelectedSpacecrafts(state) {
      let res = [];
      state.spacecrafts.forEach(el => {
        el.models.forEach(m => {
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
    // isSelected(state) {
    //   return ({seriesInd, scInd}) => {
    //     return state.spacecrafts[seriesInd].models[scInd].checked;
    //   }
    // }
  },
  mutations: {
    setActivePolygon(state, polygon) {
      state.activePolygon = polygon;
    },

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
    setSpacecrafts(state, newSpaceCrafts) {
      state.spacecrafts = newSpaceCrafts;
    },
    addSpacecraft(state, {
      seriesInd,
      scInd,
      pss,
      mss
    }) {
      let spacecraft = {
        ...state.spacecrafts[seriesInd].models[scInd]
      }
      spacecraft.pss = pss;
      spacecraft.mss = mss;
      state.spacecragtsSelected.push(spacecraft);
    },
    // removeSpacecraft(state, {seriesInd, scInd, pss, mss} ){},
    selectSeries(state, {
      seriesInd,
      val
    }) {
      state.spacecrafts[seriesInd].checked = val;
      state.spacecrafts[seriesInd].models.forEach(m => {
        m.checked = val;
        m.pss = val;
        m.mss = val;
      });
    },
    selectSpacecraft(state, {
      seriesInd,
      scInd,
      checked,
      pss,
      mss
    }) {
      state.spacecrafts[seriesInd].models[scInd].pss = pss;
      state.spacecrafts[seriesInd].models[scInd].mss = mss;
      state.spacecrafts[seriesInd].models[scInd].checked = checked;
    },

  },
  actions: {
    setActivePolygon(store, data) {
      store.dispatch('map/setAreaPolygonActive', false, {root : true});
      store.dispatch('map/setScreenPolygonActive', false, {root : true});
      store.dispatch('map/setCirclePolygonActive', false, {root : true});
      store.commit('setActivePolygon', data);
      if (data.type == 'polygon') {
        store.dispatch('map/setAreaPolygonActive', true, {root : true});
      } else if (data.type == 'circle') {
        store.dispatch('map/setCirclePolygonActive', true, {root : true});
      } else if (data.type == 'rectangle') {
        store.dispatch('map/setScreenPolygonActive', true, {root : true});
      }
    },
    setCloudiness(store, data) {
      store.commit('setCloudiness', data);
    },
    setTimeInterval(store, data) {
      store.commit('setTimeInterval', data);
    },
    setSpacecrafts(store, newSpaceCrafts) {
      store.commit('setSpacecrafts', newSpaceCrafts);
    },
    selectSpacecraft(store, data) {
      store.commit('selectSpacecraft', data);
    },
    selectSeries(store, data) {
      store.commit('selectSeries', data);
    },
    async load({
      dispatch
    }) {
      let params = {
        startDate: new Date("2021-04-22"),
        endDate: new Date("2022-05-30"),
        startCloudiness: 0,
        endCloudiness: 100,
        months: [3, 4, 5, 6, 7, 8],
        satelites: [1, 2, 3, 4, 5, 6]
      }
      let results = await dzzApi.all(params);

      dispatch('results/setResults',results ,  {root : true});
    },
    async search({dispatch, getters}) {
      let polygon = getters.getActivePolygon;
      let json = null;

      if (polygon.type == 'polygon') {
        json = L.polygon(polygon.geometry).toGeoJSON();
      } else if (polygon.type == 'circle') {
        let circle = L.circle(polygon.geometry.center, polygon.geometry.radius);
        json =  L.PM.Utils.circleToPolygon(circle, 60).toGeoJSON();
      } else if (polygon.type == 'rectangle') {
        json = L.rectangle(polygon.geometry).toGeoJSON();
      }
      json = JSON.stringify(json);

      let params = {
        startDate: getters.getTimeInterval.from,
        endDate: getters.getTimeInterval.to,
        startCloudiness: getters.getCloudiness[0],
        endCloudiness: getters.getCloudiness[1],
        months: getters.getTimeInterval.months,
        satelites: getters.getSelectedSpacecrafts,
        polygon: json
      }



      let results = await dzzApi.all(params);


      dispatch('results/setResults',results ,  {root : true});
    }
  }
}


function setupSpacecrafts() {
  return [{
    id: 0,
    name: "Канопус В",
    checked: false,
    models: [{
      id: 0,
      name: "Канопус В 1",
      checked: false,
      mss: false,
      pss: false
    },
    {
      id: 1,
      name: "Канопус В 2",
      checked: false,
      mss: false,
      pss: false
    },
    {
      id: 2,
      name: "Канопус В 3",
      checked: false,
      mss: false,
      pss: false
    },
    ]
  },
  {
    id: 1,
    name: "Ресурс П",
    checked: false,
    models: [{
      id: 0,
      name: "Ресурс П 1",
      checked: false,
      mss: false,
      pss: false
    },
    {
      id: 1,
      name: "Ресурс П 2",
      checked: false,
      mss: false,
      pss: false
    },
    {
      id: 2,
      name: "Ресурс П 3",
      checked: false,
      mss: false,
      pss: false
    },
    ]
  }
  ]
}

function setupResults() {
  return [
   {
    id: 1,
    name: "ETRIS.KV3.MSS.23121.1.0.2022-04-04.L0.FKL_KLG.NTSOMZ_MSK",
    round: "23121",
    route: "1",
    scName: "Канопус-В-3",
    date: "04.04.2022",
    cloudiness: 80,
    processingLevel: "1",
    geography: {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "bounds": [
          [43.539726516356005, 36.382933900683454],
          [45.66351373527003, 39.27154542776307],
        ],
        "coordinates": [
          [
            [
              36.95827938552311,
              45.66351373527003
            ],
            [
              36.382933900683454,
              43.95279779154811
            ],
            [
              38.62953946820189,
              43.539726516356005
            ],
            [
              39.27154542776307,
              45.246411064541334
            ],
            [
              36.95827938552311,
              45.66351373527003
            ]
          ]
        ]
      },
    },
    previewPath: "https://www.imgonline.com.ua/examples/bee-on-daisy.jpg"
  }]
}