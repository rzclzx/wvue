// 表格信息配置项
export const columns = {
  user: {
    a: {
      show: true,
      width: '300',
      label: '登录名',
      align: 'center'
    },
    b: {
      show: true,
      width: '300',
      label: '登录名',
      align: 'center'
    },
    c: {
      show: true,
      width: '300',
      label: '登录名',
      align: 'center'
    },
    d: {
      show: true,
      width: '300',
      label: '登录名',
      align: 'center'
    },
    e: {
      show: true,
      width: '300',
      label: '登录名',
      align: 'center'
    },
    f: {
      show: true,
      width: '300',
      label: '登录名',
      align: 'center'
    },
    g: {
      show: true,
      width: '300',
      label: '登录名',
      align: 'center'
    },
    v: {
      show: true,
      width: '300',
      label: '登录名',
      align: 'center'
    },
    ff: {
      show: true,
      width: '300',
      label: '登录名',
      align: 'center'
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
