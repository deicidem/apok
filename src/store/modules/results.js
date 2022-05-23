import router from "@/router";

export default {
  namespaced: true,
  state: {
    results: [],
    selectable: {
      type: null,
      value: false,
      planIndex: null,
      dataIndex: null
    }
  },
  getters: {
    getResults(state) {
      return state.results;
    },
    getSelectable(state) {
      return state.selectable;
    }
  },
  mutations: {
    setResults(state, results) {

      state.results = results;
    },
    setResultProperty(state, data) {
      state.results[data.index][data.property] = data.value;
    },
    selectResult(state, data) {
      if (state.selectable.value) {
        let resultSelected = state.results[data.index].selected;

        if (resultSelected.value && resultSelected.type != data.type) {
          console.log("Снимок уже выбран");
          return;
        } else {
          state.results.forEach(el => {
            if (el.selected.value == true && el.selected.type == data.type) {
              el.selected.value = false;
              el.selected.type = null;
            }
          })

          resultSelected.value = data.value;
          resultSelected.type = data.type;
        }
      }
    },
    setSelectable(state, selectable) {
      state.selectable = selectable;
    },
    clearSelectable(state) {
      state.selectable = {
        type: null,
        value: false,
        planIndex: null,
        dataIndex: null
      }
    }
  },
  actions: {
    selectResult(store, data) {
      store.commit('selectResult', data);
      if (data.value) {
        store.dispatch('plans/setDataObject', {
          planIndex: store.getters.getSelectable.planIndex,
          dzzIndex: data.index,
          dataIndex: store.getters.getSelectable.dataIndex,
        }, {
          root: true
        });
      } else {
        store.dispatch('plans/setDataObject', {
          planIndex: store.getters.getSelectable.planIndex,
          dzzIndex: null,
          dataIndex: store.getters.getSelectable.dataIndex,
        }, {
          root: true
        });
      }
      store.commit('clearSelectable');
    },
    setResults({
      dispatch,
      commit
    }, results) {

      results.forEach(el => {
        el.polygonActive = false;
        el.imageActive = false;
        el.cardActive = false;
        el.selected = {
          type: null,
          value: false
        }
      })

      commit('setResults', results);
      dispatch('map/clearImages', true, {
        root: true
      });
      dispatch('map/clearGeoJsons', true, {
        root: true
      });
      router.push('results');
    },
    setResultProperty(store, data) {
      store.commit('setResultProperty', data);
    },
    setSelectable(store, data) {
      store.commit('setSelectable', data);
    }
  },

}