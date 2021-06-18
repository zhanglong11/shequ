import { admin, workflow } from '@/plugins/axios'
export default {
  // 查询我的日程 @author zhangshilong
  queryMyScheduleList: data => {
    return admin.post(`/index/myScheduleList`, data)
  },
  // 新增我的日程 @author zhangshilong
  addMySchedule: data => {
    return admin.post(`/index/addMySchedule`, data)
  },
  // 数据统计（饼状图） @author zhangdj
  queryStatistics: data => {
    return admin.post(`/index/statistics`, data)
  },
  // 首页计数调用 @author zhangdj
  queryMeetingCount: data => {
    return admin.post(`/meeting/count`, data)
  },
  // 查询全部列表 @author zhangdj
  queryMeetingListAll: data => {
    return admin.post(`/meeting/listAll`, data)
  },
  // 删除会议信息 @author zhangdj
  deleteMeeting: id => {
    return admin.get(`/meeting/ignore?id=${id}`)
  },
  // 获取所有快捷导航 @author yangjiaqi
  queryNavigationList: data => {
    return admin.get(`/navigation/list`, data)
  },
  // 保存快捷导航 @author yangjiaqi
  saveNavigation: data => {
    return admin.post(`/navigation/save`, data)
  },
  // 获取所有权限 @author yangjiaqi
  querySystemPowerTree: data => {
    return admin.post(`/system/power/tree`, data)
  },
  // 获取审核待审核列表
  getTaskList: data => {
    return workflow.post(`/task/list`, data)
  }
}
