import shell from '@/utils/shell'
export default {
  path: 'property',
  name: 'Property',
  component: shell('Property', true),
  meta: { title: '物业', cache: true },
  children: [
    {
      path: 'organization',
      name: 'PropertyOrganization',
      component: () => import('../property/organization'),
      meta: {
        title: '物业组织'
      }
    },
    {
      path: 'organization-add',
      name: 'PropertyOrganizationAdd',
      component: () => window.rename(import('../property/organization/add'), 'PropertyOrganizationAdd'),
      hidden: true,
      meta: {
        title: '添加物业组织',
        cache: true,
        activeMenu: '/gov-affairs/property/organization'
      }
    },
    {
      path: 'organization-edit/:id',
      name: 'PropertyOrganizationEdit',
      component: () => window.rename(import('../property/organization/add'), 'PropertyOrganizationEdit'),
      hidden: true,
      meta: {
        title: '编辑物业组织',
        cache: true,
        activeMenu: '/gov-affairs/property/organization'
      }
    },
    {
      path: 'organization-detail/:id',
      name: 'PropertyOrganizationDetail',
      component: () => import('../property/organization/detail'),
      hidden: true,
      meta: {
        title: '物业组织详情',
        activeMenu: '/gov-affairs/property/organization'
      }
    },
    {
      path: 'appeal',
      name: 'PropertyAppeal',
      component: () => import('../property/appeal'),
      meta: {
        title: '投诉申诉'
      }
    },
    {
      path: 'appeal-detail/:id',
      name: 'PropertyAppealDetail',
      component: () => import('../property/appeal/detail'),
      hidden: true,
      meta: {
        title: '投诉申诉详情',
        activeMenu: '/gov-affairs/property/appeal'
      }
    },
    {
      path: 'patrol',
      name: 'PropertyPatrol',
      component: () => import('../property/patrol'),
      meta: {
        title: '物业巡查'
      }
    },
    {
      path: 'patrol-detail/:id',
      name: 'PropertyPatrolDetail',
      component: () => import('../property/patrol/detail'),
      hidden: true,
      meta: {
        title: '物业巡查详情',
        activeMenu: '/gov-affairs/property/patrol'
      }
    },
    {
      path: 'integral',
      name: 'PropertyIntegral',
      component: () => import('../property/integral'),
      meta: {
        title: '物业积分'
      }
    },
    {
      path: 'integral-detail/:id',
      name: 'PropertyIntegralDetail',
      component: () => import('../property/integral/detail'),
      hidden: true,
      meta: {
        title: '物业积分详情',
        activeMenu: '/gov-affairs/property/integral'
      }
    },
    {
      path: 'level',
      name: 'PropertyLevel',
      component: () => import('../property/level'),
      meta: {
        title: '物业评级'
      }
    },
    {
      path: 'notice',
      name: 'PropertyNotice',
      component: () => import('../property/notice'),
      meta: {
        title: '通知公告'
      }
    },
    {
      path: 'notice-add',
      name: 'PropertyNoticeAdd',
      component: () => window.rename(import('../property/notice/add'), 'PropertyNoticeAdd'),
      hidden: true,
      meta: {
        title: '添加通知公告',
        cache: true,
        activeMenu: '/gov-affairs/property/notice'
      }
    },
    {
      path: 'notice-edit/:id',
      name: 'PropertyNoticeEdit',
      component: () => window.rename(import('../property/notice/add'), 'PropertyNoticeEdit'),
      hidden: true,
      meta: {
        title: '编辑通知公告',
        cache: true,
        activeMenu: '/gov-affairs/property/notice'
      }
    },
    {
      path: 'notice-detail/:id',
      name: 'PropertyNoticeDetail',
      component: () => import('../property/notice/detail'),
      hidden: true,
      meta: {
        title: '通知公告详情',
        activeMenu: '/gov-affairs/property/notice'
      }
    },
    {
      path: 'doc',
      name: 'PropertyDoc',
      component: () => import('../property/doc'),
      meta: {
        title: '文档管理'
      }
    }
  ]
}
