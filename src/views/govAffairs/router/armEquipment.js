import shell from '@/utils/shell'
export default {
  path: 'arm-equipment',
  name: 'ArmEquipment',
  component: shell('ArmEquipment', true),
  meta: { title: '武装部', cache: true },
  children: [
    {
      path: 'person',
      name: 'ArmEquipmentPerson',
      component: () => import('../armEquipment/person'),
      meta: {
        title: '重点人员管理'
      }
    },
    {
      path: 'person-add',
      name: 'ArmEquipmentPersonAdd',
      component: () => window.rename(import('../armEquipment/person/add'), 'ArmEquipmentPersonAdd'),
      hidden: true,
      meta: {
        title: '添加重点人员',
        cache: true,
        activeMenu: '/gov-affairs/arm-equipment/person'
      }
    },
    {
      path: 'person-edit/:id',
      name: 'ArmEquipmentPersonEdit',
      component: () => window.rename(import('../armEquipment/person/add'), 'ArmEquipmentPersonEdit'),
      hidden: true,
      meta: {
        title: '编辑重点人员',
        cache: true,
        activeMenu: '/gov-affairs/arm-equipment/person'
      }
    },
    {
      path: 'person-detail/:id',
      name: 'ArmEquipmentPersonDetail',
      component: () => import('../armEquipment/person/detail'),
      hidden: true,
      meta: {
        title: '重点人员详情',
        activeMenu: '/gov-affairs/arm-equipment/person'
      }
    },
    {
      path: 'notice',
      name: 'ArmEquipmentNotice',
      component: () => import('../armEquipment/notice'),
      meta: {
        title: '通知公告',
        activeMenu: '/gov-affairs/arm-equipment/notice'
      }
    },
    {
      path: 'notice-add',
      name: 'ArmEquipmentNoticeAdd',
      component: () => window.rename(import('../armEquipment/notice/add'), 'ArmEquipmentNoticeAdd'),
      hidden: true,
      meta: {
        title: '添加通知公告',
        cache: true,
        activeMenu: '/gov-affairs/arm-equipment/notice'
      }
    },
    {
      path: 'notice-edit/:id',
      name: 'ArmEquipmentNoticeEdit',
      component: () => window.rename(import('../armEquipment/notice/add'), 'ArmEquipmentNoticeEdit'),
      hidden: true,
      meta: {
        title: '编辑通知公告',
        cache: true,
        activeMenu: '/gov-affairs/arm-equipment/notice'
      }
    },
    {
      path: 'notice-detail/:id',
      name: 'ArmEquipmentNoticeDetail',
      component: () => import('../armEquipment/notice/detail'),
      hidden: true,
      meta: {
        title: '通知公告详情',
        activeMenu: '/gov-affairs/arm-equipment/notice'
      }
    },
    {
      path: 'doc',
      name: 'ArmEquipmentDoc',
      component: () => import('../armEquipment/doc'),
      meta: {
        title: '文档管理'
      }
    }
  ]
}
