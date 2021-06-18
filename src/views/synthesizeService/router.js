import Layout from '@/layout'
export default {
  path: '/synthesizeService',
  name: 'SynthesizeService',
  component: Layout,
  meta: { title: '综合服务', icon: 'synthesizeService' },
  alwaysShow: true,
  children: [
    {
      path: 'serviceInfo',
      name: 'ServiceInfo',
      component: () => import('./serviceInfo/index'),
      meta: { title: '便民服务' }
    },
    {
      path: 'serviceRankings',
      name: 'ServiceRankings',
      component: () => import('./serviceRankings/index'),
      meta: { title: '便民服务满意度排行' }
    }
  ]
}
