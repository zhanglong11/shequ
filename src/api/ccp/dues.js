import { admin } from '@/plugins/axios'

/**
 * 党费缴纳 @author zhangshilong-列表 @author zhangshilong
 * @param {Object} body
 */
export function getPartyPaymentList(body = {}) {
  return admin.post(`partyPayment/list`, body)
}
/**
 * 党费缴纳 @author zhangshilong-删除 @author zhangshilong
 * @param {String} id id
 */
export function removePartyPaymentById(id) {
  return admin.get(`partyPayment/delete/${id}`)
}

/**
 * 党费缴纳 @author zhangshilong-详情 @author zhangshilong
 * @param {String} id id
 */
export function getPartyPaymentById(id) {
  return admin.get(`partyPayment/get/${id}`)
}

/**
 * 党费缴纳 @author zhangshilong-新增 @author zhangshilong
 * @param {Object} body
 */
export function createPartyPayment(body = {}) {
  return admin.post(`partyPayment/add`, body)
}
/**
 * 党费缴纳 @author zhangshilong-编辑 @author zhangshilong
 * @param {Object} body
 */
export function updatePartyPayment(body = {}) {
  return admin.post(`partyPayment/update`, body)
}

/**
 * 党费缴纳 @author zhangshilong-获取最新一次缴费记录 @author zhangshilong
 * @param {String} partyMemberId partyMemberId
 */
export function getLastByPartyMemberId(partyMemberId) {
  return admin.get(`partyPayment/getLast/${partyMemberId}`)
}
