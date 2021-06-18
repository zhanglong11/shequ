import Layout from '@/layout'
export default {
  path: '/pointsBank',
  name: 'PointsBank',
  component: Layout,
  meta: { title: '积分银行', icon: 'points' },
  children: [
    {
      path: 'giftManage',
      name: 'GiftManage',
      component: () => import('./giftManage/index.vue'),
      meta: { title: '礼品管理' }
    },
    {
      path: 'giftManage/:id',
      name: 'GiftManageDetail',
      component: () => import('./giftManage/detail.vue'),
      hidden: true,
      meta: { title: '礼品详情', activeMenu: '/pointsBank/giftManage' }
    },
    {
      path: 'pointsChangeLogs',
      name: 'PointsChangeLogs',
      component: () => import('./pointsChangeLogs/index.vue'),
      meta: { title: '积分兑换记录' }
    },
    {
      path: 'deliveryLogs',
      name: 'DeliveryLogs',
      component: () => import('./deliveryLogs/index.vue'),
      meta: { title: '出库记录' }
    },
    {
      path: 'rank',
      name: 'Rank',
      component: () => import('./rank/index.vue'),
      meta: { title: '积分管理' }
    },
    {
      path: 'rankDetail/:identityCardNumber',
      name: 'RankDetail',
      hidden: true,
      component: () => import('./rank/rankDetail.vue'),
      meta: { title: '积分详情', activeMenu: '/rank/rankDetail' }
    }
  ]
}
