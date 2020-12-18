export default [
  {
    name: '',
    path: '/',
    component: 'Layout',
    hidden: false,
    // redirect会将'/'定位到'/dashboard'
    redirect: '/dashboard',
    single: true,
    meta: {
      icon: 'el-icon-s-operation',
      title: '首页',
      noCache: false
    },
    children: [
      {
        name: '首页',
        path: 'dashboard',
        hidden: false,
        component: 'main/index',
        meta: {
          title: '首页',
          noCache: true
        }
      }
    ]
  },
  {
    name: '系统管理',
    path: '/system',
    hidden: false,
    component: 'Layout',
    meta: {
      icon: 'el-icon-setting',
      noCache: false,
      title: '系统管理'
    },
    children: [
      {
        name: '用户管理',
        path: 'user',
        hidden: false,
        component: 'system/user/index',
        meta: {
          title: '用户管理',
          noCache: true
        }
      }
    ]
  },
  {
    path: '*', 
    redirect: '/dashboard', 
    hidden: true
  }
]