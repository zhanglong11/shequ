import { admin, file } from '@/plugins/axios'
const { get, post } = admin

export default {
  person: {
    // 获取人员列表
    getList: data => {
      return post('/common/key/person/list', data)
    },
    // 远程搜索
    getRemoteList: data => {
      return post('/grid/resident/list', data)
    },
    // 人员详情
    getRemotePersonDetail: identityCardNumber => {
      return get(`/grid/resident/getByCard/${identityCardNumber}`, {})
    },
    // 添加人员
    add: data => {
      return post('/common/key/person/add', data)
    },
    // 编辑人员
    update: data => {
      return post('/common/key/person/update', data)
    },
    getListByRoomId: data => {
      return post('/grid/resident/list', data)
    },
    deleteById: id => {
      return get(`/common/key/person/delete/${id}`, {})
    },
    getDetailById: id => {
      return get(`/common/key/person/get/${id}`, {})
    },
    // 获取情况列表
    getSituationList: data => {
      return post('/common/key/person/situation/list', data)
    },
    // 添加情况列表
    addSituation: data => {
      return post('/common/key/person/situation/add', data)
    },
    // 编辑情况列表
    updateSituation: data => {
      return post('/common/key/person/situation/update', data)
    },
    // 删除情况列表
    deleteSituation: id => {
      return get(`/common/key/person/situation/delete/${id}`, {})
    },
    // 获取管理记录列表
    getManageList: data => {
      return post('/common/key/person/management/list', data)
    },
    // 添加管理记录
    addManage: data => {
      return post('/common/key/person/management/add', data)
    },
    // 编辑管理记录
    updateManage: data => {
      return post('/common/key/person/management/update', data)
    },
    // 删除管理记录
    deleteManage: id => {
      return get(`/common/key/person/management/delete/${id}`, {})
    }
  },
  notice: {
    // 获取通知列表
    getList: data => {
      return post('/notification/list', data)
    },
    add: data => {
      return post('/notification/add', data)
    },
    update: data => {
      return post('/notification/update', data)
    },
    addSubmit: data => {
      return post('/notification/addAndSubmit', data)
    },
    deleteById: id => {
      return get(`/notification/delete/${id}`, {})
    },
    getDetailById: id => {
      return get(`/notification/get/${id}`, {})
    },
    // 提交核对
    toSubmitCheck: data => {
      return post(`/notification/submit`, data)
    },
    // 取消发布
    cancelPublic: data => {
      return post(`/notification/cancel`, data)
    },
    // 改变顶置状态
    changeTopStatus: data => {
      return post(`/notification/setTop`, data)
    }
  },
  doc: {
    // 获取文件目录树结构
    getLevelTreeDate: data => {
      return file.post(`/common/document/dirTree`, data)
    },
    // 获取文件列表
    getList: data => {
      return file.post('/common/document/list', data)
    },
    deleteById: id => {
      return file.get(`/common/document/delete/${id}`, {})
    },
    multipleDelete: data => {
      return file.post(`/common/document/batchDelete`, data)
    },
    // 移动
    move: data => {
      return file.post(`/common/document/batchMove`, data)
    },
    // 复制
    copy: data => {
      return file.post(`/common/document/batchCopy`, data)
    },
    // 重命名
    rename: data => {
      return file.post(`/common/document/rename`, data)
    },
    // 添加
    add: data => {
      return file.post(`/common/document/dir/add`, data)
    },
    // 上传文件
    uploadFile: data => {
      return file.post(`/common/document/file/add`, data, { contentType: 'multipart/form-data' })
    },
    download: id => {
      return file.get(`/noToken/common/document/download/${id}`, { responseType: 'blob' })
    },
    // 批量下载
    downloadMultiple: data => {
      return file.post(`/noToken/common/document/batchDownload`, data, { responseType: 'blob' })
    }
  }
}
