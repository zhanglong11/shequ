import { workflow, admin } from '@/plugins/axios'
export default {
  // 我发起的列表
  getCreatedByMeList: data => {
    return workflow.post('/activiti/process/instance/started', data)
  },
  // 获取审核待审核列表
  getTaskList: data => {
    return workflow.post('/task/list', data)
  },
  // 抄送给我列表
  getCopyToMeList: data => {
    return workflow.post('/oa/cc/list', data)
  },
  updateCCStatus: id => {
    return workflow.get(`/oa/cc/update/${id}`)
  },
  // 获取表单分组列表
  getFormGroupList: data => {
    return workflow.post('/oa/form/group/select', data)
  },
  // 获取表单列表
  getFormList: data => {
    return workflow.post('/oa/form/list', data)
  },
  // 获取表单排序
  getFormSort: data => {
    return workflow.post('/oa/form/sort', data)
  },
  // 获取表单列表
  getRecentlyFormList: data => {
    return workflow.get('/oa/form/recently/used/list', data)
  },
  // 获取分组表单列表
  getGroupFormList: data => {
    return workflow.post('/oa/form/group/list', data)
  },
  // 添加分组
  getGroupFormAdd: data => {
    return workflow.post('/oa/form/group/save', data)
  },
  // 删除分组
  getGroupFormDelete: id => {
    return workflow.get(`/oa/form/group/delete/${id}`)
  },
  // 自定义表单的删除
  getCustomFormDelete: id => {
    return workflow.get(`/oa/form/delete/${id}`)
  },
  // 获取表单详情
  getFormDetail: id => {
    return workflow.get(`/oa/form/get/${id}`)
  },
  // 获取填报表单详情
  getFormFillDetail: id => {
    return workflow.get(`/oa/form/data/get/${id}`)
  },
  // 填报表单的保存
  getFormFillSave: data => {
    return workflow.post(`/oa/form/data/save`, data)
  },
  //  填报表单的保存并提交
  getFormFillSaveAndSubmit: data => {
    return workflow.post(`/oa/form/data/saveAndSubmit`, data)
  },
  // 获取属于小组的选择列表
  getGroupSelect: data => {
    return workflow.post(`/oa/form/group/select`, data)
  },
  // 获取审批样式列表
  getAuditStyleList: data => {
    return workflow.post('/oa/audit/style/list', data)
  },
  // 启用审批样式
  toStart: id => {
    return workflow.get(`/oa/audit/style/enable/${id}`)
  },
  // 停用审批样式
  toStop: id => {
    return workflow.get(`/oa/audit/style/disable/${id}`)
  },
  // 获取审批样式详情
  getAuditStyleDetail: id => {
    return workflow.get(`/oa/audit/style/get/${id}`)
  },
  // 保存审批样式表单
  addAuditStyle: data => {
    return workflow.post('/oa/audit/style/save', data)
  },
  // 表单统计
  getFormCount: () => {
    return workflow.get('/oa/form/count')
  },
  // 获取审批数据
  getFormProcess: id => {
    return workflow.get(`/oa/form/process/get/${id}`)
  },
  // 获取审批样式模板详情
  getAuditStyleTemplate: id => {
    return workflow.get(`/oa/audit/style/template/${id}`)
  },
  // 动态表单审批流程
  queryTaskComplete: (id, data) => {
    return workflow.post(`/task/complete/${id}`, data)
  },
  // 企业组织架构树 @author yangjiaqi
  queryOrganizationTree: () => {
    return admin.post(`/cim6d/system/organization/tree`)
  }
}
