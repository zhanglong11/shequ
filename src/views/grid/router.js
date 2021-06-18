import Layout from '@/layout'
function rename(PromiseComponent, name) {
  return PromiseComponent.then(c => {
    c.default.name = name
    return c
  })
}
export default {
  path: '/grid',
  name: 'Grid',
  component: Layout,
  meta: { title: '网格管理', icon: 'grid' },
  children: [
    {
      path: 'struct',
      name: 'GridStruct',
      component: () => import('./struct/index.vue'),
      meta: { title: '网格组织' }
    },
    {
      path: 'space',
      name: 'GridSpace',
      component: () => import('./space/index.vue'),
      meta: { title: '空间管理', cache: true }
    },
    {
      path: 'building/new',
      name: 'GridBuildingCreate',
      hidden: true,
      component: () => rename(import('./space/building.vue'), 'GridBuildingCreate'),
      meta: { title: '新增建筑', cache: true, activeMenu: '/grid/space' }
    },
    {
      path: 'building/:id',
      name: 'GridBuildingEdit',
      hidden: true,
      component: () => rename(import('./space/building.vue'), 'GridBuildingEdit'),
      meta: { title: '编辑建筑', cache: true, activeMenu: '/grid/space' }
    },
    {
      path: 'room/new',
      name: 'GridRoomCreate',
      hidden: true,
      component: () => rename(import('./space/room/$id.vue'), 'GridRoomCreate'),
      meta: { title: '新增房间', cache: true, activeMenu: '/grid/space' }
    },
    {
      path: 'room/:id',
      name: 'GridRoomEdit',
      hidden: true,
      component: () => rename(import('./space/room/$id.vue'), 'GridRoomEdit'),
      meta: { title: '编辑房间', cache: true, activeMenu: '/grid/space' }
    },
    {
      path: 'room/:id/detail',
      name: 'GridRoomDetail',
      hidden: true,
      component: () => import('./space/room/detail.vue'),
      meta: { title: '房间详情', activeMenu: '/grid/space' }
    },
    {
      path: 'resident',
      name: 'GridResident',
      component: () => import('./resident/index.vue'),
      meta: { title: '居民管理' }
    },
    {
      path: 'resident/new',
      name: 'GridResidentCreate',
      hidden: true,
      component: () => rename(import('./resident/$id.vue'), 'GridResidentCreate'),
      meta: { title: '新建居民', cache: true, activeMenu: '/grid/resident' }
    },
    {
      path: 'resident/:id',
      name: 'GridResidentEdit',
      hidden: true,
      component: () => rename(import('./resident/$id.vue'), 'GridResidentEdit'),
      meta: { title: '编辑居民', cache: true, activeMenu: '/grid/resident' }
    },
    {
      path: 'resident/:id/detail',
      name: 'GridResidentDetail',
      hidden: true,
      component: () => import('./resident/detail.vue'),
      meta: { title: '居民详情', activeMenu: '/grid/resident' }
    },
    {
      path: 'company',
      name: 'GridCompany',
      component: () => import('./company/index.vue'),
      meta: { title: '企业管理' }
    },
    {
      path: 'company/new',
      name: 'GridCompanyCreate',
      hidden: true,
      component: () => rename(import('./company/$id.vue'), 'GridCompanyCreate'),
      meta: { title: '新建企业', cache: true, activeMenu: '/grid/company' }
    },
    {
      path: 'company/:id',
      name: 'GridCompanyEdit',
      hidden: true,
      component: () => rename(import('./company/$id.vue'), 'GridCompanyEdit'),
      meta: { title: '编辑企业', cache: true, activeMenu: '/grid/company' }
    },
    {
      path: 'company/:id/detail',
      name: 'GridCompanyDetail',
      hidden: true,
      component: () => import('./company/detail.vue'),
      meta: { title: '企业详情', activeMenu: '/grid/company' }
    },
    {
      path: 'car',
      name: 'GridCar',
      component: () => import('./car/index.vue'),
      meta: { title: '车辆管理' }
    },
    {
      path: 'car/new',
      name: 'GridCarCreate',
      hidden: true,
      component: () => rename(import('./car/$id.vue'), 'GridCarCreate'),
      meta: { title: '新建车辆', cache: true, activeMenu: '/grid/car' }
    },
    {
      path: 'car/:id',
      name: 'GridCarEdit',
      hidden: true,
      component: () => rename(import('./car/$id.vue'), 'GridCarEdit'),
      meta: { title: '编辑车辆', cache: true, activeMenu: '/grid/car' }
    }
  ]
}
