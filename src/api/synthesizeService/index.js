/**
 * 综合服务API模块
 */
import { admin } from '@/plugins/axios'

export default {
  /* 便民服务 */
  // 综合服务列表
  getConvenientList: data => {
    return admin.post(`/convenient/list`, data)
  },
  // 综合服务列表(不分页)
  getConvenientAllList: data => {
    return admin.post(`/convenient/listAll`, data)
  },
  // 新增综合服务
  addConvenient: data => {
    return admin.post(`/convenient/add`, data)
  },
  // 编辑综合服务
  editConvenient: data => {
    return admin.post(`/convenient/update`, data)
  },
  // 删除综合服务
  deleteConvenient: ids => {
    return admin.post(`/convenient/delete`, ids)
  },

  /* 便民服务满意度排行 */
  // 服务满意度排行列表
  getConvenientRankList: data => {
    return admin.post(`/convenient/rank/list`, data)
  },
  // 新增便民服务排行
  addConvenientRank: data => {
    return admin.post(`/convenient/rank/add`, data)
  },
  // 编辑便民服务排行
  editConvenientRank: data => {
    return admin.post(`/convenient/rank/update`, data)
  },
  // 删除便民服务排行
  deleteConvenientRank: ids => {
    return admin.post(`/convenient/rank/delete`, ids)
  }
}
