import { getStructWithUserList } from '@/api/ccp/member'
import _ from 'lodash'
import { getTreeList } from '@/api/ccp/department'
import { getPartyActivistManagementTreeList } from '@/api/ccp/activeMember'
export default {
  namespaced: true,
  state: {
    structTreeData: [],
    structWithUserTreeData: [],
    structWithActiveMemberTreeData: []
  },
  mutations: {
    changeStructTreeData(state, treeData) {
      state.structTreeData = treeData
    },
    changeStructWithUserTreeData(state, treeData) {
      state.structWithUserTreeData = treeData
    },
    changeStructWithActiveMemberTreeData(state, treeData) {
      state.structWithActiveMemberTreeData = treeData
    }
  },
  actions: {
    getStructTreeData: _.throttle(
      ({ commit }) => {
        return getTreeList().then(res => {
          commit('changeStructTreeData', res.data)
        })
      },
      100,
      {
        leading: true,
        trailing: false
      }
    ),
    getStructWithUserTreeData: _.throttle(
      ({ commit }) => {
        return getStructWithUserList().then(res => {
          commit('changeStructWithUserTreeData', res.data)
        })
      },
      100,
      {
        leading: true,
        trailing: false
      }
    ),
    getStructWithActiveMemberList: _.throttle(
      ({ commit }) => {
        return getPartyActivistManagementTreeList().then(res => {
          commit('changeStructWithActiveMemberTreeData', res.data)
        })
      },
      100,
      {
        leading: true,
        trailing: false
      }
    )
  }
}
