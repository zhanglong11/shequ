import { admin } from '@/plugins/axios'

/**
 * 网格-企业管理-列表-分页 @author yangjiaqi
 * @param {Object} body
 */
export function getEnterpriseList(body = {}) {
  return admin.post(`grid/enterprise/list`, body)
}

/**
 * 网格-企业管理-新增 @author yangjiaqi
 * @param {Object} body
 */
export function createEnterprise(body = {}) {
  return admin.post(`grid/enterprise/add`, body)
}

/**
 * 网格-企业管理-删除 @author yangjiaqi
 * @param {String} id id
 */
export function removeEnterpriseById(id) {
  return admin.get(`grid/enterprise/delete/${id}`)
}

/**
 * 网格-企业管理-详情 @author yangjiaqi
 * @param {String} id id
 */
export function getEnterpriseById(id) {
  return admin.get(`grid/enterprise/get/${id}`)
}

/**
 * 网格-企业管理-编辑 @author yangjiaqi
 * @param {Object} body
 */
export function updateEnterprise(body = {}) {
  return admin.post(`grid/enterprise/update`, body)
}
