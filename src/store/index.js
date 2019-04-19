import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
  activeIndex: '1-1',
  isLogin: false,
  administrator: {
    id: '',
    name: '',
    token: ''
  }
}

const getters = {
  getActiveIndex (state) {
    return state.activeIndex
  },

  isLogin (state) {
    return state.isLogin
  },

  getLoginAdmin (state) {
    return state.administrator
  },

  getLoginAdminId (state) {
    return state.administrator.id
  },

  getLoginAdminName (state) {
    return state.administrator.name
  },

  getLoginAdminToken (state) {
    return state.administrator.token
  }
}

const mutations = {
  setActiveIndex (state, activeIndex) {
    state.activeIndex = activeIndex
  },

  setIsLogin (state, isLogin) {
    state.isLogin = isLogin
  },

  setLoginAdmin (state, data) {
    state.administrator.id = data.userInfo.id
    state.administrator.name = data.userInfo.name
    state.administrator.token = data.token
  },

  setLoginAdminId (state, id) {
    state.administrator.id = id
  },

  setLoginAdminName (state, name) {
    state.administrator.name = name
  },

  setLoginAdminToken (state, token) {
    state.administrator.token = token
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations
})

export default store
