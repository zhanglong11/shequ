import { login, getInfo } from '@/api/system/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userInfo: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_COMPANY_ID: (state, companyId) => {
    state.companyId = companyId
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // user login
  login({ commit, dispatch }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then(response => {
          const { data: token } = response
          commit('SET_TOKEN', token)
          setToken(token)
          dispatch('commonModule/getModuleList', {}, { root: true })
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response
          if (!data) {
            return reject(new Error('Verification failed, please Login again.'))
          }
          commit('SET_NAME', data.realName)
          commit('SET_AVATAR', data.headImage)
          commit('SET_COMPANY_ID', data.companyId)
          commit('SET_USER_INFO', data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      this.commit('tagsView/CLEAR_CACHED_VIEW')
      removeToken() // must remove  token  first
      resetRouter()
      localStorage.clear()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
