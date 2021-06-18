import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { isDev } from '@/utils'
const timeout = 30000
export const baseUrl = '/wisdom-community-admin'
export const filePreviewUrl = '/wisdom-community-file'
export const fileUploadUrl = '/wisdom-community-file/file/commonFile/upload'
export const getImgUrl = id => '/wisdom-community-file/noToken/file/commonFile/onlinePreview/' + id
export const admin = create(baseUrl)
const system = create(baseUrl)
export const file = create('/wisdom-community-file')
export const workflow = create('/wisdom-community-oa')

export const server = {
  system
}

export default axios

function create(baseURL) {
  const instance = axios.create({
    baseURL,
    timeout
  })
  addInterceptor(instance)
  return instance
}
function addInterceptor(service) {
  // request interceptor
  service.interceptors.request.use(
    config => {
      // do something before request is sent
      if (store.getters.token) {
        // let each request carry token
        // ['X-Token'] is a custom headers key
        // please modify it according to the actual situation
        config.headers['x-access-token'] = getToken()
      }
      return config
    },
    error => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    }
  )

  // response interceptor
  service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
      if (
        response.config.responseType === 'blob' ||
        response.config.responseType === 'arraybuffer' ||
        response.config.type === 'noHold'
      ) {
        return response
      }
      if (response.config.url.indexOf('.json') > -1 && response.data instanceof Array) {
        return response.data
      }

      // if the custom code is not 20000, it is judged as an error.
      if (response.status === 200 && !response.data) {
        return errorHandler('status: 200 服务器没有返回任何响应')
      } else if (response.data.code === 1000) {
        const message = response.data.message || response.data.msg || 'Error'
        store.dispatch('user/logout')
        return Promise.reject(new Error(message))
      } else if (!response.data.success && response.data.code !== 200) {
        const message = response.data.message || response.data.msg || 'Error'
        Message({
          message,
          type: 'error',
          duration: 2 * 1000
        })
        return Promise.reject(new Error(message))
      } else {
        return response.data
      }
    },
    error => {
      if (error.message === 'abort') {
        return errorHandler('取消上传')
      }
      return errorHandler(
        'status: ' + _.get(error, 'response.status') + ' ' + error.message || _.get(error, 'response.data.message')
      )
    }
  )
}

/**
 * 弹出错误提示,生产环境只提示服务重启或者维护中，请稍后重试
 * @param message
 */
function errorHandler(message) {
  Message({
    message: isDev ? message : '服务重启或者维护中，请稍后重试',
    type: 'error',
    duration: 2 * 1000
  })
  return Promise.reject(new Error(message))
}
