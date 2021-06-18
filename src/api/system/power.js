import { admin } from '@/plugins/axios'

/**
 * 服务权限配置接口-查询全部-权限管理 @author linhansheng
 * @param {Object} body
 */
export function getPowerListAll(body = {}) {
  return admin.post(`/system/power/tree`, body)
}

/**
 * 服务权限配置接口-添加权限
 * @param {Object} body
 */
export function createPower(body = {}) {
  return admin.post(`/system/power/add`, body)
}

/**
 * 服务权限配置接口-更新权限
 * @param {Object} body
 */
export function updatePower(body = {}) {
  return admin.post(`/system/power/update`, body)
}

/**
 * 服务权限配置接口-删除权限
 * @param {string} id id
 */
export function removePowerById(id) {
  return admin.get(`/system/power/delete/${id}`)
}

/**
 * 服务权限配置接口-服务权限树-更换顺序
 * @param {Object} body
 */
export function changeSort(body = {}) {
  return admin.post(`/system/power/changeSort`, body)
}
