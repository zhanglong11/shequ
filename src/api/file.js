import { file } from '@/plugins/axios'

/**
 * 公用文件接口(上传、下载、预览等)-根据fileIds批量获取file地址 @author yangjiaqi
 * @param {Array} ids ids
 */
export function getFileUrlByIds(ids) {
  return file.post(`/noToken/file/commonFile/listByIds`, ids)
}

/**
 * 公用文件接口(上传、下载、预览等)-上传文件 @author
 */
export function upload(data) {
  return file.post(`/file/commonFile/upload`, data, { 'Content-Type': 'multipart/form-data' })
}
