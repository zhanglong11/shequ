import { admin } from '@/plugins/axios'
const { get, post } = admin

export default {
  // 申诉列表
  getAppealList: data => {
    return post('/government/appeal/list', data)
  },
  // 诉求详情
  getAppealDetail: id => {
    return get(`/government/appeal/get/${id}`)
  },
  // 处理申诉
  submitHandleAppeal: data => {
    return post('/government/appeal/deal', data)
  },
  // 删除申诉
  deleteAppeal: id => {
    return get(`/government/appeal/delete/${id}`)
  },
  // 建议列表
  getSuggestList: data => {
    return post('/government/opinion/list', data)
  },
  getSuggestDetail: id => {
    return get(`/government/opinion/get/${id}`)
  },
  // 处理建议
  submitHandleSuggest: data => {
    return post('/government/opinion/deal', data)
  },
  // 删除建议
  deleteSuggest: id => {
    return get(`/government/opinion/delete/${id}`, {})
  }
}
