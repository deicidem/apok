import * as L from "leaflet";
import * as filesApi from "@/api/files";
import '@geoman-io/leaflet-geoman-free';  
export default {
  namespaced: true,
  state: {
    areaPolygon: {
      geometry: [],
      drawable: false,
      active: true
    },
    circlePolygon: {
      geometry: null,
      active: false
    },
    filePolygon: {
      geometry: null,
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
    getCirclePolygon(state) {
      return state.circlePolygon;
    },
    getFilePolygon(state) {
      return state.filePolygon;
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
    setCirclePolygonActive(state, val) {
      state.circlePolygon.active = val;
    },
    setFilePolygonActive(state, val) {
      state.filePolygon.active = val;
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
    setFilePolygon(state, data) {
      state.filePolygon.geometry = data
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
      store.commit('setAreaPolygonActive',   true);
      store.commit('setCirclePolygonActive', false);
      store.commit('setFilePolygonActive',   false);
    },
    setCirclePolygonActive(store) {
      store.commit('setAreaPolygonActive',   false);
      store.commit('setCirclePolygonActive', true);
      store.commit('setFilePolygonActive',   false);
    },
    setFilePolygonActive(store) {
      store.commit('setAreaPolygonActive',   false);
      store.commit('setCirclePolygonActive', false);
      store.commit('setFilePolygonActive',   true);
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
    setBounds(store, bounds) {
      store.commit('setBounds', bounds)
    },
    async setFilePolygon(store, file) {
      let formData = new FormData();
      formData.append('file', file);
      let data = await filesApi.getPolygon(formData);
      console.log(data.data.file);
      store.commit('setFilePolygon', data.data.file)
    }
  }
}
