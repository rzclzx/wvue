// 表格信息配置项
export const columns = {
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
    gender: {
      show: true,
      width: '',
      label: '性别',
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
    dept: {
      show: true,
      width: '',
      label: '部门',
      align: 'center',
      child: 'name'
    },
    createTime: {
      show: true,
      width: '',
      label: '创建时间',
      align: 'center',
      time: true
    },
  }
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
