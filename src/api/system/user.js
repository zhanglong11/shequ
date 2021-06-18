import { admin } from '@/plugins/axios'

/**
 * 登录接口-普通用户登录
 * @param {Object} body
 */
export function login(body = {}) {
  return admin.post(`login`, body)
}

export function getInfo() {
  return admin.get('/user/current/get')
}

/**
 * 用户列表
 * @param {Object} body
 */
export function getUserList(body) {
  return admin.post(`cim6d/system/user/list`, { ...body })
}

/**
 * 用户管理接口-批量删除用户
 * @param {Object} ids
 */
export function batchDeleteUser(ids = []) {
  return admin.post(`cim6d/system/user/batchDelete`, ids)
}

/**
 * 用户管理接口-修改密码
 * @param {Object} body
 */
export function updateUserPassword(body = {}) {
  return admin.post(`cim6d/system/user/password/change`, body)
}

/**
 * 用户管理接口-编辑用户
 * @param {Object} body
 */
export function updateUserInfo(body = {}) {
  return admin.post(`cim6d/system/user/update`, body)
}

/**
 * 用户管理接口-验证登录密码是否正确
 * @param {String} pwd
 */
export function validPassword(pwd) {
  return admin.get(`cim6d/system/user/validPassword`, { params: { password: pwd } })
}

/**
 * 用户关联部门接口-企业组织架构树 @author yangjiaqi
 */
export function getOrganizationTree() {
  return admin.post(`cim6d/system/organization/tree`)
}

/**
 * 批量重置用户密码（管理员使用） @author yangjiaqi
 */
export function userResetPwd(data = {}) {
  return admin.post(`cim6d/system/user/resetPwd`, data)
}

/**
 * 获取用户可用权限 @author yangjiaqi
 */
export function getSystemPower() {
  return admin.get(`/system/power/available`)
}

/**
 * 退出登陆 @author LiZongLiang
 * @param {Object} body
 */
export function logout(body = {}) {
  return admin.get(`/session/logout`, body)
}
