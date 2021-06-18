import { admin } from '@/plugins/axios'

/**
 * 网格-车辆管理-列表-分页 @author yangjiaqi
 * @param {Object} body
 */
export function getCarList(body = {}) {
  return admin.post(`grid/car/list`, body)
}

/**
 * 网格-车辆管理-新增 @author yangjiaqi
 * @param {Object} body
 */
export function createCar(body = {}) {
  return admin.post(`grid/car/add`, body)
}

/**
 * 网格-车辆管理-删除 @author yangjiaqi
 * @param {String} id id
 */
export function removeCarById(id) {
  return admin.get(`grid/car/delete/${id}`)
}

/**
 * 网格-车辆管理-详情 @author yangjiaqi
 * @param {String} id id
 */
export function getCarById(id) {
  return admin.get(`grid/car/get/${id}`)
}

/**
 * 网格-车辆管理-编辑 @author yangjiaqi
 * @param {Object} body
 */
export function updateCar(body = {}) {
  return admin.post(`grid/car/update`, body)
}
/**
 * 网格-车辆管理-导出 @author yangjiaqi
 * @param {Object} body
 */
export function exportCar(body = {}) {
  return admin.post(`grid/car/export`, body, { responseType: 'blob' })
}

/**
 * 车辆信息模板导出 @author yangjiaqi
 * @param {Object} body
 */
export function exportCarTemplate() {
  return admin.get(`grid/car/template/export`, { responseType: 'blob' })
}
