import Vue from 'vue'
import Vuex from 'vuex'

import ApiService from './ApiService'
import PlayService from './PlayService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainTop: 0
  },
  modules: {
    ApiService,
    PlayService
  }
})
