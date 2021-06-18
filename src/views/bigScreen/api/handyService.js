import { admin } from '@/plugins/axios'
export default {
  // 大屏用:活动室列表 @author zhangshilong
  activityRoomList(body) {
    return admin.post(`/screen/service/activityRoomList`, body)
  },
  // 大屏用:积分兑换记录列表 @author zhangshilong
  scoreConvertList(body = {}) {
    return admin.post(`/screen/service/scoreConvertList`, body)
  },
  // 大屏用: 社区居民积分排名 @author zhangshilong
  scoreRankingList() {
    return admin.get(`/screen/service/scoreRankingList`)
  },
  // 大屏用:便民服务满意度排行-列表 @author zhangdj
  convenientRankList(body = {}) {
    return admin.post(`/screen/convenient/rank/list`, body)
  },
  // 大屏用:查询便民服务列表 @author zhangdj
  convenientList(body = {}) {
    return admin.post(`/screen/convenient/list`, body)
  }
}
