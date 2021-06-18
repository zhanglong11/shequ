import Layout from '@/layout/index'
import compositeGovern from './compositeGovern' // 综合治理
import civilAffairs from './civilAffairs' // 民政
import planBirth from './planBirth' // 计生
import finance from './finance' // 财务
import culturePropaganda from './culturePropaganda' // 文化宣传
import armEquipment from './armEquipment' // 武装部
import property from './property' // 物业
import appealSuggest from './appealSuggest' // 投诉建议
export default {
  path: '/gov-affairs',
  name: 'GovAffairs',
  component: Layout,
  meta: { title: '智慧政务', icon: 'government' },
  children: [
    compositeGovern,
    civilAffairs,
    planBirth,
    finance,
    culturePropaganda,
    armEquipment,
    property,
    appealSuggest
  ]
}
