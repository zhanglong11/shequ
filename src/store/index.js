import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import tagsView from './modules/tagsView'
import ccp from './modules/ccp'
import grid from './modules/grid'
import commonModule from './modules/commonModule'
import projectOAStore from '@/views/workbench/projectOA/store'
import createPersistedState from 'vuex-persistedstate'
import userPower from './modules/userPower' // 用户权限

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    tagsView,
    ccp,
    grid,
    commonModule,
    projectOAStore,
    userPower
  },
  getters,
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      paths: ['commonModule']
    })
  ]
})

export default store
