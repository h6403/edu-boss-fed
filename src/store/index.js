import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || null)
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      // 通过本地存储对 user 进⾏数据持久化
      // - 注意，本地存储只能保存字符串
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
