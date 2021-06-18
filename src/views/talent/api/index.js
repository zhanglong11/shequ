import { admin } from '@/plugins/axios'
const { post, get } = admin
export default {
  // 列表查询
  getcommunityList: data => {
    return post(`/community/elegantDemeanor/list`, data)
  },
  //
  getcommunityAdd: data => {
    return post(`/community/elegantDemeanor/add`, data)
  },
  // 详情
  getcommunityDetail: id => {
    return get(`/community/elegantDemeanor/get/${id}`)
  },
  getcommunityUpdate: data => {
    return post(`/community/elegantDemeanor/update`, data)
  },
  getcommunityDelete: data => {
    return post(`/community/elegantDemeanor/delete`, data)
  }
}
