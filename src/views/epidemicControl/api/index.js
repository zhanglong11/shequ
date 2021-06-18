import { admin } from '@/plugins/axios'
const { get, post } = admin

export default {
  // 巡查列表
  getList: data => {
    return post('/epidemic/situation/patrol/list', data)
  },
  add: data => {
    return post('/epidemic/situation/patrol/add', data)
  },
  update: data => {
    return post('/epidemic/situation/patrol/update', data)
  },
  deleteById: id => {
    return get(`/epidemic/situation/patrol/delete/${id}`, {})
  }
}
