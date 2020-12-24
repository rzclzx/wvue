export default [
  // 按下列格式字段顺序添加，（全部填写全量，保持一致）

  // 首页无子菜单
  {
    name: '',
    path: '/',
    hidden: false,
    component: 'Layout',
    // redirect会将'/'定位到'/dashboard'
    redirect: '/dashboard',
    // 无子菜单
    single: true,
    meta: {
      icon: 'el-icon-s-operation',
      title: '首页',
      noCache: false,
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
  // 二级菜单格式
  {
    name: '系统管理',
    path: '/system',
    hidden: false,
    component: 'Layout',
    meta: {
      icon: 'el-icon-setting',
      title: '系统管理',
      noCache: false,
    },
    children: [
      {
        name: '用户管理',
        path: 'user',
        hidden: false,
        component: 'system/user/index',
        meta: {
          title: '用户管理',
          noCache: false
        }
      },
      {
        name: '角色管理',
        path: 'role',
        hidden: false,
        component: 'system/role/index',
        meta: {
          title: '角色管理',
          noCache: false
        }
      },
      {
        name: '菜单管理',
        path: 'menu',
        hidden: false,
        component: 'system/menu/index',
        meta: {
          title: '菜单管理',
          noCache: false
        }
      },
      {
        name: '字典管理',
        path: 'dict',
        hidden: false,
        component: 'system/dict/index',
        meta: {
          title: '字典管理',
          noCache: false
        }
      },
    ]
  },
  // 错误路径定向到首页
  {
    path: '*', 
    redirect: '/dashboard', 
    hidden: true
  }
]