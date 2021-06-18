import Layout from '@/layout'
function rename(PromiseComponent, name) {
  return PromiseComponent.then(c => {
    c.default.name = name
    return c
  })
}
export default {
  path: '/talent',
  name: 'Talent',
  component: Layout,
  meta: { title: '社区风采', icon: 'shequfengcai' },
  children: [
    {
      path: 'talentManage',
      name: 'TalentManage',
      component: () => import('./talentManage/index.vue'),
      meta: { title: '社区风采' }
    },
    {
      path: 'talentDetail/:id',
      name: 'TalentDetail',
      hidden: true,
      component: () => import('./talentManage/talentDetail.vue'),
      meta: { title: '详情', activeMenu: '/talent/talentManage' }
    },
    {
      path: 'talentAdd',
      name: 'TalentAdd',
      component: () => rename(import('./talentManage/talentEdit.vue'), 'TalentAdd'),
      hidden: true,
      meta: { title: '新建', cache: true, activeMenu: '/talent/talentManage' }
    },
    {
      path: 'talentEdit/:id',
      name: 'TalentEdit',
      component: () => rename(import('./talentManage/talentEdit.vue'), 'TalentEdit'),
      hidden: true,
      meta: { title: '编辑', cache: true, activeMenu: '/talent/talentManage' }
    }
  ]
}
