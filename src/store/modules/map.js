export default {
  namespaced: true,
  state: {
    areaPolygon: [],
    screenPolygon: null,
    polygonDrawable: false,
    circlePolygon: null,
    geoJsonPolygons: [],
    images: [],
    zoom: 5,
    center: [45, 35],
    bounds: []
  },
  getters: {
    getPolygonArea(state) {
      return state.areaPolygon;
    },
    getScreenPolygon(state) {
      return state.screenPolygon;
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
    },
    getImages(state) {
      return state.images;
    },
    getBounds(state) {
      return state.bounds;
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
    setCirclePolygon(state, data) {
      state.circlePolygon = data
    },
    addGeoJsonPolygon(state, polygon) {
      if (polygon.json == null) {
        console.log("json in null");
        return;
      } 
      state.geoJsonPolygons.push(polygon);

    },
    addImage(state, image) {
      if (image.id == null || image.img == null || image.bounds == null) {
        console.log("image null");
        return;
      }
      state.images.push(image);
    },
    removeGeoJsonPolygon(state, id) {
      state.geoJsonPolygons.forEach((el, i) => {
        if (el.id === id) {
          state.geoJsonPolygons.splice(i, 1);
        }
      })
    },
    removeImage(state, id) {
      state.images.forEach((el, i) => {
        if (el.id === id) {
          state.images.splice(i, 1);
        }
      })
    },
    setScreenPolygon(state, bounds) {
      state.screenPolygon = bounds;
    },
    setBounds(state, bounds) {
      state.bounds = bounds;
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
    setCirclePolygon(store, data) {
      store.commit('setCirclePolygon', data)
    },
    removeCirclePolygon(store) {
      store.commit('setCirclePolygon', null)
    },
    addGeoJsonPolygon(store, polygon) {
      store.commit('addGeoJsonPolygon', polygon)
    },
    removeGeoJsonPolygon(store, id) {
      store.commit('removeGeoJsonPolygon', id)
    },
    addImage(store, image) {
      store.commit('addImage', image)
    },
    removeImage(store, id) {
      store.commit('removeImage', id)
    },
    setScreenPolygon(store, polygon) {
      store.commit('setScreenPolygon', polygon)
    },
    setBounds(store, bounds) {
      store.commit('setBounds', bounds)
    }
  }
}
