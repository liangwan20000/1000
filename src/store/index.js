import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: window.sessionStorage.getItem('name'),
    photo: window.sessionStorage.getItem('phto')
  },
  mutations: {
    upName: function (state, value) {
      window.sessionStorage.setItem('name', value);
      state.name = window.sessionStorage.getItem('name');
    },
    upPhoto: function (state, value) {
      window.sessionStorage.setItem('phto', value);
      state.photo = window.sessionStorage.getItem('phto');
    },
    clearStore: function (state) {
      window.sessionStorage.clear();
      state.name = null;
      state.photo = null;
    }
  },
  actions: {
  },
  modules: {
  }
})
