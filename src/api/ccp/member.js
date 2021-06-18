import { admin } from '@/plugins/axios'

/**
 * 党员管理 @author zhangshilong-获取党组织和党员的树结构 @author zhangshilong
 */
export function getStructWithUserList() {
  return admin.get(`partyMemberManagement/getTreeList`)
}

/**
 * 党员管理 @author zhangshilong-列表 @author zhangshilong
 * @param {Object} body
 */
export function getPartyMemberManagementList(body = {}) {
  return admin.post(`partyMemberManagement/list`, body)
}
/**
 * 党员管理 @author zhangshilong-新增党员 @author zhangshilong
 * @param {Object} body
 */
export function createPartyMemberManagement(body = {}) {
  return admin.post(`partyMemberManagement/add`, body)
}

/**
 * 党员管理 @author zhangshilong-详情 @author zhangshilong
 * @param {String} id id
 */
export function getPartyMemberManagementById(id) {
  return id.length !== 18
    ? admin.get(`partyMemberManagement/get/${id}`)
    : admin.get(`partyMemberManagement/getByIdentity/${id}`)
}

/**
 * 党员管理 @author zhangshilong-编辑党员 @author zhangshilong
 * @param {Object} body
 */
export function updatePartyMemberManagement(body = {}) {
  return admin.post(`partyMemberManagement/update`, body)
}

/**
 * 党员管理 @author zhangshilong-删除党员 @author zhangshilong
 * @param {String} id id
 */
export function removePartyMemberManagementById(id) {
  return admin.get(`partyMemberManagement/delete/${id}`)
}

/**
 * 党员学习 @author zhangshilong-党员学习记列表 @author zhangshilong
 * @param {Object} body
 */
export function studyRecordList(body = {}) {
  return admin.post(`partyStudy/studyRecordList`, body)
}

/**
 * 党员学习 @author zhangshilong-党员学习心得列表 @author zhangshilong
 * @param {Object} body
 */
export function summarizeList(body = {}) {
  return admin.post(`partyStudy/summarizeList`, body)
}
