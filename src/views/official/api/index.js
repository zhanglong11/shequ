import { admin } from '@/plugins/axios'
const { post, get } = admin
export default {
  // 公告列表查询
  getinformList: data => {
    return post(`/informAnnouncement/informList`, data)
  },
  // 核对
  getinformAdd: data => {
    return post(`/informAnnouncement/check`, data)
  },
  // 公告详情
  getinformDetail: id => {
    return get(`informAnnouncement/informGet/${id}`)
  },
  // 投票列表
  getinformVoteList: data => {
    return post(`/informAnnouncement/voteList`, data)
  },
  // 投票列表新增
  getinformVoteAdd: data => {
    return post(`/informAnnouncement/addVote`, data)
  },
  // 投票详情
  getinformVoteDetail: id => {
    return get(`/informAnnouncement/getVote/${id}`)
  },
  // 投票修改
  getinformUpdate: data => {
    return post(`/informAnnouncement/updateVote`, data)
  },
  // 投票删除
  getinformDelete: id => {
    return get(`/informAnnouncement/deleteVote/${id}`)
  },
  // 物品交换
  getinformGoodsAdd: data => {
    return post(`/thePublicExchange/add`, data)
  },
  getinformGoodsList: data => {
    return post(`/thePublicExchange/list`, data)
  },
  getinformGoodsUpdate: data => {
    return post(`/thePublicExchange/update`, data)
  },
  getinformGoodsDetail: id => {
    return get(`/thePublicExchange/get/${id}`)
  },
  getinformGoodsDelete: id => {
    return get(`/thePublicExchange/delete/${id}`)
  },
  getinformGoodsAudit: data => {
    return post(`/thePublicExchange/audit`, data)
  },
  // 问卷
  getinformQuestionAdd: data => {
    return post(`/thePublicQuestionnaire/add`, data)
  },
  getinformQuestionList: data => {
    return post(`/thePublicQuestionnaire/list`, data)
  },
  getinformQuestionUpdate: data => {
    return post(`/thePublicQuestionnaire/update`, data)
  },
  getinformQuestionDetail: id => {
    return get(`/thePublicQuestionnaire/get/${id}`)
  },
  getinformQuestionDelete: id => {
    return get(`/thePublicQuestionnaire/delete/${id}`)
  },
  getinformQuestionSubmit: data => {
    return post(`/thePublicQuestionnaire/submitList`, data)
  },
  getinformQuestiontResult: id => {
    return get(`/thePublicQuestionnaire/getResult/${id}`)
  },
  // 办事指南
  getthePublicGuideList: data => {
    return post(`/thePublicGuide/list`, data)
  },
  getthePublicGuideAdd: data => {
    return post(`/thePublicGuide/add`, data)
  },
  getthePublicGuideDelete: id => {
    return get(`/thePublicGuide/delete/${id}`)
  },
  getthePublicGuideDetail: id => {
    return get(`/thePublicGuide/get/${id}`)
  },
  getthePublicGuidePublic: data => {
    return post(`/thePublicGuide/issue`, data)
  },
  getthePublicGuideSet: data => {
    return post(`/thePublicGuide/setTop`, data)
  },
  getthePublicGuideUpdate: data => {
    return post(`/thePublicGuide/update`, data)
  }
}
