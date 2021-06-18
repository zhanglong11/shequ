import { admin } from '@/plugins/axios'
export default {
  // 大屏用:智慧党建模块 @author zhangshilong
  selectPartyModule(body) {
    return admin.post(`/screen/party/selectPartyModule`, body)
  },
  getPropagandaList(body) {
    return admin.post(`/screen/party/notificationList`, body)
  },
  getPropagandaDetail: id => {
    return admin.get(`/notification/get/${id}`)
  },
  // 党员学习列表
  getStudyList(body) {
    return admin.post(`/screen/party/partyStudyList`, body)
  },
  // 党员学习详情
  getStudyDetail: id => {
    return admin.get(`/partyStudy/get/${id}`)
  },
  // 党员学习记录列表
  getStudyRecordList: data => {
    return admin.post(`/partyStudy/studyRecordList`, data)
  },
  // 学习心得
  summarizeList: data => {
    return admin.post(`/partyStudy/summarizeList`, data)
  },
  // 党建活动列表
  getActivityList(body) {
    return admin.post(`/screen/party/activityList`, body)
  },
  getActivityDetail: id => {
    return admin.get(`/activity/get/${id}`)
  },
  // 获取活动签到
  getActivitySign: data => {
    return admin.post(`/activity/sign/list`, data)
  },
  // 活动学习心得
  activitySummarizeList: data => {
    return admin.post(`/activity/report/list`, data)
  },
  // 会议列表
  getMeetingList: data => {
    return admin.post(`/screen/party/meetingList`, data)
  },
  getMeetingDetail: id => {
    return admin.get(`/meeting/get/${id}`)
  },
  // 会议签到
  getMeetingSign: data => {
    return admin.post(`/activity/sign/list`, data)
  }
}
