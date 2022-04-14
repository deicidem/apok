export default {
  namespaced: true,
  state: {
    areaPolygon: [],
    polygonDrawable: false,
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
    spacecragtsSelected: [],
    results: setupResults()
  },
  getters: {
    getPolygonArea(state) {
      return state.areaPolygon;
    },
    getFormattedCoordinates(state) {
      let res = [];
      state.areaPolygon.forEach(el => {
        res.push({
          lat: `${Math.trunc(Math.abs(el.lat))}
               °${Math.trunc(Math.abs(el.lat) % 1 * 60)}
               '${Math.round((Math.abs(el.lat) % 1 * 60) % 1 * 60)}" 
                ${el.lat > 0 ? "N" : "S"}`,
          lng: `${Math.trunc(Math.abs(el.lng))}°
                ${Math.trunc(Math.abs(el.lng) % 1 * 60)}'
                ${Math.round((Math.abs(el.lng) % 1 * 60) % 1 * 60)}" 
                ${el.lng > 0 ? "E" : "W"}`,
        })
      });
      return res;
    },
    getDrawable(state) {
      return state.polygonDrawable;
    },
    getTimeInterval(state) {
      return state.timeInterval;
    },
    getSpacecrafts(state) {
      return state.spacecrafts;
    },
    getCloudiness(state) {
      return [state.cloudiness.from, state.cloudiness.to];
    },
    // isSelected(state) {
    //   return ({seriesInd, scInd}) => {
    //     return state.spacecrafts[seriesInd].models[scInd].checked;
    //   }
    // }
    getResults(state) {
      return state.results;
    }
  },
  mutations: {
    addСoordinate(state, coord) {
      state.areaPolygon.push(coord);
    },
    deleteCoordinate(state, i) {
      state.areaPolygon.splice(i, 1);
    },
    changeCoordinate(state, data) {
      let polygon = [...state.areaPolygon];
      polygon[data.id] = data.latlng;
      state.areaPolygon = [...polygon];
    },
    setPolygonDrawable(state, val) {
      state.polygonDrawable = val;
    },
    clearCoordinates(state) {
      state.areaPolygon = [];
    },
    setCloudiness(state, {
      from,
      to
    }) {
      state.cloudiness.from = from;
      state.cloudiness.to = to;
    },
    setTimeInterval(state, {
      from,
      to,
      months
    }) {
      console.log(from, to, months);

      state.timeInterval.from = from;
      state.timeInterval.to = to;
      state.timeInterval.months = months;
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
    addCoordinate(store, i) {
      store.commit('addСoordinate', i)
    },
    changeCoordinate(store, data) {
      store.commit('changeCoordinate', {
        ...data
      })
    },
    deleteCoordinate(store, i) {
      store.commit('deleteCoordinate', i);
    },
    setPolygonDrawable(store, val) {
      store.commit('setPolygonDrawable', val);
    },
    clearCoordinates(store) {
      store.commit('clearCoordinates');
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
  return [{
    id: 0,
    info: {
      idBig: "ETRIS.KV3.MSS.23121.1.0.2022-04-04.L0.FKL_KLG.NTSOMZ_MSK",
      round: "23121",
      route: "0",
      scName: "Канопус-В-3",
      date: "04.04.2022",
      cloudiness: "80%",
    },
    GeoJSON: {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
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
    bounds: [
      [43.539726516356005, 36.382933900683454],
      [45.66351373527003, 39.27154542776307],
    ],
    img: "зона интереса.png"
  }, {
    id: 1,
    info: {
      idBig: "ETRIS.KV3.MSS.23121.1.0.2022-04-04.L0.FKL_KLG.NTSOMZ_MSK",
      round: "23121",
      route: "1",
      scName: "Канопус-В-3",
      date: "04.04.2022",
      cloudiness: "80%",
    },
    GeoJSON: {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
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
    bounds: [
      [43.539726516356005, 36.382933900683454],
      [45.66351373527003, 39.27154542776307],
    ],
    img: "зона интереса.png"
  },{
    id: 2,
    info: {
      idBig: "ETRIS.KV3.MSS.23121.1.0.2022-04-04.L0.FKL_KLG.NTSOMZ_MSK",
      round: "23121",
      route: "2",
      scName: "Канопус-В-3",
      date: "04.04.2022",
      cloudiness: "80%",
    },
    GeoJSON: {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
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
    bounds: [
      [43.539726516356005, 36.382933900683454],
      [45.66351373527003, 39.27154542776307],
    ],
    img: "зона интереса.png"
  },{
    id: 3,
    info: {
      idBig: "ETRIS.KV3.MSS.23121.1.0.2022-04-04.L0.FKL_KLG.NTSOMZ_MSK",
      round: "23121",
      route: "3",
      scName: "Канопус-В-3",
      date: "04.04.2022",
      cloudiness: "80%",
    },
    GeoJSON: {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
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
    bounds: [
      [43.539726516356005, 36.382933900683454],
      [45.66351373527003, 39.27154542776307],
    ],
    img: "зона интереса.png"
  }]
}