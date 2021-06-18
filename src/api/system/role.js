import { admin } from '@/plugins/axios'

/**
 * 角色管理接口-新建角色
 * @param {Object} body
 */
export function createRole(body = {}) {
  return admin.post(`cim6d/system/permission/role/add`, body)
}

/**
 * 角色管理接口-新建角色分类
 * @param {Object} body
 */
export function createCategory(body = {}) {
  return admin.post(`cim6d/system/permission/role/category/add`, body)
}

/**
 * 角色管理接口-删除角色分类
 * @param {String} id id
 */
export function removeCategoryById(id) {
  return admin.get(`cim6d/system/permission/role/category/delete/${id}`)
}

/**
 * 角色管理接口-编辑角色分类
 * @param {Object} body
 */
export function updateCategory(body = {}) {
  return admin.post(`cim6d/system/permission/role/category/update`, body)
}

/**
 * 角色管理接口-删除角色
 * @param {String} id id
 */
export function removeRoleById(id) {
  return admin.get(`cim6d/system/permission/role/delete/${id}`)
}

/**
 * 角色管理接口-角色已分配权限
 * @param {String} roleId roleId
 */
export function getPowerListByRoleId(roleId) {
  return admin.get(`cim6d/system/permission/role/power/list/${roleId}`)
}

/**
 * 角色管理接口-角色分类&角色树
 * @param {Object} body
 */
export function roleTree(body = {}) {
  return admin.post(`cim6d/system/permission/role/tree`, body)
}

/**
 * 角色管理接口-编辑角色
 * @param {Object} body
 */
export function updateRole(body = {}) {
  return admin.post(`cim6d/system/permission/role/update`, body)
}

/**
 * 角色管理接口-批量删除用户角色
 * @param {Array} userIdList
 */
export function removeRoleBatch(userIdList = []) {
  return admin.post(`cim6d/system/permission/user/role/batch/delete`, userIdList)
}

/**
 * 角色管理接口-用户角色授权
 * @param {String} userId userId
 * @param {Array} roleIdList
 */
export function bindByUserId(userId, roleIdList = []) {
  return admin.post(`cim6d/system/permission/user/role/bind/${userId}`, roleIdList)
}

/**
 * 角色管理接口-角色权限绑定
 * @param {Array} dtoList
 */
export function roleBind(dtoList = []) {
  return admin.post(`cim6d/system/permission/user/role/power/bind`, dtoList)
}

/**
 * 角色管理接口-角色权限重置
 * @param {String} powerId powerId
 * @param {String} roleId roleId
 */
export function roleReset(powerId, roleId) {
  return admin.get(`cim6d/system/permission/user/role/power/reset/${roleId}/${powerId}`)
}

/**
 * 角色管理接口-查询用户已授权角色
 * @param {String} userId userId
 */
export function queryByUserId(userId) {
  return admin.get(`cim6d/system/permission/user/role/query/${userId}`)
}

/**
 * 角色管理接口-重置用户角色
 * @param {String} userId userId
 */
export function resetByUserId(userId) {
  return admin.get(`cim6d/system/permission/user/role/reset/${userId}`)
}
