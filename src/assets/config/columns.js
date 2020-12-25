// 表格信息配置项
export const columns = {
  dictDetail: {
    label: {
      show: true,
      width: '',
      label: '字典标签',
      align: 'center'
    },
    value: {
      show: true,
      width: '',
      label: '字典值',
      align: 'center'
    },
    dictSort: {
      show: true,
      width: '',
      label: '排序',
      align: 'center'
    },
  },
  dict: {
    name: {
      show: true,
      width: '',
      label: '名称',
      align: 'center'
    },
    description: {
      show: true,
      width: '',
      label: '描述',
      align: 'center'
    },
  },
  menu: {
    icon: {
      show: true,
      width: '',
      label: '图标',
      align: 'center'
    },
    menuSort: {
      show: true,
      width: '',
      label: '排序',
      align: 'center'
    },
    permission: {
      show: true,
      width: '',
      label: '权限标识',
      align: 'center'
    },
    component: {
      show: true,
      width: '',
      label: '组件路径',
      align: 'center'
    },
    iframe: {
      show: true,
      width: '',
      label: '外链',
      align: 'center'
    },
    cache: {
      show: true,
      width: '',
      label: '缓存',
      align: 'center'
    },
    hidden: {
      show: true,
      width: '',
      label: '可见',
      align: 'center'
    },
    createTime: {
      show: true,
      width: '',
      label: '创建日期',
      align: 'center'
    },
  },
  role: {
    name: {
      show: true,
      width: '',
      label: '名称',
      align: 'center'
    },
    dataScope: {
      show: true,
      width: '',
      label: '数据权限',
      align: 'center'
    },
    level: {
      show: true,
      width: '',
      label: '角色级别',
      align: 'center'
    },
    description: {
      show: true,
      width: '',
      label: '描述',
      align: 'center'
    },
    createTime: {
      show: true,
      width: '',
      label: '创建日期',
      align: 'center'
    },
  },
  user: {
    username: {
      show: true,
      width: '',
      label: '用户名',
      align: 'center'
    },
    nickName: {
      show: true,
      width: '',
      label: '名称',
      align: 'center'
    },
    phone: {
      show: true,
      width: '',
      label: '电话',
      align: 'center'
    },
    email: {
      show: true,
      width: '',
      label: '邮箱',
      align: 'center'
    },
    enabled: {
      show: true,
      width: '',
      label: '状态',
      align: 'center',
      time: true
    },
    createTime: {
      show: true,
      width: '',
      label: '创建时间',
      align: 'center',
      time: true
    },
  },
}

const comp = (a, b) => {
  let lista = Object.keys(a);
  let listb = Object.keys(b);
  for (let i in a) {
    if (typeof a[i] === 'object') {
      if (!b[i] || typeof b[i] !== 'object' || lista.indexOf(i) != listb.indexOf(i)) {
        return false
      } else {
        if (!comp(a[i], b[i])) return false
      }
    } else {
      if (a[i] !== b[i] && i !== 'height' && i !== 'width' && i !== 'show') {
        return false
      }
    }
  }
  return true;
}

const columnsInit = () => {
  const localColumns = localStorage.columns ? JSON.parse(localStorage.columns) : {};
  const value = comp(columns, localColumns) && comp(localColumns, columns)
  localStorage.columns = value ? localStorage.columns : JSON.stringify(columns)
}

export default columnsInit
