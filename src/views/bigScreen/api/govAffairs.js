import { admin } from '@/plugins/axios'
export default {
  // 重点人员 @author yangjiaqi
  getGovernmentKeyPersonList() {
    return admin.get(`/screen/government/keyPersonList`)
  },
  // 投诉建议 @author yangjiaqi
  getGovernmentAppealOpinionCount() {
    return admin.get(`/screen/government/appealOpinionCount`)
  }
}
