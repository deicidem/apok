// import router from "@/router";

export default {
  namespaced: true,
  state: {
    results: [],
    selectable: {
      type: null,
      value: false,
      planIndex: null,
      dataIndex: null
    },
    currentSort: null,
    currentSortDir: 'asc'
  },
  getters: {
    getResults(state) {
      return state.results;
    },
    getSelectable(state) {
      return state.selectable;
    },
    resultsMap(state) {
      let resultsMap = {};

      for (let i = 0; i < state.results.length; i++) {
        let result = state.results[i];
        resultsMap[result.id] = result;
      }
      return resultsMap;
    },
    getSortDir(state) {
      return state.currentSortDir;
    }
  },
  mutations: {
    setResultProperty(state, data) {
      state.results[data.index][data.property] = data.value;
    },
    setResults(state, results) {
      state.results = results;
    },
    selectResult(state, data) {
        let resultSelected = state.results[data.index].selected;

        if (resultSelected.value == data.value && resultSelected.type != data.type) {
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
    },
    sortResultsBy(state, key) {
      if (state.currentSort == key) {
        state.currentSortDir = state.currentSortDir === 'asc' ? 'desc' : 'asc';
      } else {
        state.currentSort = key;
        state.currentSortDir = 'asc';
      }
      
      state.results.sort((a, b) => {
        let modifier = 1;
        if(state.currentSortDir === 'desc') modifier = -1;
        if(a[state.currentSort]==null) return 1 * modifier;
        if(b[state.currentSort]==null) return -1 * modifier;
        if(a[state.currentSort] < b[state.currentSort]) return -1 * modifier;
        if(a[state.currentSort] > b[state.currentSort]) return 1 * modifier;
        return 0;
      })
    },
    setSelectable(state, selectable) {
      state.selectable = selectable;
    },
    clearSelectable(state) {
      state.selectable.type = null;
      state.selectable.value = false;
      state.selectable.dataIndex = null;
    }
  },
  actions: {
    selectResult(store, data) {
      store.commit('selectResult', data);
      if (data.value) {
        store.dispatch('plans/setDataObject', {
          planIndex: store.getters.getSelectable.planIndex,
          dzzIndex: store.getters.getResults[data.index].id,
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
    setResults({dispatch, commit}, results) {
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
      // router.push('/main/results');
    },
    setResultProperty(store, data) {
      store.commit('setResultProperty', data);
    },
    setSelectable(store, data) {
      store.commit('setSelectable', data);
    },
    resetResultSelection(store, data) {
      for (let i = 0; i < store.getters.getResults.length; i++) {
        store.commit('selectResult', {index: i, type: null, value: false});
      } 
      store.rootGetters['plans/getPlans'][data.planIndex].data.forEach((el, i) => {
        if (el.dzzIndex != null) {
          store.commit('selectResult', {index: el.dzzIndex, type: i, value: true});
        }
      })
    },
    sortResultsBy(store, key) {
      store.commit('sortResultsBy', key)
    }
  },

}