import shell from '@/utils/shell'
export default {
  path: 'finance',
  name: 'Finance',
  component: shell('Finance', true),
  meta: { title: '财务', cache: true },
  children: [
    {
      path: 'person',
      name: 'FinancePerson',
      hidden: true,
      component: () => import('../finance/person'),
      meta: {
        title: '重点人员管理'
      }
    },
    {
      path: 'person-add',
      name: 'FinancePersonAdd',
      component: () => import('../finance/person/add'),
      hidden: true,
      meta: {
        title: '添加重点人员',
        activeMenu: '/gov-affairs/finance/person'
      }
    },
    {
      path: 'person-edit/:id',
      name: 'FinancePersonEdit',
      component: () => import('../finance/person/add'),
      hidden: true,
      meta: {
        title: '编辑重点人员',
        activeMenu: '/gov-affairs/finance/person'
      }
    },
    {
      path: 'person-detail/:id',
      name: 'FinancePersonDetail',
      component: () => import('../finance/person/detail'),
      hidden: true,
      meta: {
        title: '重点人员详情',
        activeMenu: '/gov-affairs/finance/person'
      }
    },
    {
      path: 'notice',
      name: 'FinanceNotice',
      component: () => import('../finance/notice'),
      meta: {
        title: '通知公告',
        activeMenu: '/gov-affairs/finance/notice'
      }
    },
    {
      path: 'notice-add',
      name: 'FinanceNoticeAdd',
      component: () => window.rename(import('../finance/notice/add'), 'FinanceNoticeAdd'),
      hidden: true,
      meta: {
        title: '添加通知公告',
        cache: true,
        activeMenu: '/gov-affairs/finance/notice'
      }
    },
    {
      path: 'notice-edit/:id',
      name: 'FinanceNoticeEdit',
      component: () => window.rename(import('../finance/notice/add'), 'FinanceNoticeEdit'),
      hidden: true,
      meta: {
        title: '编辑通知公告',
        cache: true,
        activeMenu: '/gov-affairs/finance/notice'
      }
    },
    {
      path: 'notice-detail/:id',
      name: 'FinanceNoticeDetail',
      component: () => import('../finance/notice/detail'),
      hidden: true,
      meta: {
        title: '通知公告详情',
        activeMenu: '/gov-affairs/finance/notice'
      }
    },
    {
      path: 'doc',
      name: 'FinanceDoc',
      component: () => import('../finance/doc'),
      meta: {
        title: '文档管理'
      }
    }
  ]
}
