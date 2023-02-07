import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './authentication'
import todos from './todos'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authentication,
    todos
  }
})
