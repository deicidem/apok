export default {
  namespaced: true,
  state: {
    areaPolygon: [],
    polygonDrawable: false
  },
  getters: {
    getPolygonArea(state) {
      return state.areaPolygon;
    },
    getFormattedCoordinates(state) {
      let res = [];
      state.areaPolygon.forEach(el => {
        let latDeg = Math.trunc(Math.abs(el.lat));
        let latMin = Math.trunc(Math.abs(el.lat) % 1 * 60);
        let latSec = Math.round((Math.abs(el.lat) % 1 * 60) % 1 * 60);
        let latSide = el.lat > 0 ? "N" : "S";
        let lngDeg = Math.trunc(Math.abs(el.lng));
        let lngMin = Math.trunc(Math.abs(el.lng) % 1 * 60);
        let lngSec = Math.round((Math.abs(el.lng) % 1 * 60) % 1 * 60);
        let lngSide = el.lng > 0 ? "E" : "W";
        res.push({
          lat: `${latDeg}°${latMin}'${latSec}" ${latSide}`,
          lng: `${lngDeg}°${lngMin}'${lngSec}" ${lngSide}`,
        })
      });
      return res;
    },
    getDrawable(state) {
      return state.polygonDrawable;
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
    }
  }
}
