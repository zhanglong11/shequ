import { admin } from '@/plugins/axios'

/**
 * 党员学习 @author zhangshilong-列表 @author zhangshilong
 * @param {Object} body
 */
export function getPartyStudyList(body = {}) {
  return admin.post(`partyStudy/list`, body)
}
/**
 * 党员学习 @author zhangshilong-删除 @author zhangshilong
 * @param {String} id id
 */
export function removePartyStudyById(id) {
  return admin.get(`partyStudy/delete/${id}`)
}

/**
 * 党员学习 @author zhangshilong-详情 @author zhangshilong
 * @param {String} id id
 */
export function getPartyStudyById(id) {
  return admin.get(`partyStudy/get/${id}`)
}

/**
 * 党员学习 @author zhangshilong-新增 @author zhangshilong
 * @param {Object} body
 */
export function createPartyStudy(body = {}) {
  return admin.post(`partyStudy/add`, body)
}

/**
 * 党员学习 @author zhangshilong-编辑 @author zhangshilong
 * @param {Object} body
 */
export function updatePartyStudy(body = {}) {
  return admin.post(`partyStudy/update`, body)
}

/**
 * 党员学习 @author zhangshilong-取消发布 @author zhangshilong
 * @param {String} id
 */
export function partyStudCancelPublishById(id) {
  return admin.post(`partyStudy/issue`, {
    publishFlag: 0,
    id
  })
}

/**
 * 党员学习 @author zhangshilong-发布 @author zhangshilong
 * @param {String} id
 */
export function partyStudPublishById(id) {
  return admin.post(`partyStudy/issue`, {
    publishFlag: 1,
    id
  })
}
