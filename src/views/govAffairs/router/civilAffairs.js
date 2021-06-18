import shell from '@/utils/shell'
export default {
  path: 'civil-affairs',
  name: 'CivilAffairs',
  component: shell('CivilAffairs', true),
  meta: { title: '民政', cache: true },
  children: [
    {
      path: 'person',
      name: 'CivilAffairsPerson',
      component: () => import('../civilAffairs/person'),
      meta: {
        title: '重点人员管理'
      }
    },
    {
      path: 'person-add',
      name: 'CivilAffairsPersonAdd',
      component: () => window.rename(import('../civilAffairs/person/add'), 'CivilAffairsPersonAdd'),
      hidden: true,
      meta: {
        title: '添加重点人员',
        cache: true,
        activeMenu: '/gov-affairs/civil-affairs/person'
      }
    },
    {
      path: 'person-edit/:id',
      name: 'CivilAffairsPersonEdit',
      component: () => window.rename(import('../civilAffairs/person/add'), 'CivilAffairsPersonEdit'),
      hidden: true,
      meta: {
        title: '编辑重点人员',
        cache: true,
        activeMenu: '/gov-affairs/civil-affairs/person'
      }
    },
    {
      path: 'person-detail/:id',
      name: 'CivilAffairsPersonDetail',
      component: () => import('../civilAffairs/person/detail'),
      hidden: true,
      meta: {
        title: '重点人员详情',
        activeMenu: '/gov-affairs/civil-affairs/person'
      }
    },
    {
      path: 'notice',
      name: 'CivilAffairsNotice',
      component: () => import('../civilAffairs/notice'),
      meta: {
        title: '通知公告',
        activeMenu: '/gov-affairs/civil-affairs/notice'
      }
    },
    {
      path: 'notice-add',
      name: 'CivilAffairsNoticeAdd',
      component: () => window.rename(import('../civilAffairs/notice/add'), 'CivilAffairsNoticeAdd'),
      hidden: true,
      meta: {
        title: '添加通知公告',
        cache: true,
        activeMenu: '/gov-affairs/civil-affairs/notice'
      }
    },
    {
      path: 'notice-edit/:id',
      name: 'CivilAffairsNoticeEdit',
      component: () => window.rename(import('../civilAffairs/notice/add'), 'CivilAffairsNoticeEdit'),
      hidden: true,
      meta: {
        title: '编辑通知公告',
        cache: true,
        activeMenu: '/gov-affairs/civil-affairs/notice'
      }
    },
    {
      path: 'notice-detail/:id',
      name: 'CivilAffairsNoticeDetail',
      component: () => import('../civilAffairs/notice/detail'),
      hidden: true,
      meta: {
        title: '通知公告详情',
        activeMenu: '/gov-affairs/civil-affairs/notice'
      }
    },
    {
      path: 'doc',
      name: 'CivilAffairsDoc',
      component: () => import('../civilAffairs/doc'),
      meta: {
        title: '文档管理'
      }
    }
  ]
}
