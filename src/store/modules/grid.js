import { getCommunityWithRoomTree } from '@/api/grid/space'
import treeFilter from '@/utils/treeFilter'

export default {
  namespaced: true,
  state: {
    structTreeData: [],
    communityTreeData: [],
    communityWithRoomTreeData: []
  },
  mutations: {
    changeStructTreeData(state, treeData) {
      state.structTreeData = treeData
    },
    changeCommunityTreeData(state, treeData) {
      state.communityTreeData = treeData
    },
    changeCommunityWithRoomTreeData(state, treeData) {
      state.communityWithRoomTreeData = treeData
    }
  },
  actions: {
    getStructTreeData: _.throttle(
      ({ commit }) => {
        return getCommunityWithRoomTree().then(res => {
          commit(
            'changeStructTreeData',
            treeFilter(res.data, item => item.type < 2, 'id', 'sort')
          )
          commit(
            'changeCommunityTreeData',
            treeFilter(res.data, item => item.type < 6, 'id', 'sort')
          )
          commit('changeCommunityWithRoomTreeData', res.data, 'id', 'sort')
        })
      },
      20,
      {
        leading: true,
        trailing: false
      }
    )
  }
}
