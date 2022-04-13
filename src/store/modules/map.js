export default {
  namespaced: true,
  state: {
    areaPolygon: [],
    polygonDrawable: false,
    circlePolygon: {"type":"Polygon","coordinates":[]},
    geoJsonPolygons: [],
    zoom: 5,
    center: [45, 35],
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
    getZoom(state) {
      return state.zoom;
    },
    getCenter(state) {
      return state.center;
    },
    getCirclePolygon(state) {
      return state.circlePolygon;
    },
    getGeoJsonPolygons(state) {
      return state.geoJsonPolygons;
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
    setZoom(state, value) {
      state.zoom = value;
    },
    setCenter(state, value) {
      state.center = value;
    },
    setCirclePolygon(state, polygon) {
      state.circlePolygon = polygon;
    },
    addGeoJsonPolygon(state, polygon) {
      state.geoJsonPolygons.push(polygon);
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
    setZoom(store, value) {
      store.commit('setZoom', value);
    },
    setCenter(store, value) {
      store.commit('setCenter', value);
    },
    setCirclePolygon(store, polygon) {
      store.commit('setCirclePolygon', polygon)
    },
    addGeoJsonPolygon(store, polygon) {
      store.commit('addGeoJsonPolygon', polygon)
    }
  }
}
