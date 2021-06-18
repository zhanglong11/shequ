import { admin } from '@/plugins/axios'
export default {
  // 公告详情
  getNotification: id => {
    return admin.get(`/noToken/notification/get/${id}`)
  },
  // 办事指南详情
  getThePublicGuide: id => {
    return admin.get(`/noToken/thePublicGuide/get/${id}`)
  },
  // 党员学习详情
  getPartyStudy: id => {
    return admin.get(`/noToken/partyStudy/get//${id}`)
  }
}
