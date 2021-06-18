// OA配置
const file = '/wisdom-community-file'
const workflow = '/wisdom-community-oa'
export default {
  projectType: 'wisdom-community',
  projectTypeList: [],
  userType: 2,
  isSingleCompany: true,
  configApi: {
    companyApi: ``, // 公司API
    fileUploadApi: `${file}/noToken/file/commonFile/visitor/upload/drag-form`, // 文件上传API
    fileByIdApi: `${file}/file/commonFile/get/`, // 文件Id查询API
    filePreviewApi: `${file}/noToken/file/commonFile/onlinePreview/`, // 文件在线预览Api
    queryGroup: `${workflow}/oa/form/group/select`, // 表单分组下拉列表
    getFormDetails: `${workflow}/oa/form/get/`, // 获取表单详情
    saveForm: `${workflow}/oa/form/save`, // 保存表单
    saveAndPublish: `${workflow}/oa/form/saveAndPublish`, // 保存表单并发布
    saveAuditStyle: `${workflow}/oa/audit/style/save`, // 保存审批样式
    getAuditStyle: `${workflow}/oa/audit/style/select`, // 审批样式下拉列表
    getDetailsAuditStyle: `${workflow}/oa/audit/style/get/`, // 审批样式详情
    deleteAuditStyle: `${workflow}/oa/audit/style/delete/` // 删除审批样式
  }
}
