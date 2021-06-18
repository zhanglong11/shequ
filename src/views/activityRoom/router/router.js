import Layout from '@/layout'

export default {
  path: '/activityRoom',
  name: 'ActivityRoom',
  component: Layout,
  meta: { title: '活动室管理', icon: 'huodongshiguanli' },
  children: [
    {
      path: 'activityRoomManage',
      name: 'ActivityRoomManage',
      component: () => import('../activityRoomManage'),
      meta: {
        title: '活动室管理'
      }
    },
    {
      path: 'appointmentRecord',
      name: 'AppointmentRecord',
      component: () => import('../appointmentRecord'),
      meta: {
        title: '活动室预约记录'
      }
    }
    // {
    //   path: 'voluntaryAdd',
    //   name: 'VoluntaryAdd',
    //   component: () => import('../voluntary/voluntaryAdd.vue'),
    //   hidden: true,
    //   meta: { title: '新建志愿组织', activeMenu: '/association/voluntary' }
    // },
    // {
    //   path: 'voluntaryEdit',
    //   name: 'VoluntaryEdit',
    //   component: () => import('../voluntary/voluntaryAdd.vue'),
    //   hidden: true,
    //   meta: { title: '编辑志愿组织', activeMenu: '/association/voluntary' }
    // },
    // {
    //   path: 'voluntaryDetail',
    //   name: 'VoluntaryDetail',
    //   component: () => import('../voluntary/voluntaryDetail.vue'),
    //   hidden: true,
    //   meta: { title: '志愿组织详情', activeMenu: '/association/voluntary' }
    // },
    // {
    //   path: 'communityAdd',
    //   name: 'CommunityAdd',
    //   component: () => import('../community/communityAdd.vue'),
    //   hidden: true,
    //   meta: { title: '新建社群组织', activeMenu: '/association/community' }
    // },
    // {
    //   path: 'communityEdit',
    //   name: 'CommunityEdit',
    //   component: () => import('../community/communityAdd.vue'),
    //   hidden: true,
    //   meta: { title: '编辑社群组织', activeMenu: '/association/community' }
    // },
    // {
    //   path: 'communityDetail',
    //   name: 'CommunityDetail',
    //   component: () => import('../community/communityDetail.vue'),
    //   hidden: true,
    //   meta: { title: '社群组织详情', activeMenu: '/association/community' }
    // },
    // {
    //   path: 'voluntaryData',
    //   name: 'VoluntaryActivity',
    //   component: () => import('../voluntaryData'),
    //   meta: {
    //     title: '志愿活动管理'
    //   }
    // },
    // {
    //   path: 'communityData',
    //   name: 'CommunityActivity',
    //   component: () => import('../communityData'),
    //   meta: {
    //     title: '社群活动管理'
    //   }
    // },
    // {
    //   path: 'grid/resident/:id/detail',
    //   name: 'GridResidentEdit',
    //   hidden: true,
    //   component: () => import('../../grid/resident/detail'),
    //   meta: {
    //     title: '居民详情'
    //   }
    // }
  ]
}
