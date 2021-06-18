import { admin } from '@/plugins/axios'
const { post, get } = admin
export default {
  // 列表查询
  getWorkbenchList: data => {
    return post(`/meeting/list`, data)
  },
  // 新增
  getWorkbenchAdd: data => {
    return post(`/meeting/add`, data)
  },
  // 修改
  getWorkbenchUpdate: data => {
    return post(`/meeting/update`, data)
  },
  // 会议详情
  getWorkbenchDetail: id => {
    return get(`/meeting/get/${id}`)
  },
  // 上传会议
  getWorkbenchMeeting: data => {
    return post(`/meeting/upload`, data)
  },
  // 取消
  getWorkbenchDelete: data => {
    return post(`/meeting/delete`, data)
  },
  // 删除
  getWortDelete: id => {
    return post(`/meeting/record/delete`, id)
  },
  // 党会议签到
  getWortSign: data => {
    return post(`/meeting/sign`, data)
  }
}
