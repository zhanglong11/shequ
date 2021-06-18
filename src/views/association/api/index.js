import { admin } from '@/plugins/axios'
const { post, get } = admin
export default {
  // 列表查询
  getOrganizationList: data => {
    return post(`/organization/list`, data)
  },
  // 新增
  getOrganizationAdd: data => {
    return post(`/organization/add`, data)
  },
  // 修改
  getOrganizationUpdate: data => {
    return post(`/organization/update`, data)
  },
  // 会议详情
  getOrganizationDetail: id => {
    return get(`/organization/get/${id}`)
  },
  // 删除
  getOrganizationDelete: data => {
    return post(`/organization/delete`, data)
  },

  // 活动查询列表
  getActivityList: data => {
    return post(`/activity/list`, data)
  },
  getActivityAdd: data => {
    return post(`/activity/add`, data)
  },
  getActivityUpdate: data => {
    return post(`/activity/update`, data)
  },
  getActivityDelete: data => {
    return post(`/activity/delete`, data)
  },
  getActivityDetail: id => {
    return get(`/activity/get/${id}`)
  },
  // 查询签到活动列表
  getActivitySign: data => {
    return post(`/activity/sign/list`, data)
  },
  // 查询活动心得
  getActivityReport: data => {
    return post(`/activity/report/list`, data)
  },
  // 组织名
  getOrganizationAll: data => {
    return post(`/organization/listAll`, data)
  },
  // 参与人员
  getOPrganizationList: data => {
    return post(`/organization/member/tree`, data)
  },
  // 签到二维码
  getSignCode: data => {
    return get(`/sign/qrCode`, data)
  },
  // 获取二维码有效期
  getCodePeriod: data => {
    return post(`/activity/ercode/get`, data)
  },
  // 设置二维码有效期
  setCodePeriod: data => {
    return post(`/activity/ercode/set`, data)
  },
  // 获取签到二维码 @author zhangdj
  getActivityQrCode: (actId, url) => {
    return get(`/activity/sign/qrCode?actId=${actId}&url=${url}`, {
      responseType: 'blob'
    })
  }
}
