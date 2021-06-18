import { admin } from '@/plugins/axios'
import { isDev } from '@/utils'

/**
 * 参数管理接口-获取所有参数分组（按模块） @author 杨佳奇
 * @param {Object} body
 */
export function getGroupList(body = {}) {
  return admin.post(`systemArg/group/list`, body)
}

/**
 * 参数管理接口-添加参数分组 @author 黄浩奇
 * @param {Object} body
 */
export function createGroup(body = {}) {
  return isDev ? admin.post(`systemArg/group/builtIn/add`, body) : admin.post(`systemArg/group/add`, body)
}

/**
 * 参数管理接口-编辑参数分组 @author 杨佳奇
 * @param {Object} body
 */
export function updateGroup(body = {}) {
  return admin.post(`systemArg/group/update`, body)
}

/**
 * 参数管理接口-删除参数分组 @author 杨佳奇
 * @param {Number} id id
 */
export function removeGroupById(id) {
  return admin.get(`systemArg/group/delete/${id}`)
}

/**
 * 参数管理接口-分组内参数详情 @author yangjiaqi
 * @param {String} argGroup argGroup
 */
export function getGroupArgByArgGroup(argGroup) {
  return admin.get(`systemArg/getGroupArg/${argGroup}`)
}

/**
 * 参数管理接口-删除参数 @author 杨佳奇
 * @param {Number} id id
 */
export function removeSystemArgById(id) {
  return admin.get(`systemArg/delete/${id}`)
}

/**
 * 参数管理接口-编辑参数 @author 杨佳奇
 * @param {Object} body
 */
export function updateSystemArg(body = {}) {
  return admin.post(`systemArg/update`, body)
}

/**
 * 参数管理接口-添加系统参数 @author yangjiaqi
 * @param {Object} body
 */
export function createSystemArg(body = {}) {
  return isDev ? admin.post(`systemArg/builtIn/add`, body) : admin.post(`systemArg/system/add`, body)
}
