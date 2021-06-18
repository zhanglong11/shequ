import { admin } from '@/plugins/axios'

/**
 * 网格-企业员工管理-列表-分页 @author yangjiaqi
 * @param {Object} body
 */
export function getStaffList(body = {}) {
  return admin.post(`grid/enterprise/staff/list`, body)
}

/**
 * 网格-企业员工管理-新增 @author yangjiaqi
 * @param {Object} body
 */
export function createStaff(body = {}) {
  return admin.post(`grid/enterprise/staff/add`, body)
}

/**
 * 网格-企业员工管理-删除 @author yangjiaqi
 * @param {String} id id
 */
export function removeStaffById(id) {
  return admin.get(`grid/enterprise/staff/delete/${id}`)
}

/**
 * 网格-企业员工管理-详情 @author yangjiaqi
 * @param {String} id id
 */
export function getStaffById(id) {
  return admin.get(`grid/enterprise/staff/get/${id}`)
}

/**
 * 网格-企业员工管理-编辑 @author yangjiaqi
 * @param {Object} body
 */
export function updateStaff(body = {}) {
  return admin.post(`grid/enterprise/staff/update`, body)
}
