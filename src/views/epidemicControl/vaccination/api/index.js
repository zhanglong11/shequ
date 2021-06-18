import { admin } from '@/plugins/axios'
const { post } = admin

export default {
  // 接种列表
  getList: data => {
    return post('/vaccine/list', data)
  },
  add: data => {
    return post('/vaccine/add', data)
  },
  update: data => {
    return post('/vaccine/update', data)
  },
  deleteById: data => {
    return post(`/vaccine/delete`, data)
  }
}
