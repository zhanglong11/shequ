import Layout from '@/layout'
function rename(PromiseComponent, name) {
  return PromiseComponent.then(c => {
    c.default.name = name
    return c
  })
}
export default {
  path: '/ccp',
  name: 'Ccp',
  component: Layout,
  meta: { title: '智慧党建', icon: 'ccp' },
  children: [
    {
      path: 'department',
      name: 'CcpDepartment',
      component: () => import('./department/index.vue'),
      meta: { title: '党组织管理' }
    },
    {
      path: 'member',
      name: 'CcpMember',
      component: () => import('./member/index.vue'),
      meta: { title: '党员管理' }
    },
    {
      path: 'member/new',
      name: 'CcpMemberCreate',
      hidden: true,
      component: () => rename(import('./member/$id.vue'), 'CcpMemberCreate'),
      meta: { title: '新增党员', activeMenu: '/ccp/member', cache: true }
    },
    {
      path: 'member/:id',
      name: 'CcpMemberEdit',
      hidden: true,
      component: () => rename(import('./member/$id.vue'), 'CcpMemberEdit'),
      meta: { title: '编辑党员', activeMenu: '/ccp/member', cache: true }
    },
    {
      path: 'member/:id/detail',
      name: 'CcpMemberDetail',
      hidden: true,
      component: () => import('./member/detail.vue'),
      meta: { title: '党员详情', activeMenu: '/ccp/member' }
    },
    {
      path: 'activeMember',
      name: 'CcpActiveMember',
      component: () => import('./activeMember/index.vue'),
      meta: { title: '党员发展' }
    },
    {
      path: 'activeMember/new',
      name: 'CcpActiveMemberCreate',
      hidden: true,
      component: () => rename(import('./activeMember/$id.vue'), 'CcpActiveMemberCreate'),
      meta: { title: '新增党员发展', activeMenu: '/ccp/activeMember', cache: true }
    },
    {
      path: 'activeMember/:id',
      name: 'CcpActiveMemberEdit',
      hidden: true,
      component: () => rename(import('./activeMember/$id.vue'), 'CcpActiveMemberEdit'),
      meta: { title: '编辑党员发展', activeMenu: '/ccp/activeMember', cache: true }
    },
    {
      path: 'activeMember/:id/detail',
      name: 'CcpActiveMemberDetail',
      hidden: true,
      component: () => import('./activeMember/detail.vue'),
      meta: { title: '党员发展详情', activeMenu: '/ccp/activeMember' }
    },
    {
      path: 'meeting',
      name: 'CcpMeeting',
      component: () => import('./meeting/index.vue'),
      meta: { title: '会议管理' }
    },
    {
      path: 'activity',
      name: 'CcpActivity',
      component: () => import('./activity/index.vue'),
      meta: { title: '党建活动' }
    },
    {
      path: 'publicity',
      name: 'CcpPublicity',
      component: () => import('./publicity/index.vue'),
      meta: { title: '党建宣传' }
    },
    {
      path: 'publicity/new',
      name: 'CcpPublicityCreate',
      hidden: true,
      component: () => rename(import('./publicity/$id.vue'), 'CcpPublicityCreate'),
      meta: { title: '新建党建宣传', activeMenu: '/ccp/publicity', cache: true }
    },
    {
      path: 'publicity/:id',
      name: 'CcpPublicityEdit',
      hidden: true,
      component: () => rename(import('./publicity/$id.vue'), 'CcpPublicityEdit'),
      meta: { title: '编辑党建宣传', activeMenu: '/ccp/publicity', cache: true }
    },
    {
      path: 'publicity/:id/detail',
      name: 'CcpPublicityDetail',
      hidden: true,
      component: () => import('./publicity/detail.vue'),
      meta: { title: '党建宣传详情', activeMenu: '/ccp/publicity' }
    },
    {
      path: 'study',
      name: 'CcpStudy',
      component: () => import('./study/index.vue'),
      meta: { title: '党员学习' }
    },
    {
      path: 'study/new',
      name: 'CcpStudyCreate',
      hidden: true,
      component: () => rename(import('./study/$id.vue'), 'CcpStudyCreate'),
      meta: { title: '新建党员学习', activeMenu: '/ccp/study', cache: true }
    },
    {
      path: 'study/:id',
      name: 'CcpStudyEdit',
      hidden: true,
      component: () => rename(import('./study/$id.vue'), 'CcpStudyEdit'),
      meta: { title: '编辑党员学习', activeMenu: '/ccp/study', cache: true }
    },
    {
      path: 'study/:id/detail',
      name: 'CcpStudyDetail',
      hidden: true,
      component: () => import('./study/detail.vue'),
      meta: { title: '党员学习详情', activeMenu: '/ccp/study' }
    },
    {
      path: 'dues',
      name: 'CcpDues',
      component: () => import('./dues/index.vue'),
      meta: { title: '党费缴纳' }
    },
    {
      path: 'points',
      name: 'CcpPoints',
      component: () => import('./points/index.vue'),
      meta: { title: '党建积分' }
    },
    {
      path: 'points/:userId/detail',
      name: 'CcpPointsDetail',
      hidden: true,
      component: () => import('./points/detail.vue'),
      meta: { title: '党建积分详情', activeMenu: '/ccp/points' }
    }
  ]
}
