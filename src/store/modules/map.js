import * as L from "leaflet";
import '@geoman-io/leaflet-geoman-free';  
export default {
  namespaced: true,
  state: {
    areaPolygon: {
      geometry: [],
      drawable: false,
      type: "polygon",
      active: false
    },
    screenPolygon: {
      geometry: null,
      type: "rectangle",
      active: false
    },
    circlePolygon: {
      geometry: null,
      type: "circle",
      active: false
    },
    geoJsonPolygons: [],
    images: [],
    zoom: 5,
    center: [45, 35],
    bounds: [],
    activePolygon: null
  },
  getters: {
    getActivePolygon(state) {
      return state.activePolygon;
    },
    getActivePolygonJson(state) {
      let json = null;
      if (state.areaPolygon.active && state.areaPolygon.geometry.length != 0) {
        json = L.polygon(state.areaPolygon.geometry).toGeoJSON();
      } else if (state.screenPolygon.active && state.screenPolygon.geometry != null) {
        json = L.rectangle(state.screenPolygon.geometry).toGeoJSON();
      } else if (state.circlePolygon.active && state.circlePolygon.geometry != null) {
        let circle = L.circle(state.circlePolygon.geometry.center, state.circlePolygon.geometry.radius);
        json =  L.PM.Utils.circleToPolygon(circle, 60).toGeoJSON();
      } else {
        return null;
      }
      return JSON.stringify(json);
    },
    getAreaPolygon(state) {
      return state.areaPolygon;
    },
    getAreaPolygonDrawable(state) {
      return state.areaPolygon.drawable
    },
    getFormattedCoordinates(state) {
      let res = [];
      state.areaPolygon.geometry.forEach(el => {
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
    getScreenPolygon(state) {
      return state.screenPolygon;
    },
    getCirclePolygon(state) {
      return state.circlePolygon;
    },
    getZoom(state) {
      return state.zoom;
    },
    getCenter(state) {
      return state.center;
    },
    getBounds(state) {
      return state.bounds;
    },
    getGeoJsonPolygons(state) {
      return state.geoJsonPolygons;
    },
    getImages(state) {
      return state.images;
    }
  },
  mutations: {
    setActivePolygon(state, polygon) {
      state.activePolygon = polygon;
    },
    addСoordinate(state, coord) {
      state.areaPolygon.geometry.push(coord);
    },
    deleteCoordinate(state, i) {
      state.areaPolygon.geometry.splice(i, 1);
    },
    changeCoordinate(state, data) {
      let polygon = [...state.areaPolygon.geometry];
      polygon[data.id] = data.latlng;
      state.areaPolygon.geometry = [...polygon];
    },
    setAreaPolygonDrawable(state, val) {
      state.areaPolygon.drawable = val;
    },
    setAreaPolygonActive(state, val) {
      state.areaPolygon.active = val;
    },
    setScreenPolygonActive(state, val) {
      state.screenPolygon.active = val;
    },
    setCirclePolygonActive(state, val) {
      state.circlePolygon.active = val;
    },
    clearCoordinates(state) {
      state.areaPolygon.geometry = [];
    },
    setZoom(state, value) {
      state.zoom = value;
    },
    setCenter(state, value) {
      state.center = value;
    },
    setCirclePolygon(state, data) {
      state.circlePolygon.geometry = data
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
      image.bounds = [[image.bounds[1], image.bounds[0]], [image.bounds[3], image.bounds[2]]]
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
    clearImages(state) {
      state.images = [];
    },
    clearGeoJsons(state) {
      state.geoJsonPolygons = [];
    },
    setScreenPolygon(state, polygon) {
      state.screenPolygon.geometry = polygon;
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
    setAreaPolygonDrawable(store, val) {
      store.commit('setAreaPolygonDrawable', val);
    },
    setAreaPolygonActive(store) {
      store.commit('setScreenPolygonActive', false);
      store.commit('setCirclePolygonActive', false);
      store.commit('setAreaPolygonActive', true);
    },
    setScreenPolygonActive(store) {
      store.commit('setScreenPolygonActive', true);
      store.commit('setCirclePolygonActive', false);
      store.commit('setAreaPolygonActive', false);
    },
    setCirclePolygonActive(store) {
      store.commit('setScreenPolygonActive', false);
      store.commit('setCirclePolygonActive', true);
      store.commit('setAreaPolygonActive', false);
    },
    clearCoordinates(store) {
      store.commit('clearCoordinates');
    },
    clearImages(store) {
      store.commit('clearImages');
    },
    clearGeoJsons(store) {
      store.commit('clearGeoJsons');
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
