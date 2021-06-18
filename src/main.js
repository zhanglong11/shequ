import Vue from 'vue'

/**
 工作流组件
 **/
import WorkFlow from '@zgeaw/work-flow'
import '@zgeaw/work-flow/dist/WorkFlow.css'
import '@/styles/index.scss' // global css

import '@/plugins/vxeTable'
import '@/plugins/baiduMap'
import '@/plugins/amap'
import '@/plugins/vuePromiseBtn'
import '@/plugins/iconfont'
import '@/plugins/echarts'
import '@/plugins/elementUI'
import '@/plugins/dayjs'
import '@/plugins/scrollTo'
import '@/plugins/swiper'
import '@/plugins/vueAspectRatio'
import '@/plugins/vueClipboard'
import '@/plugins/antd' // 修复antd 部分指令缺失的bug

import 'minireset.css/minireset.min.css'

import '@/components'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import remove from '@/utils/remove'
import _ from 'lodash'
import { getImgUrl, server } from '@/plugins/axios'
import { sexOptions } from '@/lib/otions'
import formatFileSize from '@/utils/formatFileSize'

import DateRange from '@/components/DateRange'
import { getPcaName } from '@/lib/pca'
import utils from '@/utils'
import JsonExcel from 'vue-json-excel'

Vue.prototype.$remove = remove // 日期选择组件
Vue.component(DateRange.name, DateRange)
Vue.prototype._ = _
window._ = _
Vue.prototype.axios = server
export const getLabel = (options, value) => _.get(_.find(options, { value }), 'label', '-')
// 用于vxe-table的formatter
export const getLabelV = options => ({ cellValue: value }) => _.get(_.find(options, { value }), 'label', '-')
Vue.prototype.$getLabel = getLabel
Vue.prototype.$getLabelV = getLabelV
Vue.prototype.$hasPower = e => {
  if (process.env.NODE_ENV === 'development' && localStorage.getItem('ignorePermissions') === 'true') {
    return true
  } else {
    const list = [...store.state.userPower.power]
    const status = list.includes(e)
    return status
  }
}
Vue.prototype.$back = async () => {
  await store.dispatch('tagsView/delView', router.app.$route)
  router.back()
}
Vue.prototype.$getModelType = name => store.getters.moduleList.find(item => item.argText === name)?.argCode || ''
Vue.filter('ymd', val => (val ? dayjs(val).format('YYYY-MM-DD') : ''))
Vue.filter('ymdhm', val => (val ? dayjs(val).format('YYYY-MM-DD HH:mm') : ''))
Vue.filter('ymdhms', val => (val ? dayjs(val).format('YYYY-MM-DD HH:mm:ss') : ''))
Vue.filter('imgUrl', val => getImgUrl(val))
Vue.filter('sex', val => getLabel(sexOptions, val))
Vue.filter('fileSize', val => formatFileSize(val))
Vue.filter('pcaName', val => (val ? getPcaName(val) : ''))
Vue.config.productionTip = false
Vue.use(WorkFlow)
Vue.prototype.$utils = utils
// window.webGis3D = null // webGis
// eslint-disable-next-line no-unused-vars
const communityApp = new Vue({
  el: '#communityApp',
  router,
  store,
  render: h => h(App)
})

function rename(PromiseComponent, name) {
  return PromiseComponent.then(c => {
    c.default.name = name
    return c
  })
}
Vue.component('DownloadExcel', JsonExcel)
window.rename = rename
window.tk = '2d86c70a6411d4e1e92d19c25963e210'
