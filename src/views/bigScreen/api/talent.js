import { admin, file } from '@/plugins/axios'
export default {
  // 大屏活动信息 @author zhangdj
  activityList(body = {}) {
    return admin.post(`/screen/activity/list`, body)
  },
  // 通知公告-列表 @author zhangshilong
  queryInformList(body = {}) {
    return admin.post(`/screen/elegantDemeanor/informList`, body)
  },
  // 查询社区风采列表 @author zhangdj
  queryElegantDemeanorList(body = {}) {
    return admin.post(`/screen/elegantDemeanor/list`, body)
  },
  // 大屏用:投票与问卷 @author zhangshilong
  questionnaireAndVote(body = {}) {
    return admin.post(`/screen/elegantDemeanor/questionnaireAndVote`, body)
  },
  // 查询活动列表 @author zhangdj
  queryActivityList(body = {}) {
    return admin.post(`/activity/list`, body)
  },
  // 查询组织列表 @author zhangdj
  queryOrganizationList(body = {}) {
    return admin.post(`/organization/list`, body)
  },
  // 大屏用:党组织列表 @author zhangshilong
  queryPartyOrgList(body = {}) {
    return admin.post(`/screen/elegantDemeanor/getPartyOrganizationalList`, body)
  },
  // 会议详情
  getOrganizationDetail: id => {
    return admin.get(`/organization/get/${id}`)
  },
  getActivityDetail: id => {
    return admin.get(`/activity/get/${id}`)
  },
  // 查询签到活动列表
  getActivitySign: data => {
    return admin.post(`/activity/sign/list`, data)
  },
  // 查询活动心得
  getActivityReport: data => {
    return admin.post(`/activity/report/list`, data)
  },
  getPersonByPartyOrganizational(body = {}) {
    return admin.post(`/screen/elegantDemeanor/getPersonByPartyOrganizational`, body)
  },
  getVideoUrl: id => {
    return file.get(`/file/commonFile/get/${id}`)
  },
  getInformGetDetail: id => {
    return admin.get(`/informAnnouncement/informGet/${id}`)
  },
  // 大屏用:投票与问卷 @author zhangshilong
  queryQuestionnaireAndVoteList(body = {}) {
    return admin.post(`/screen/elegantDemeanor/questionnaireAndVote`, body)
  }
}
