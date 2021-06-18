import { admin } from '@/plugins/axios'

/**
 * 网格-空间管理-新增区域 @author yangjiaqi
 * @param {Object} body
 */
export function createRegion(body = {}) {
  return admin.post(`grid/space/region/add`, body)
}
/**
 * 网格-空间管理-编辑区域-建筑 @author yangjiaqi
 * @param {Object} body
 */
export function updateRegionOrBuilding(body = {}) {
  return admin.post(`grid/space/building/update`, body)
}

/**
 * 网格-空间管理-删除区域-建筑 @author yangjiaqi
 * @param {String} id id
 */
export function removeRegionOrBuildingById(id) {
  return admin.get(`grid/space/building/delete/${id}`)
}
/**
 * 网格-空间管理-新增建筑 @author yangjiaqi
 * @param {Object} body
 */
export function createBuild(body = {}) {
  return admin.post(`grid/space/build/add`, body)
}

/**
 * 网格-空间管理-建筑详情 @author yangjiaqi
 * @param {String} id id
 */
export function getBuildingById(id) {
  return admin.get(`grid/space/building/get/${id}`)
}

/**
 * 网格-空间管理-建筑详情，包含里面的楼层和房间信息 @author yangjiaqi
 * @param {Object} body
 */
export function getBuildingDetail(body = {}) {
  return admin.post(`grid/space/building/form/list`, body)
}

/**
 * 网格-空间管理-删除建筑结构（单元-楼） @author yangjiaqi
 * @param {String} id id
 */
export function removeFormById(id) {
  return admin.get(`grid/space/building/form/delete/${id}`)
}

/**
 * 网格-空间管理-编辑建筑结构（单元-楼） @author yangjiaqi
 * @param {Object} body
 */
export function updateForm(body = {}) {
  return admin.post(`grid/space/building/form/update`, body)
}
