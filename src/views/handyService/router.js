import Layout from '@/layout'
export default {
  path: '/handyService',
  name: 'HandyService',
  component: Layout,
  meta: { title: '便民服务', icon: 'handyService' },
  alwaysShow: true,
  children: [
    {
      path: 'businessInfo',
      name: 'BusinessInfo',
      component: () => import('./businessInfo/index'),
      meta: { title: '商户信息' }
    },
    {
      path: 'businessInfoAdd',
      name: 'BusinessInfoAdd',
      component: () => window.rename(import('./businessInfo/businessInfoEdit'), 'BusinessInfoAdd'),
      hidden: true,
      meta: { title: '新建商户', cache: true, activeMenu: '/handyService/businessInfo' }
    },
    {
      path: 'businessInfoEdit/:id',
      name: 'BusinessInfoEdit',
      component: () => window.rename(import('./businessInfo/businessInfoEdit'), 'BusinessInfoEdit'),
      hidden: true,
      meta: { title: '编辑商户', cache: true, activeMenu: '/handyService/businessInfo' }
    },
    {
      path: 'businessInfoDetail/:id',
      name: 'BusinessInfoDetail',
      component: () => import('./businessInfo/businessInfoDetail'),
      hidden: true,
      meta: { title: '商户详情', activeMenu: '/handyService/businessInfo' }
    },
    {
      path: 'businessComplaint',
      name: 'BusinessComplaint',
      component: () => import('./businessComplaint/index'),
      meta: { title: '投诉申诉' }
    },
    {
      path: 'businessComplaintDetail/:id',
      name: 'BusinessComplaintDetail',
      component: () => import('./businessComplaint/businessComplaintDetail'),
      hidden: true,
      meta: { title: '投诉申诉详情', activeMenu: '/handyService/businessComplaint' }
    },
    {
      path: 'businessPoint',
      name: 'BusinessPoint',
      component: () => import('./businessPoint/index'),
      meta: { title: '商户积分' }
    },
    {
      path: 'businessPointDetail/:id',
      name: 'BusinessPointDetail',
      component: () => import('./businessPoint/businessPointDetail'),
      hidden: true,
      meta: { title: '商户积分详情', activeMenu: '/handyService/businessPoint' }
    },
    {
      path: 'businessGrade',
      name: 'BusinessGrade',
      component: () => import('./businessGrade/index'),
      meta: { title: '商户评级' }
    }
  ]
}
