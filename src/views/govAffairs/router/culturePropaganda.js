import shell from '@/utils/shell'
export default {
  path: 'culture-propaganda',
  name: 'CulturePropaganda',
  component: shell('CulturePropaganda', true),
  meta: { title: '文化宣传', cache: true },
  children: [
    {
      path: 'person',
      name: 'CulturePropagandaPerson',
      component: () => import('../culturePropaganda/person'),
      meta: {
        title: '重点人员管理'
      }
    },
    {
      path: 'person-add',
      name: 'CulturePropagandaPersonAdd',
      component: () => window.rename(import('../culturePropaganda/person/add'), 'CulturePropagandaPersonAdd'),
      hidden: true,
      meta: {
        title: '添加重点人员',
        cache: true,
        activeMenu: '/gov-affairs/culture-propaganda/person'
      }
    },
    {
      path: 'person-edit/:id',
      name: 'CulturePropagandaPersonEdit',
      component: () => window.rename(import('../culturePropaganda/person/add'), 'CulturePropagandaPersonEdit'),
      hidden: true,
      meta: {
        title: '编辑重点人员',
        cache: true,
        activeMenu: '/gov-affairs/culture-propaganda/person'
      }
    },
    {
      path: 'person-detail/:id',
      name: 'CulturePropagandaPersonDetail',
      component: () => import('../culturePropaganda/person/detail'),
      hidden: true,
      meta: {
        title: '重点人员详情',
        activeMenu: '/gov-affairs/culture-propaganda/person'
      }
    },
    {
      path: 'notice',
      name: 'CulturePropagandaNotice',
      component: () => import('../culturePropaganda/notice'),
      meta: {
        title: '通知公告',
        activeMenu: '/gov-affairs/culture-propaganda/notice'
      }
    },
    {
      path: 'notice-add',
      name: 'CulturePropagandaNoticeAdd',
      component: () => window.rename(import('../culturePropaganda/notice/add'), 'CulturePropagandaNoticeAdd'),
      hidden: true,
      meta: {
        title: '添加通知公告',
        cache: true,
        activeMenu: '/gov-affairs/culture-propaganda/notice'
      }
    },
    {
      path: 'notice-edit/:id',
      name: 'CulturePropagandaNoticeEdit',
      component: () => window.rename(import('../culturePropaganda/notice/add'), 'CulturePropagandaNoticeEdit'),
      hidden: true,
      meta: {
        title: '编辑通知公告',
        cache: true,
        activeMenu: '/gov-affairs/culture-propaganda/notice'
      }
    },
    {
      path: 'notice-detail/:id',
      name: 'CulturePropagandaNoticeDetail',
      component: () => import('../culturePropaganda/notice/detail'),
      hidden: true,
      meta: {
        title: '通知公告详情',
        activeMenu: '/gov-affairs/culture-propaganda/notice'
      }
    },
    {
      path: 'doc',
      name: 'CulturePropagandaDoc',
      component: () => import('../culturePropaganda/doc'),
      meta: {
        title: '文档管理'
      }
    }
  ]
}
