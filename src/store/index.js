import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'light'
  },
  mutations: {
    switchTheme(state, val) {
      this.state.theme = val
      document.documentElement.setAttribute('data-theme', this.state.theme)
    }
  },
  actions: {
  },
  modules: {
  }
})
