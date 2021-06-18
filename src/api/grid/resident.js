import { admin } from '@/plugins/axios'

/**
 * 网格-居民管理-列表-分页 @author yangjiaqi
 * @param {Object} body
 */
export function getResidentList(body = {}) {
  return admin.post(`grid/resident/list`, body)
}

/**
 * 网格-居民管理-新增 @author yangjiaqi
 * @param {Object} body
 */
export function createResident(body = {}) {
  return admin.post(`grid/resident/add`, body)
}

/**
 * 网格-居民管理-删除 @author yangjiaqi
 * @param {String} id id
 */
export function removeResidentById(id) {
  return admin.get(`grid/resident/delete/${id}`)
}

/**
 * 网格-居民管理-详情 @author yangjiaqi  传身份证亦可
 * @param {String} id id
 */
export function getResidentById(id) {
  return id.length !== 18 ? admin.get(`grid/resident/get/${id}`) : admin.get(`grid/resident/getByCard/${id}`)
}

/**
 * 网格-居民管理-编辑 @author yangjiaqi
 * @param {Object} body
 */
export function updateResident(body = {}) {
  return admin.post(`grid/resident/update`, body)
}

/**
 * 网格-居民管理-导入 @author yangjiaqi
 * @param {Object} body
 */
export function importResident(body = {}) {
  return admin.post(`grid/resident/import`, body)
}

/**
 * 网格-居民管理-导出 @author yangjiaqi
 * @param {Object} body
 */
export function exportResident(body = {}) {
  return admin.post(`grid/resident/export`, body, { responseType: 'blob' })
}

/**
 * 居民信息模板导出 @author yangjiaqi
 * @param {Object} body
 */
export function exportResidentTemplate() {
  return admin.get(`grid/resident/template/export`, { responseType: 'blob' })
}
