import { admin } from '@/plugins/axios'

/**
 * 积分银行- 礼品管理 @author zhangshilong-党建活动积分记录   @author zhangshilong
 * @param {Object} body
 */
export function partyScoreList(body = {}) {
  return admin.post(`bankGiftManagement/partyScoreList`, body)
}

/**
 * 积分银行- 礼品管理 @author zhangshilong-社群活动积分记录   @author zhangshilong
 * @param {Object} body
 */
export function associationList(body = {}) {
  return admin.post(`bankGiftManagement/associationList`, body)
}

/**
 * 积分银行- 礼品管理 @author zhangshilong-其他积分记录   @author zhangshilong
 * @param {Object} body
 */
export function otherScoreList(body = {}) {
  return admin.post(`bankGiftManagement/otherScoreList`, body)
}
