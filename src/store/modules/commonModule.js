import { getGroupArgByArgGroup } from '@/api/system/args'
export default {
  namespaced: true,
  state: {
    moduleList: [],
    docType: 'list'
  },
  mutations: {
    changeModuleList(state, list) {
      state.moduleList = list
    },
    changeDocType(state, type) {
      state.docType = type
    }
  },
  actions: {
    getModuleList({ commit }) {
      getGroupArgByArgGroup('module').then(res => {
        console.log(res);
        commit('changeModuleList', res.data || [])
      })
    }
  }
}
