import { admin } from '@/plugins/axios'

/**
 * 公共人员库信息-分页模糊查询
 * @param {Object} body
 */
export function getCommonPersonLibraryList(body = {}) {
  return admin.post(`commonPersonLibrary/list`, body)
}
