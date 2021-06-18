const routes = {
  path: '/bigScreen',
  name: 'BigScreen',
  // hidden: true,
  component: () => import('./index'),
  meta: { title: '社区大屏', icon: 'system' },
  redirect: '/bigScreen/home',
  children: [
    {
      path: 'home',
      name: 'BigScreenHome',
      component: () => import('./home'),
      meta: {
        title: '网格全景'
      }
    },
    {
      path: 'ccp',
      name: 'BigScreenCcp',
      component: () => import('./ccp'),
      meta: {
        title: '智慧党建'
      }
    },
    {
      path: 'govAffairs',
      name: 'BigScreenGovAffairs',
      component: () => import('./govAffairs'),
      meta: {
        title: '智慧政务'
      }
    },
    {
      path: 'epidemicControl',
      name: 'BigScreenEpidemicControl',
      component: () => import('./epidemicControl'),
      meta: {
        title: '疫情防控'
      }
    },
    {
      path: 'handyService',
      name: 'BigScreenHandyService',
      component: () => import('./handyService'),
      meta: {
        title: '综合服务'
      }
    },
    {
      path: 'talent',
      name: 'BigScreenTalent',
      component: () => import('./talent'),
      meta: {
        title: '社区风采'
      }
    }
  ]
}
export default routes
