import shell from '@/utils/shell'
export default {
  path: 'composite-govern',
  name: 'CompositeGovern',
  component: shell('CompositeGovern', true),
  meta: { title: '综合治理', cache: true },
  children: [
    {
      path: 'person',
      name: 'CompositeGovernPerson',
      component: () => import('../compositeGovern/person'),
      meta: {
        title: '重点人员管理'
      }
    },
    {
      path: 'person-add',
      name: 'CompositeGovernPersonAdd',
      component: () => window.rename(import('../compositeGovern/person/add'), 'CompositeGovernPersonAdd'),
      hidden: true,
      meta: {
        title: '添加重点人员',
        cache: true,
        activeMenu: '/gov-affairs/composite-govern/person'
      }
    },
    {
      path: 'person-edit/:id',
      name: 'CompositeGovernPersonEdit',
      component: () => window.rename(import('../compositeGovern/person/add'), 'CompositeGovernPersonEdit'),
      hidden: true,
      meta: {
        title: '编辑重点人员',
        cache: true,
        activeMenu: '/gov-affairs/composite-govern/person'
      }
    },
    {
      path: 'person-detail/:id',
      name: 'CompositeGovernPersonDetail',
      component: () => import('../compositeGovern/person/detail'),
      hidden: true,
      meta: {
        title: '重点人员详情',
        activeMenu: '/gov-affairs/composite-govern/person'
      }
    },
    {
      path: 'area',
      name: 'CompositeGovernArea',
      component: () => import('../compositeGovern/area'),
      meta: {
        title: '重点区域'
      }
    },
    {
      path: 'area-add',
      name: 'CompositeGovernAreaAdd',
      hidden: true,
      component: () => window.rename(import('../compositeGovern/area/add'), 'CompositeGovernAreaAdd'),
      meta: {
        title: '添加重点区域',
        cache: true,
        activeMenu: '/gov-affairs/composite-govern/area'
      }
    },
    {
      path: 'area-edit/:id',
      name: 'CompositeGovernAreaEdit',
      hidden: true,
      component: () => window.rename(import('../compositeGovern/area/add'), 'CompositeGovernAreaEdit'),
      meta: {
        title: '编辑重点区域',
        cache: true,
        activeMenu: '/gov-affairs/composite-govern/area'
      }
    },
    {
      path: 'area-detail/:id',
      name: 'CompositeGovernAreaDetail',
      hidden: true,
      component: () => import('../compositeGovern/area/detail'),
      meta: {
        title: '重点区域详情',
        activeMenu: '/gov-affairs/composite-govern/area'
      }
    },
    {
      path: 'event',
      name: 'CompositeGovernEvent',
      component: () => import('../compositeGovern/event'),
      meta: {
        title: '事件'
      }
    },
    {
      path: 'event-add',
      name: 'CompositeGovernEventAdd',
      hidden: true,
      component: () => window.rename(import('../compositeGovern/event/add'), 'CompositeGovernEventAdd'),
      meta: {
        title: '添加事件',
        cache: true,
        activeMenu: '/gov-affairs/composite-govern/event'
      }
    },
    {
      path: 'event-edit/:id',
      name: 'CompositeGovernEventEdit',
      hidden: true,
      component: () => window.rename(import('../compositeGovern/event/add'), 'CompositeGovernEventEdit'),
      meta: {
        title: '编辑事件',
        cache: true,
        activeMenu: '/gov-affairs/composite-govern/event'
      }
    },
    {
      path: 'event-detail/:id',
      name: 'CompositeGovernEventDetail',
      hidden: true,
      component: () => import('../compositeGovern/event/detail'),
      meta: {
        title: '事件详情',
        activeMenu: '/gov-affairs/composite-govern/event'
      }
    },
    {
      path: 'notice',
      name: 'CompositeGovernNotice',
      component: () => import('../compositeGovern/notice'),
      meta: {
        title: '通知公告',
        activeMenu: '/gov-affairs/composite-govern/notice'
      }
    },
    {
      path: 'notice-add',
      name: 'CompositeGovernNoticeAdd',
      component: () => window.rename(import('../compositeGovern/notice/add'), 'CompositeGovernNoticeAdd'),
      hidden: true,
      meta: {
        title: '添加通知公告',
        cache: true,
        activeMenu: '/gov-affairs/composite-govern/notice'
      }
    },
    {
      path: 'notice-edit/:id',
      name: 'CompositeGovernNoticeEdit',
      component: () => window.rename(import('../compositeGovern/notice/add'), 'CompositeGovernNoticeEdit'),
      hidden: true,
      meta: {
        title: '编辑通知公告',
        activeMenu: '/gov-affairs/composite-govern/notice'
      }
    },
    {
      path: 'notice-detail/:id',
      name: 'CompositeGovernNoticeDetail',
      component: () => import('../compositeGovern/notice/detail'),
      hidden: true,
      meta: {
        title: '通知公告详情',
        activeMenu: '/gov-affairs/composite-govern/notice'
      }
    },
    {
      path: 'doc',
      name: 'CompositeGovernDoc',
      component: () => import('../compositeGovern/doc'),
      meta: {
        title: '文档管理'
      }
    }
  ]
}
