import Layout from '@/layout'
function rename(PromiseComponent, name) {
  return PromiseComponent.then(c => {
    c.default.name = name
    return c
  })
}
export default {
  path: '/official',
  name: 'Official',
  component: Layout,
  meta: { title: '公众号管理', icon: 'wechart' },
  children: [
    {
      path: 'notice',
      name: 'NoticeManage',
      component: () => import('./notice/index.vue'),
      meta: { title: '通知公告' }
    },
    {
      path: 'notice/Detail/:id',
      name: 'NoticeDetail',
      component: () => import('./notice/Detail.vue'),
      hidden: true,
      meta: { title: '公告详情', activeMenu: '/official/notice' }
    },
    {
      path: 'vote',
      name: 'VoteManage',
      component: () => import('./vote/index.vue'),
      meta: { title: '投票管理' }
    },
    {
      path: 'Detail',
      name: 'VoteDetail',
      hidden: true,
      component: () => import('./vote/Detail.vue'),
      meta: { title: '投票详情', activeMenu: '/official/vote' }
    },
    {
      path: 'questionnaire',
      name: 'QuestionnaireManage',
      component: () => import('./questionnaire/index.vue'),
      meta: { title: '问卷调查' }
    },
    {
      path: 'questionnaireAdd',
      name: 'QuestionnaireAdd',
      component: () => rename(import('./questionnaire/Edit.vue'), 'QuestionnaireAdd'),
      hidden: true,
      meta: { title: '新增问卷', cache: true, activeMenu: '/official/questionnaire' }
    },
    {
      path: 'questionnaireUpdate/:id',
      name: 'QuestionnaireUpdate',
      component: () => rename(import('./questionnaire/Edit.vue'), 'QuestionnaireUpdate'),
      hidden: true,
      meta: { title: '编辑问卷', cache: true, activeMenu: '/official/questionnaire' }
    },
    {
      path: 'questionnDetail/:id',
      name: 'QuestionnDetail',
      hidden: true,
      component: () => import('./questionnaire/Detail.vue'),
      meta: { title: '问卷详情', activeMenu: '/official/questionnaire' }
    },
    {
      path: 'goods',
      name: 'GoodsManage',
      component: () => import('./goods/index'),
      meta: { title: '物品交换' }
    },
    {
      path: 'goodsDetail',
      name: 'GoodsDetail',
      hidden: true,
      component: () => import('./goods/Detail.vue'),
      meta: { title: '物品详情', activeMenu: '/official/goods' }
    },
    {
      path: 'guidance',
      name: 'GuidanceManage',
      component: () => import('./guidance/index.vue'),
      meta: { title: '办事指南' }
    },
    {
      path: 'guidanceDetail/:id',
      name: 'GuidanceDetail',
      hidden: true,
      component: () => import('./guidance/guidanceDetail.vue'),
      meta: { title: '详情', activeMenu: '/official/guidance' }
    },
    {
      path: 'guidanceAdd',
      name: 'GuidanceAdd',
      component: () => rename(import('./guidance/guidanceEdit.vue'), 'GuidanceAdd'),
      hidden: true,
      meta: { title: '新建', cache: true, activeMenu: '/official/guidance' }
    },
    {
      path: 'guidanceEdit/:id',
      name: 'GuidanceEdit',
      component: () => rename(import('./guidance/guidanceEdit.vue'), 'GuidanceEdit'),
      hidden: true,
      meta: { title: '编辑', cache: true, activeMenu: '/official/guidance' }
    }
  ]
}
