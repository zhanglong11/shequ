import Layout from '@/layout'

export default {
  path: '/epidemic-control',
  name: 'EpidemicControl',
  component: Layout,
  meta: { title: '疫情防控', icon: 'prevention' },
  children: [
    {
      path: 'person',
      name: 'EpidemicControlPerson',
      component: () => import('./person'),
      meta: {
        title: '重点人员管理'
      }
    },
    {
      path: 'person-add',
      name: 'EpidemicControlPersonAdd',
      component: () => window.rename(import('./person/add'), 'EpidemicControlPersonAdd'),
      hidden: true,
      meta: {
        title: '添加重点人员',
        cache: true,
        activeMenu: '/epidemic-control/person'
      }
    },
    {
      path: 'person-edit/:id',
      name: 'EpidemicControlPersonEdit',
      component: () => window.rename(import('./person/add'), 'EpidemicControlPersonEdit'),
      hidden: true,
      meta: {
        title: '编辑重点人员',
        cache: true,
        activeMenu: '/epidemic-control/person'
      }
    },
    {
      path: 'person-detail/:id',
      name: 'EpidemicControlPersonDetail',
      component: () => import('./person/detail'),
      hidden: true,
      meta: {
        title: '重点人员详情',
        activeMenu: '/epidemic-control/person'
      }
    },
    {
      path: 'notice',
      name: 'EpidemicControlNotice',
      component: () => import('./notice'),
      meta: {
        title: '通知公告'
      }
    },
    {
      path: 'notice-add',
      name: 'EpidemicControlNoticeAdd',
      component: () => window.rename(import('./notice/add'), 'EpidemicControlNoticeAdd'),
      hidden: true,
      meta: {
        title: '添加通知公告',
        cache: true,
        activeMenu: '/epidemic-control/notice'
      }
    },
    {
      path: 'notice-edit/:id',
      name: 'EpidemicControlNoticeEdit',
      component: () => window.rename(import('./notice/add'), 'EpidemicControlNoticeEdit'),
      hidden: true,
      meta: {
        title: '编辑通知公告',
        cache: true,
        activeMenu: '/epidemic-control/notice'
      }
    },
    {
      path: 'notice-detail/:id',
      name: 'EpidemicControlNoticeDetail',
      component: () => import('./notice/detail'),
      hidden: true,
      meta: {
        title: '通知公告详情',
        activeMenu: '/epidemic-control/notice'
      }
    },
    {
      path: 'doc',
      name: 'EpidemicControlDoc',
      component: () => import('./doc'),
      meta: {
        title: '文档管理'
      }
    },
    {
      path: 'inspect',
      name: 'EpidemicControlInspect',
      component: () => import('./inspect'),
      meta: {
        title: '巡查管理'
      }
    },
    {
      path: 'vaccination',
      name: 'EpidemicControlVaccination',
      component: () => import('./vaccination'),
      meta: {
        title: '接种管理'
      }
    }
  ]
}
