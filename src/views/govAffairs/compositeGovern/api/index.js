import { admin } from '@/plugins/axios'
const { get, post } = admin

export default {
  // 区域
  // 区域列表
  getAreaList: data => {
    return post('/government/keyRegion/list', data)
  },
  // 详情
  getAreaDetail: id => {
    return get(`/government/keyRegion/get/${id}`, {})
  },
  addArea: data => {
    return post('/government/keyRegion/add', data)
  },
  updateArea: data => {
    return post('/government/keyRegion/update', data)
  },
  deleteAreaById: id => {
    return get(`/government/keyRegion/delete/${id}`, {})
  },
  // 事件
  getEventList: data => {
    return post('/government/incident/list', data)
  },
  // 详情
  getEventDetail: id => {
    return get(`/government/incident/get/${id}`, {})
  },
  addEvent: data => {
    return post('/government/incident/add', data)
  },
  updateEvent: data => {
    return post('/government/incident/update', data)
  },
  deleteEventById: id => {
    return get(`/government/incident/delete/${id}`, {})
  }
}
