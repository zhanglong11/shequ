import Vue from 'vue'
import Router from 'vue-router'
import workbench from '@/views/workbench/router/router' // 工作台
import grid from '@/views/grid/router' // 网格管理
import ccp from '@/views/ccp/router' // 智慧党建
import govAffairsRouter from '@/views/govAffairs/router' // 智慧政务
import epidemicControlRouter from '@/views/epidemicControl/router' // 疫情防控
import activityRoomRouter from '@/views/activityRoom/router/router' // 活动室管理
import association from '@/views/association/router/router' // 社群活动
import handyService from '@/views/handyService/router' // 便民服务
import pointsBank from '@/views/pointsBank/router' // 积分银行
import officialRouter from '@/views/official/router' // 公众号
import personalCenter from '@/views/personalCenter/router' // 个人中心
import talent from '@/views/talent/router' // 风采
import synthesizeService from '@/views/synthesizeService/router' // 综合服务
import system from '@/views/system/router' // 系统管理
import bigScreenRouter from '@/views/bigScreen/router' // 大屏路由

/* Layout */
import Layout from '@/layout'

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
      title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
      icon: 'svg-name' // 设置该路由的图标，支持 svg-class
      cache: true // 如果设置为true，则会被 <keep-alive> 缓存(默认 false)
      breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
      affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)
  }
 */

/**
 * routes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'main',
    meta: { breadcrumb: false },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', icon: 'home' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/qrCodePreview',
    name: 'QrCodePreview',
    component: () => import('@/views/qrCodePreview/index'),
    meta: { title: '预览', icon: 'home' },
    hidden: true
  },
  workbench,
  grid, // 网格管理
  ccp, // 智慧党建
  govAffairsRouter, // 智慧政务
  epidemicControlRouter, // 疫情防控
  activityRoomRouter, // 活动室管理
  association, // 社群活动
  handyService, // 便民服务
  pointsBank, // 积分银行
  officialRouter, // 公众号管理
  personalCenter, // 个人中心
  talent, // 风采
  synthesizeService, // 综合服务
  system, // 系统管理
  bigScreenRouter,
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/bim',
    component: () => import('@/views/bim'),
    hidden: true
  },
  {
    path: '/refresh',
    component: () => import('@/views/refresh'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
