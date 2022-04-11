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
    spacecrafts: []
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
      return state.cloudiness;
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
    setCloudiness(state, from, to) {
      state.cloudiness.from = from;
      state.cloudiness.to = to;
    },
    setTimeInterval(state, {from, to, months}) {
      console.log(from, to, months);

      state.timeInterval.from = from;
      state.timeInterval.to = to;
      state.timeInterval.months = months;
    },
    setSpacecrafts(state, newSpaceCrafts) {
      state.spacecrafts = newSpaceCrafts;
    }
  },
  actions: {
    addCoordinate(store, i) {
      store.commit('addСoordinate', i)
    },
    changeCoordinate(store, data) {
      store.commit('changeCoordinate', {...data})
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
    setCloudiness(store, {from, to}) {
      store.commit('setCloudiness', from, to);
    },
    setTimeInterval(store, {from, to, months}) {
      store.commit('setTimeInterval', {from, to, months});
    },
    setSpacecrafts(store, newSpaceCrafts) {
      store.commit('setSpacecrafts', newSpaceCrafts);
    }
  }
}
