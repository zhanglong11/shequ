import Layout from '@/layout'
export default {
  path: '/personalCenter',
  name: 'personalCenter',
  component: Layout,
  redirect: '/personalCenter/personalSet',
  hidden: true,
  meta: { title: '个人中心' },
  children: [
    {
      path: 'personalSet',
      name: 'PersonalSet',
      component: () => import('./personalSet/index'),
      meta: { title: '个人设置' }
    }
  ]
}
