import { admin } from '@/plugins/axios'

/**
 * 党建积分 @author zhangshilong-党建积分列表 @author zhangshilong
 * @param {Object} body
 */
export function getPartyScoreList(body = {}) {
  return admin.post(`partyScore/list`, body)
}
/**
 * 党建积分 @author zhangshilong-详情 @author zhangshilong
 * @param {Object} body
 */
export function getPartyScore(body = {}) {
  return admin.post(`partyScore/get`, body)
}

/**
 * 党建积分 @author zhangshilong-获取积分设置详情 @author zhangshilong
 */
export function getScoreSet() {
  return admin.get(`partyScore/getScoreSet`)
}

/**
 * 党建积分 @author zhangshilong-积分设置 @author zhangshilong
 * @param {Object} body
 */
export function scoreSet(body = {}) {
  return admin.post(`partyScore/scoreSet`, body)
}
