import Layout from '@/layout'
function rename(PromiseComponent, name) {
  return PromiseComponent.then(c => {
    c.default.name = name
    return c
  })
}
export default {
  path: '/association',
  name: 'Association',
  component: Layout,
  meta: { title: '社群活动', icon: 'community' },
  children: [
    {
      path: 'voluntary',
      name: 'VoluntaryList',
      component: () => import('../voluntary'),
      meta: {
        title: '志愿组织'
      }
    },
    {
      path: 'voluntaryAdd',
      name: 'VoluntaryAdd',
      component: () => rename(import('../voluntary/voluntaryAdd.vue'), 'VoluntaryAdd'),
      hidden: true,
      meta: { title: '新建志愿组织', cache: true, activeMenu: '/association/voluntary' }
    },
    {
      path: 'voluntaryEdit',
      name: 'VoluntaryEdit',
      component: () => rename(import('../voluntary/voluntaryAdd.vue'), 'VoluntaryEdit'),
      hidden: true,
      meta: { title: '编辑志愿组织', cache: true, activeMenu: '/association/voluntary' }
    },
    {
      path: 'voluntaryDetail',
      name: 'VoluntaryDetail',
      component: () => import('../voluntary/voluntaryDetail.vue'),
      hidden: true,
      meta: { title: '志愿组织详情', activeMenu: '/association/voluntary' }
    },
    {
      path: 'community',
      name: 'CommunityList',
      component: () => import('../community'),
      meta: {
        title: '社群组织'
      }
    },
    {
      path: 'communityAdd',
      name: 'CommunityAdd',
      component: () => rename(import('../community/communityAdd.vue'), 'CommunityAdd'),
      hidden: true,
      meta: { title: '新建社群组织', cache: true, activeMenu: '/association/community' }
    },
    {
      path: 'communityEdit',
      name: 'CommunityEdit',
      component: () => rename(import('../community/communityAdd.vue'), 'CommunityEdit'),
      hidden: true,
      meta: { title: '编辑社群组织', cache: true, activeMenu: '/association/community' }
    },
    {
      path: 'communityDetail',
      name: 'CommunityDetail',
      component: () => import('../community/communityDetail.vue'),
      hidden: true,
      meta: { title: '社群组织详情', activeMenu: '/association/community' }
    },
    {
      path: 'voluntaryData',
      name: 'VoluntaryActivity',
      component: () => import('../voluntaryData'),
      meta: {
        title: '志愿活动管理'
      }
    },
    {
      path: 'communityData',
      name: 'CommunityActivity',
      component: () => import('../communityData'),
      meta: {
        title: '社群活动管理'
      }
    },
    {
      path: 'grid/resident/:id/detail',
      name: 'GridResidentDetailTwo',
      hidden: true,
      component: () => import('../../grid/resident/detail'),
      meta: {
        title: '居民详情'
      }
    }
  ]
}
