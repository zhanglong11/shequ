import shell from '@/utils/shell'
export default {
  path: 'plan-birth',
  name: 'PlanBirth',
  component: shell('PlanBirth', true),
  meta: { title: '计生', cache: true },
  children: [
    {
      path: 'person',
      name: 'PlanBirthPerson',
      component: () => import('../planBirth/person'),
      meta: {
        title: '重点人员管理'
      }
    },
    {
      path: 'person-add',
      name: 'PlanBirthPersonAdd',
      component: () => window.rename(import('../planBirth/person/add'), 'PlanBirthPersonAdd'),
      hidden: true,
      meta: {
        title: '添加重点人员',
        cache: true,
        activeMenu: '/gov-affairs/plan-birth/person'
      }
    },
    {
      path: 'person-edit/:id',
      name: 'PlanBirthPersonEdit',
      component: () => window.rename(import('../planBirth/person/add'), 'PlanBirthPersonEdit'),
      hidden: true,
      meta: {
        title: '编辑重点人员',
        cache: true,
        activeMenu: '/gov-affairs/plan-birth/person'
      }
    },
    {
      path: 'person-detail/:id',
      name: 'PlanBirthPersonDetail',
      component: () => import('../planBirth/person/detail'),
      hidden: true,
      meta: {
        title: '重点人员详情',
        activeMenu: '/gov-affairs/plan-birth/person'
      }
    },
    {
      path: 'notice',
      name: 'PlanBirthNotice',
      component: () => import('../planBirth/notice'),
      meta: {
        title: '通知公告',
        activeMenu: '/gov-affairs/plan-birth/notice'
      }
    },
    {
      path: 'notice-add',
      name: 'PlanBirthNoticeAdd',
      component: () => window.rename(import('../planBirth/notice/add'), 'PlanBirthNoticeAdd'),
      hidden: true,
      meta: {
        title: '添加通知公告',
        cache: true,
        activeMenu: '/gov-affairs/plan-birth/notice'
      }
    },
    {
      path: 'notice-edit/:id',
      name: 'PlanBirthNoticeEdit',
      component: () => window.rename(import('../planBirth/notice/add'), 'PlanBirthNoticeEdit'),
      hidden: true,
      meta: {
        title: '编辑通知公告',
        cache: true,
        activeMenu: '/gov-affairs/plan-birth/notice'
      }
    },
    {
      path: 'notice-detail/:id',
      name: 'PlanBirthNoticeDetail',
      component: () => import('../planBirth/notice/detail'),
      hidden: true,
      meta: {
        title: '通知公告详情',
        activeMenu: '/gov-affairs/plan-birth/notice'
      }
    },
    {
      path: 'doc',
      name: 'PlanBirthDoc',
      component: () => import('../planBirth/doc'),
      meta: {
        title: '文档管理'
      }
    }
  ]
}
