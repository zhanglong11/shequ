import { admin } from '@/plugins/axios'

/**
 * 党组织管理 @author zhangshilong-树结构列表 @author zhangshilong
 */
export function getTreeList() {
  return admin.post(`partyOrganizationalManagement/getTreeList`)
}

/**
 * 党组织管理 @author zhangshilong-新增和保存 @author zhangshilong
 * @param {Object} body
 */
export function addAndSave(body = {}) {
  return admin.post(`partyOrganizationalManagement/addAndSave`, body)
}

/**
 * 党组织管理 @author zhangshilong-详情 @author zhangshilong
 * @param {String} id id
 */
export function getPartyOrganizationalManagementById(id) {
  return admin.get(`partyOrganizationalManagement/get/${id}`)
}

/**
 * 党组织管理 @author zhangshilong-删除 @author zhangshilong
 * @param {String} id id
 */
export function removePartyOrganizationalManagementById(id) {
  return admin.get(`partyOrganizationalManagement/delete/${id}`)
}
