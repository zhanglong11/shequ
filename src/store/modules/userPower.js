import { getSystemPower } from '@/api/system/user'
// import { resetRouter } from '@/router'
import { toFlat } from '@/utils'

const getDefaultState = () => {
  return {
    power: localStorage.getItem('power') ? localStorage.getItem('power').split(',') : []
  }
}

const state = getDefaultState()

const mutations = {
  changePower: (state, powerList) => {
    state.power = powerList
  }
}

const actions = {
  // 获取用户可用权限
  getSystemPower({ commit }) {
    return new Promise((resolve, reject) => {
      getSystemPower()
        .then(response => {
          const { data } = response
          const powerList = toFlat(data)
            .map(item => item.powerKey)
            .filter(item => item)
          commit('changePower', powerList)
          localStorage.setItem('power', powerList.join(','))
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
