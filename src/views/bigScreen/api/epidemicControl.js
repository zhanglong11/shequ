import { admin } from '@/plugins/axios'
export default {
  // 通知公告
  queryNotification(body = {}) {
    return admin.post(`/screen/epidemic/notificationList`, body)
  },
  // 巡查记录
  queryEpidemicSituationPatrol(body = {}) {
    return admin.post(`/epidemic/situation/patrol/list`, body)
  },
  // 接种情况统计
  queryVaccineCount(body = {}) {
    return admin.post(`/screen/vaccine/count`, body)
  },
  // 当前全国疫情
  queryNcovOverviewNow() {
    return admin.get(`/epidemic/nocv/overview/now`)
  },
  // 较昨日全国疫情
  queryNcovOverviewYesterday() {
    return admin.get(`/epidemic/nocv/overview/yesterday`)
  },
  // 国内省市疫情
  queryNcovCity() {
    return admin.get(`/epidemic/nocv/city`)
  },
  // 重点人员
  queryEpidemicPersonInfo() {
    return admin.get(`/screen/epidemic/keyPersonInfo`)
  }
}
