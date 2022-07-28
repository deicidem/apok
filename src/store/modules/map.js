import * as L from "leaflet";
import * as filesApi from "@/api/files";
import '@geoman-io/leaflet-geoman-free';
export default {
  namespaced: true,
  state: {
    areaPolygon: {
      geometry: [],
      drawable: false,
      active: true,
    },
    circlePolygon: {
      geometry: null,
      drawable: false,
      active: false,
      center: null
    },
    filePolygon: {
      geometry: null,
      active: false
    },
    geoJsonPolygons: [],
    images: [],
    viewImages: [],
    zoom: 5,
    center: [45, 35],
    bounds: [],
    activePolygon: null,
    needUpdateBounds: false
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
        json = L.PM.Utils.circleToPolygon(circle, 60).toGeoJSON();
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
    getCirclePolygonDrawable(state) {
      return state.circlePolygon.drawable
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
    },
    getViewImages(state) {
      return state.viewImages;
    },
    getNeedUpdateBounds(state) {
      return state.needUpdateBounds;
    }
    
  },
    mutations: {
      setActivePolygon(state, {
        polygon
      }) {
        state.activePolygon = polygon;
      },
      addСoordinate(state, {
        coordinate
      }) {
        state.areaPolygon.geometry.push(coordinate);
      },
      deleteCoordinate(state, {
        index
      }) {
        state.areaPolygon.geometry.splice(index, 1);
      },
      changeCoordinate(state, {
        id,
        latlng
      }) {
        let polygon = [...state.areaPolygon.geometry];
        polygon[id] = latlng;
        state.areaPolygon.geometry = [...polygon];
      },
      setAreaPolygonDrawable(state, {
        value
      }) {
        state.areaPolygon.drawable = value;
      },
      setCirclePolygonDrawable(state, {
        value
      }) {
        state.circlePolygon.drawable = value;
      },
      setAreaPolygonActive(state, {
        value
      }) {
        state.areaPolygon.active = value;
      },
      setCirclePolygonActive(state, {
        value
      }) {
        state.circlePolygon.active = value;
      },
      setFilePolygonActive(state, {
        value
      }) {
        state.filePolygon.active = value;
      },
      clearCoordinates(state) {
        state.areaPolygon.geometry = [];
      },
      setZoom(state, {
        value
      }) {
        state.zoom = value;
      },
      setCenter(state, {
        coordinate
      }) {
        state.center = coordinate;
      },
      setCirclePolygon(state, data) {
        state.circlePolygon.geometry = data
      },
      setCircleCenter(state, {
        coordinate
      }) {
        if (state.circlePolygon.geometry == null) {
          state.circlePolygon.geometry = {
            center: coordinate,
            radius: null
          };
        }
        state.circlePolygon.geometry.center = coordinate;
      },
      setFilePolygon(state, file) {
        state.filePolygon.geometry = file
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
      addViewImage(state, image) {
        if (image.id == null || image.img == null || image.bounds == null) {
          console.log("image null");
          return;
        }

        state.viewImages.push(image);
      },
      removeGeoJsonPolygon(state, {
        id
      }) {
        state.geoJsonPolygons.forEach((el, i) => {
          if (el.id === id) {
            state.geoJsonPolygons.splice(i, 1);
          }
        })
      },
      removeImage(state, {
        id
      }) {
        state.images.forEach((el, i) => {
          if (el.id === id) {
            state.images.splice(i, 1);
          }
        })
      },
      removeViewImage(state, {
        id
      }) {
        state.viewImages.forEach((el, i) => {
          if (el.id === id) {
            state.viewImages.splice(i, 1);
          }
        })
      },
      clearImages(state) {
        state.images = [];
      },
      clearViewImages(state) {
        state.images = [];
      },
      clearGeoJsons(state) {
        state.geoJsonPolygons = [];
      },
      setScreenPolygon(state, {
        polygon
      }) {
        state.screenPolygon.geometry = polygon;
      },
      setBounds(state, {
        bounds
      }) {
        state.bounds = bounds;
      },
      setNeedUpdateBounds(state, {
        value
      }) {
        state.needUpdateBounds = value;
      }
    },
    actions: {
      addCoordinate({
        commit
      }, payload) {
        commit('addСoordinate', payload)
      },
      changeCoordinate({
        commit
      }, payload) {
        commit('changeCoordinate', payload)
      },
      deleteCoordinate({
        commit
      }, payload) {
        commit('deleteCoordinate', payload);
      },
      setAreaPolygonDrawable({
        commit
      }, payload) {
        commit('setAreaPolygonDrawable', payload);
      },
      setAreaPolygonActive({
        commit
      }) {
        commit('setAreaPolygonActive', {
          value: true
        });
        commit('setCirclePolygonActive', {
          value: false
        });
        commit('setFilePolygonActive', {
          value: false
        });
      },
      setCirclePolygonActive({
        commit
      }) {
        commit('setAreaPolygonActive', {
          value: false
        });
        commit('setCirclePolygonActive', {
          value: true
        });
        commit('setFilePolygonActive', {
          value: false
        });
      },
      setFilePolygonActive({
        commit
      }) {
        commit('setAreaPolygonActive', {
          value: false
        });
        commit('setCirclePolygonActive', {
          value: false
        });
        commit('setFilePolygonActive', {
          value: true
        });
      },
      clearCoordinates({
        commit
      }) {
        commit('clearCoordinates');
      },
      clearImages({
        commit
      }) {
        commit('clearImages');
      },
      clearGeoJsons({
        commit
      }) {
        commit('clearGeoJsons');
      },
      setZoom({
        commit
      }, payload) {
        commit('setZoom', payload);
      },
      setCenter({
        commit
      }, payload) {
        commit('setCenter', payload);
      },
      setCircleCenter({
        commit
      }, payload) {
        commit('setCircleCenter', payload)
      },
      setCirclePolygon({
        commit
      }, payload) {
        commit('setCirclePolygon', payload)
      },
      removeCirclePolygon({
        commit
      }) {
        commit('setCirclePolygon', null)
      },
      addGeoJsonPolygon({
        commit,
        getters
      }, payload) {
        let geoJson = L.geoJSON(payload.json);
        let bounds = geoJson.getBounds()

        if (!getters.getBounds.contains(bounds)) {
          commit('setBounds', {
            bounds
          });
          commit('setNeedUpdateBounds', {
            value: true
          })
        }

        commit('addGeoJsonPolygon', payload)
      },
      removeGeoJsonPolygon({
        commit
      }, payload) {
        commit('removeGeoJsonPolygon', payload)
      },
      addImage({
        commit,
        getters
      }, payload) {
        let image = payload;
        let p1 = L.latLng(image.bounds[1], image.bounds[0]);
        let p2 = L.latLng(image.bounds[3], image.bounds[2]);
        let bounds = L.latLngBounds(p1, p2);

        if (!getters.getBounds.contains(bounds)) {
          commit('setBounds', {
            bounds
          });
          commit('setNeedUpdateBounds', {
            value: true
          })
        }


        image.bounds = bounds;
        commit('addImage', image)
      },
      removeImage({
        commit
      }, payload) {
        commit('removeImage', payload)
      },
      addViewImage({
        commit
      }, payload) {
        let image = payload;
        let p1 = L.latLng(image.bounds[1], image.bounds[0]);
        let p2 = L.latLng(image.bounds[3], image.bounds[2]);
        let bounds = L.latLngBounds(p1, p2);

        if (image.fitBounds) {
          commit('setBounds', {
            bounds
          });
          commit('setNeedUpdateBounds', {
            value: true
          })
        }

        image.bounds = bounds;
        commit('addViewImage', image)
      },
      removeViewImage({
        commit
      }, payload) {
        commit('removeViewImage', payload)
      },
      setBounds({
        commit
      }, payload) {
        commit('setBounds', payload)
      },
      setNeedUpdateBounds({
        commit
      }, payload) {
        commit('setNeedUpdateBounds', payload)
      },
      async setFilePolygon({
        commit
      }, payload) {
        let formData = new FormData();
        formData.append('file', payload.file);
        let geoJson = null;
        try {
          let {
            data
          } = await filesApi.getPolygon(formData);
          geoJson = data.file;
        } catch (error) {
          console.log(error);
          return;
        }
        let bounds = L.geoJSON(geoJson).getBounds();
        commit('setBounds', {
          bounds
        });
        commit('setNeedUpdateBounds', {
          value: true
        })
        commit('setFilePolygon', geoJson)
      },
      removeFilePolygon({
        commit
      }) {
        commit('setFilePolygon', null)
      },
      activePolygonFitBounds({
        getters,
        commit
      }) {
        let geoJson = L.geoJSON(JSON.parse(getters.getActivePolygonJson));
        let bounds = geoJson.getBounds();
        commit('setBounds', {
          bounds
        });
        // commit('setZoom', {value: getters.getZoom - 1});
        commit('setNeedUpdateBounds', {
          value: true
        })
      },
      setCirclePolygonDrawable({
        commit
      }, payload) {
        commit('setCirclePolygonDrawable', payload);
      }
    }
  }