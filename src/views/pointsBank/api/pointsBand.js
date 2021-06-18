import { admin } from '@/plugins/axios'

/**
 * 新增礼品
 * @param {Object} body
 */
export function addBandGift(body = {}) {
  return admin.post(`bankGiftManagement/add`, body)
}

/**
 * 新增其他积分
 * @param {Object} body
 */
export function addOtherScore(body = {}) {
  return admin.post(`bankGiftManagement/addOtherScore`, body)
}

/**
 * 新增积分兑换记录
 * @param {Object} body
 */
export function addScoreConvert(body = {}) {
  return admin.post(`bankGiftManagement/addScoreConvert`, body)
}

/**
 * 删除礼品
 * @param {String} id
 */
export function deleteBandGift(id) {
  return admin.get(`bankGiftManagement/delete/${id}`)
}

/**
 * 出库记录列表
 * @param {Object} body
 */
export function deliveryRecordList(body = {}) {
  return admin.post(`bankGiftManagement/deliveryRecordList`, body)
}

/**
 * 详情
 * @param {String} id id
 */
export function getBankGiftManagement(id) {
  return admin.get(`bankGiftManagement/get/${id}`)
}

/**
 * 礼品管理列表
 * @param {Object} body
 */
export function bankGiftManagementList(body = {}) {
  return admin.post(`bankGiftManagement/list`, body)
}

/**
 * 积分兑换-处理
 * @param {Object} body
 */
export function scoreConvertDispose(body = {}) {
  return admin.post(`bankGiftManagement/scoreConvertDispose`, body)
}

/**
 * 积分兑换记录列表
 * @param {Object} body
 */
export function scoreConvertDisposeList(body = {}) {
  return admin.post(`bankGiftManagement/scoreConvertList`, body)
}

/**
 * 积分兑换记录详情
 * @param {String} id
 */
export function getScoreConvertDisposeInfo(id) {
  return admin.get(`bankGiftManagement/scoreConvertDispose/${id}`)
}

/**
 * 积分求和详情
 * @param {String} identityCardNumber
 */
export function getAllDeductScoreList(identityCardNumber) {
  return admin.get(`bankGiftManagement/getDeductScoreList/${identityCardNumber}`)
}

/**
 * 积分排名
 * @param {Object} body
 */
export function scoreRankingList(body = {}) {
  return admin.post(`/bankGiftManagement/scoreRankingList`, body)
}

/**
 * 编辑
 * @param {Object} body
 */
export function updateBankGift(body = {}) {
  return admin.post(`bankGiftManagement/update`, body)
}

/**
 * 党建活动积分记录
 * @param {Object} body
 */
export function getPartyScoreList(body = {}) {
  return admin.post(`bankGiftManagement/partyScoreList`, body)
}

/**
 * 社群活动积分记录
 * @param {Object} body
 */
export function getAssociationList(body = {}) {
  return admin.post(`bankGiftManagement/associationList`, body)
}

/**
 * 其他积分记录
 * @param {Object} body
 */
export function getOtherScoreList(body = {}) {
  return admin.post(`bankGiftManagement/otherScoreList`, body)
}

/**
 * 其他积分记录
 * @param {Object} body
 */
export function getSumScore(body = {}) {
  return admin.post(`bankGiftManagement/getSumScore`, body)
}

/**
 * 扣除积分记录
 * @param {Object} body
 */
export function getDeductScoreList(body = {}) {
  return admin.post(`bankGiftManagement/deductScoreList`, body)
}
