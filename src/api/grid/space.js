import { admin } from '@/plugins/axios'

/**
 * 网格-房间管理-树结构（带房间） @author yangjiaqi
 */
export function getCommunityWithRoomTree() {
  return admin.post(`grid/space/room/tree`)
}

/**
 * 网格-房间管理-新增 @author yangjiaqi
 * @param {Object} body
 */
export function createRoom(body = {}) {
  return admin.post(`grid/space/room/add`, body)
}

/**
 * 网格-房间管理-删除 @author yangjiaqi
 * @param {String} id id
 */
export function removeRoomById(id) {
  return admin.get(`grid/space/room/delete/${id}`)
}

/**
 * 网格-房间管理-详情 @author yangjiaqi
 * @param {String} id id
 */
export function getRoomById(id) {
  return admin.get(`grid/space/room/get/${id}`)
}

/**
 * 网格-房间管理-编辑 @author yangjiaqi
 * @param {Object} body
 */
export function updateRoom(body = {}) {
  return admin.post(`grid/space/room/update`, body)
}

/**
 * 网格-房间管理-房屋数量信息 @author yangjiaqi
 */
export function getSpaceRoomCount() {
  return admin.get(`/grid/space/room/count`)
}

/**
 * bim绑定 @author yangjiaqi
 */
// export function bimBindRoom(body = {}) {
//   return admin.post(`/grid/space/room/bim/bind`, body)
// }

export function bimBindRoom(body = {}) {
  return admin.post(`/grid/room/bim/bind`, body)
}

/**
 * bim解绑 @author yangjiaqi
 */
// export function bimUnbindRoom(id) {
//   return admin.get(`/grid/space/room/bim/unbind/${id}`)
// }

export function bimUnbindRoom(id) {
  return admin.get(`/grid/room/bim/unbind/${id}`)
}

export function watchBindRoom(id) {
  return admin.get(`/grid/room/bim/get/${id}`)
}
