import { admin } from '@/plugins/axios'

/**
 * 积极分子管理 @author zhangshilong-列表 @author zhangshilong
 * @param {Object} body
 */
export function getPartyActivistManagementList(body = {}) {
  return admin.post(`partyActivistManagement/list`, body)
}

/**
 * 积极分子管理 @author zhangshilong-新增积极分子 @author zhangshilong
 * @param {Object} body
 */
export function createPartyActivistManagement(body = {}) {
  return admin.post(`partyActivistManagement/add`, body)
}
/**
 * 积极分子管理 @author zhangshilong-删除 @author zhangshilong
 * @param {String} id id
 */
export function removePartyActivistManagementById(id) {
  return admin.get(`partyActivistManagement/delete/${id}`)
}
/**
 * 积极分子管理 @author zhangshilong-详情 @author zhangshilong
 * @param {String} id id
 */
export function getPartyActivistManagementById(id) {
  return id.length !== 18
    ? admin.get(`partyActivistManagement/get/${id}`)
    : admin.get(`partyActivistManagement/getByIdentity/${id}`)
}
/**
 * 积极分子管理 @author zhangshilong-编辑积极分子 @author zhangshilong
 * @param {Object} body
 */
export function updatePartyActivistManagement(body = {}) {
  return admin.post(`partyActivistManagement/update`, body)
}
/**
 * 积极分子管理 @author zhangshilong-获取党组织和积极分子树结构 @author zhangshilong
 */
export function getPartyActivistManagementTreeList() {
  return admin.get(`partyActivistManagement/getTreeList`)
}
/**
 * 积极分子管理 @author zhangshilong-转为正式党员 @author zhangshilong
 */
export function changeActiveStatus(body = {}) {
  return admin.post(`partyActivistManagement/transformOfficial`, body)
}
