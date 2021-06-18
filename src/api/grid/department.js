import { admin } from '@/plugins/axios'

/**
 * 网格组织-详情 @author yangjiaqi
 * @param {String} id id
 */
export function getOrganizationById(id) {
  return admin.get(`grid/organization/get/${id}`)
}

/**
 * 网格组织-新增 @author yangjiaqi
 * @param {Object} body
 */
export function createOrganization(body = {}) {
  return admin.post(`grid/organization/add`, body)
}

/**
 * 网格组织-删除 @author yangjiaqi
 * @param {String} id id
 */
export function removeOrganizationById(id) {
  return admin.get(`grid/organization/delete/${id}`)
}

/**
 * 网格组织-编辑 @author yangjiaqi
 * @param {Object} body
 */
export function updateOrganization(body = {}) {
  return admin.post(`grid/organization/update`, body)
}

/**
 * 网格组织-更换顺序 @author yangjiaqi
 * @param {Object} body
 */
export function changeOrganizationSort(body = {}) {
  return admin.post(`grid/organization/change`, body)
}
