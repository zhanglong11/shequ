/**
 * 便民服务API模块
 */
import { admin } from '@/plugins/axios'

export default {
  /* 商户信息 */
  // 商户信息列表
  getMerchantList: data => {
    return admin.post(`/merchant/list`, data)
  },
  // 根据社会信用代码，查询企业信息
  getGridEnterpriseList: data => {
    return admin.post(`/grid/enterprise/list`, data)
  },
  // 新增商户信息
  addMerchant: data => {
    return admin.post(`/merchant/add`, data)
  },
  // 修改商户信息
  updateMerchant: data => {
    return admin.post(`/merchant/update`, data)
  },
  // 删除商户信息
  deleteMerchant: data => {
    return admin.post(`/merchant/delete`, data)
  },
  // 查询商户信息详情
  getMerchantDetail: id => {
    return admin.get(`/merchant/get/${id}`)
  },

  /* 投诉申诉 */
  // 投诉申诉列表
  getMerchantComplainList: data => {
    return admin.post(`/complain/list`, data)
  },
  // 获取指派人结构树(企业组织架构树)
  getSystemOrganizationTree: () => {
    return admin.post(`/cim6d/system/organization/tree`)
  },
  // 指派操作
  merchantComplainAssign: data => {
    return admin.post(`/complain/assign`, data)
  },
  // 更新投诉信息
  updateMerchantComplain: data => {
    return admin.post(`/complain/update`, data)
  },
  // 查询投诉信息
  getMerchantComplain: id => {
    return admin.get(`/complain/get/${id}`)
  },
  // 查询申诉信息
  getMerchantAppeal: id => {
    return admin.get(`/appeal/get/${id}`)
  },
  // 更新申诉信息
  updateMerchantAppeal: data => {
    return admin.post(`/appeal/update`, data)
  },

  /* 商户积分 */
  // 商户积分列表
  getMerchantScoreList: data => {
    return admin.post(`/score/list`, data)
  },
  // 设置商户积分
  setMerchantScore: data => {
    return admin.post(`/score/set`, data)
  },
  // 重置商户积分
  resetMerchantScore: data => {
    return admin.post(`/score/reset`, data)
  },
  // 商户积分详情
  getMerchantScoreDetail: id => {
    return admin.get(`/score/get/${id}`)
  },

  /* 商户评级 */
  // 商户评级列表
  getMerchantGradeList: data => {
    return admin.post(`/grade/list`, data)
  },
  // 设置商户评级
  setMerchantGrade: data => {
    return admin.post(`/grade/set`, data)
  },

  // 查询：商户积分初始信息、商户评级初始信息
  getInitScoreAndGrade: data => {
    return admin.post(`/grade/term/get`, data)
  }
}
