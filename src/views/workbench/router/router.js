import Layout from '@/layout'
import ProjectOARouter from '../projectOA/router'

export default {
  path: '/workbench',
  name: 'Workbench',
  component: Layout,
  meta: { title: '工作台', icon: 'workbench' },
  redirect: '/workbench/meetingManage',
  children: [
    {
      path: 'meetingManage',
      name: 'MeetingManage',
      component: () => import('../meetingManage'),
      meta: {
        title: '会议管理'
      }
    },
    ...ProjectOARouter
  ]
}
