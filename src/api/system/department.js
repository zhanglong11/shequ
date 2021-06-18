import { admin } from '@/plugins/axios'
export default {
  // 部门列表
  getDepartment: data => {
    return admin({
      url: '/cim6d/system/department/list',
      method: 'POST',
      data
    })
  },
  // 添加部门
  addDepartment: data => {
    return admin({
      url: '/cim6d/system/department/add',
      method: 'POST',
      data
    })
  },
  // 编辑一个部门
  editOneDepartment: data => {
    return admin({
      url: '/cim6d/system/department/updateOne',
      method: 'POST',
      data
    })
  },
  // 编辑多个部门
  editMoreDepartment: data => {
    return admin({
      url: '/cim6d/system/department/updateMultiple',
      method: 'POST',
      data
    })
  },
  // 删除部门
  deleteDepartment: data => {
    return admin({
      url: '/cim6d/system/department/delete',
      method: 'POST',
      data
    })
  },
  getRoleTree: data => {
    return admin({
      url: '/cim6d/system/permission/role/tree',
      method: 'POST',
      data
    })
  },
  // 项目组织架构图
  getChartProjectOrgan: projectId => {
    return admin({
      url: `/projectOrgan/${projectId}/chart`,
      method: 'get'
    })
  }
}
