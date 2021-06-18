import shell from '@/utils/shell'
export default {
  path: 'appeal-suggest',
  name: 'AppealSuggest',
  component: shell('AppealSuggest', true),
  meta: { title: '投诉建议' },
  children: [
    {
      path: 'appeal',
      name: 'AppealSuggestAppeal',
      component: () => import('../appealSuggest/appeal'),
      meta: {
        title: '诉求表'
      }
    },
    {
      path: 'suggest',
      name: 'AppealSuggestSuggest',
      component: () => import('../appealSuggest/suggest'),
      meta: {
        title: '意见表'
      }
    }
  ]
}
