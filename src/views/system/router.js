import Layout from '@/layout'
import { isDev, isProd } from '@/utils'
const routes = {
  path: '/system',
  name: 'System',
  component: Layout,
  meta: { title: '系统管理', icon: 'system' },
  children: [
    {
      path: 'user',
      name: 'User',
      component: () => import('./user'),
      meta: {
        title: '用户管理'
      }
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('./role'),
      meta: {
        title: '角色管理'
      }
    },
    {
      path: 'department',
      name: 'Department',
      component: () => import('./department'),
      meta: {
        title: '部门管理'
      }
    },
    {
      path: 'departmentUser',
      name: 'DepartmentUser',
      component: () => import('./departmentUser'),
      meta: {
        title: '部门人员管理'
      }
    },
    {
      path: 'args',
      name: 'Args',
      component: () => import('./args'),
      meta: {
        title: '参数管理'
      }
    },
    {
      path: 'power',
      name: 'Power',
      hidden: isProd,
      component: () => import('./power'),
      meta: {
        title: '权限配置'
      }
    },
    {
      path: 'log',
      name: 'Log',
      component: () => import('./log'),
      meta: {
        title: '日志管理'
      }
    }
  ]
}

if (isDev) {
  routes.children.push({
    path: 'test',
    name: 'Test',
    component: () => import('@/views/system/test'),
    meta: {
      title: '权限配置(实验性)'
    }
  })
}
export default routes
