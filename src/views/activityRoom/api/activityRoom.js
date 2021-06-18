/*
 * @Description: 活动室API
 * @Version: 1.0
 * @Autor: zongguosheng
 * @Date: 2021-04-14 10:02:07
 * @LastEditors: zongguosheng
 * @LastEditTime: 2021-05-07 15:29:52
 */
import { admin } from '@/plugins/axios'
export const activityRoomApi = {
  // 新增活动室
  addActivityRoom: data => {
    return admin({
      url: '/activityRoom/add',
      method: 'post',
      data
    })
  },
  // 编辑活动室
  updateActivityRoom: data => {
    return admin({
      url: '/activityRoom/update',
      method: 'post',
      data
    })
  },

  // 详情
  getActivityRoomInfo: (id, data) => {
    return admin({
      url: `/activityRoom/get/${id}`,
      method: 'get',
      data
    })
  },

  // 删除活动室
  deleteActivityRoom: id => {
    return admin({
      url: `/activityRoom/delete/${id}`,
      method: 'get'
    })
  },

  // 预约记录列表
  getrecordList: data => {
    return admin({
      url: '/activityRoom/recordList',
      method: 'post',
      data
    })
  },

  // 关闭活动室
  closeRoom: data => {
    return admin({
      url: '/activityRoom/close',
      method: 'post',
      data
    })
  },

  // 获取某月哪一天有预约记录
  getrecordListDay: data => {
    return admin({
      url: '/activityRoom/recordByMonth',
      method: 'post',
      data
    })
  }
}
