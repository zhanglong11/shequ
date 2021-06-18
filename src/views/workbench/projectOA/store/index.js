// OA缓存
const getDefaultState = () => {
  return {
    organizationTree: JSON.parse(localStorage.getItem('organizationTree')) || [] // 企业组织架构树
  }
}

const state = getDefaultState()

const mutations = {
  // 设置企业组织架构树
  setOrganizationTree: (state, organizationTree) => {
    state.organizationTree = organizationTree
    localStorage.setItem('organizationTree', JSON.stringify(organizationTree))
  }
}

export default {
  state,
  mutations
}
