import { admin } from '@/plugins/axios'
const { get, post } = admin

export default {
  // 物业
  // 物业组织列表
  getOrganizationList: data => {
    return post('/property/list', data)
  },
  // 获取全部物业
  getOrganizationListAll: data => {
    return post('/property/listAll', data)
  },
  // 详情
  getOrganizationDetail: id => {
    return get(`/property/get/${id}`, {})
  },
  addOrganization: data => {
    return post('/property/add', data)
  },
  updateOrganization: data => {
    return post('/property/update', data)
  },
  deleteOrganizationById: data => {
    return post(`/property/delete`, data)
  },
  // 物业员工列表
  getOrganizationUserList: data => {
    return post('/property/employee/list', data)
  },
  // 添加物业员工
  addOrganizationUser: data => {
    return post('/property/employee/add', data)
  },
  // 更新物业员工
  updateOrganizationUser: data => {
    return post('/property/employee/update', data)
  },
  // 删除物业员工
  deleteOrganizationUserById: data => {
    return post(`/property/employee/delete`, data)
  },
  // 投诉申诉
  getAppealList: data => {
    return post('/complain/list', data)
  },
  // 详情
  getAppealDetail: id => {
    return get(`/complain/get/${id}`, {})
  },
  // 指派申诉
  appealAssign: data => {
    return post(`/complain/assign`, data)
  },
  // 提交填写结果
  submitFillResult: data => {
    return post(`/complain/update`, data)
  },
  // 申诉处理
  submitHandleAppeal: data => {
    return post(`/appeal/update`, data)
  },
  // 物业巡查
  getPatrolList: data => {
    return post('/property/police/list', data)
  },
  // 添加巡查
  addPatrol: data => {
    return post(`/property/police/add`, data)
  },
  // 详情
  getPatrolDetail: id => {
    return get(`/property/police/get/${id}`, {})
  },
  // 申诉处理
  submitHandlePatrolAppeal: data => {
    return post(`/appeal/update`, data)
  },
  // 获取积分列表
  getIntegralList: data => {
    return post(`/score/property/list`, data)
  },
  // 设置初始积分值
  setIntegral: data => {
    return post(`/score/set`, data)
  },
  // 积分重置
  resetIntegral: data => {
    return post(`/score/reset`, data)
  },
  // 积分详情
  getIntegralDetail: id => {
    return get(`/score/property/get/${id}`, {})
  },
  // 获取所有等级
  getAllLevel: data => {
    return post(`/grade/term/get`, data)
  },
  // 获取评级列表
  getLevelList: data => {
    return post('/grade/list', data)
  },
  // 设置等级
  setLevel: data => {
    return post(`/grade/set`, data)
  }
}
