// OA管理路由

export default [
  {
    path: 'projectOA',
    name: 'ProjectOA',
    component: () => import('../home'),
    meta: { title: 'OA管理', keepAlive: false }
  },
  {
    path: 'projectOAcustomForm',
    name: 'ProjectOACustomAdd',
    hidden: true,
    component: () => import('../home/customAdd'),
    meta: { title: '发起表单' }
  },
  {
    path: 'customFormAdd',
    name: 'ProjectOACustomFormAdd',
    hidden: true,
    component: () => import('../home/addCustomForm'),
    meta: { title: '新增表单' }
  },
  {
    path: 'customFormEdit',
    name: 'ProjectOACustomFormEdit',
    hidden: true,
    component: () => import('../home/addCustomForm'),
    meta: { title: '编辑表单' }
  },
  {
    path: 'fixedFormEdit/:id',
    name: 'ProjectOAFixedFormEdit',
    hidden: true,
    component: () => import('../home/editFixedForm'),
    meta: { title: '编辑固定表单' }
  },
  {
    path: 'customFormDetail',
    name: 'ProjectOACustomFormDetail',
    hidden: true,
    component: () => import('../home/customDetail'),
    meta: { title: '表单详情' }
  }
]
