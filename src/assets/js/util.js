

const clone = source => {
  if (!getType(source)) {
      // 简单值
      return source;
  }
  let dest = Array.isArray(source) ? [] : {};
  const queue = [{ source, dest }];

  const set = new Set([]);

  while (queue.length) {
      const { dest, source } = queue.shift();
      const type = getType(source);
      if (type === "Array") {
          // 数组
          source.forEach((x, index) => {
              const xType = getType(x);
              if (!getType(x)) {
                  dest[index] = x;
                  return;
              }

              if (xType === "Array") {
                  dest[index] = [];
                  queue.push({
                      source: x,
                      dest: dest[index]
                  });
                  return;
              }

              if (xType === "Object") {
                  if (set.has(x)) {
                      dest[index] = x;
                      return;
                  }
                  dest[index] = {};
                  queue.push({
                      source: x,
                      dest: dest[index]
                  });
                  return;
              }
          });
      } else {
          // 对象
          for (let [k, v] of Object.entries(source)) {
              const vType = getType(v);
              if (!vType) {
                  dest[k] = v;
                  continue;
              }
              if (vType === "Array") {
                  dest[k] = [];
                  queue.push({
                      source: v,
                      dest: dest[k]
                  });
              }
              if (vType === "Object") {
                  if (set.has(v)) {
                      dest[k] = v;
                      continue;
                  }
                  dest[k] = {};
                  queue.push({
                      source: v,
                      dest: dest[k]
                  });
              }
          }
      }
      set.add(source);
  }
  return dest;
};

const parseTime = (time, format) => {
  if (time) {
    var date = new Date(time)
    var year = date.getFullYear()
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    // 拼接
    if (format == 'YYMMDD') {
      return year + '-' + month + '-' + day
    } else if (format == 'YYMMDDHH') {
      return year + '-' + month + '-' + day + ' ' + hours + ':00'
    } else if (format == 'HHMMSS') {
      return hours + ':' + minutes + ':' + seconds
    } else if (format == 'hhmmss') {
      return hours + '' + minutes + '' + seconds
    } else if (format == 'YYMMDDHHMM') {
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
    } else {
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    }
  } else {
    return ''
  }
}

export default {
  parseTime: parseTime,
  clone: clone,
  add (arg1, arg2) {
    let r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split(".")[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
  },
  sub (arg1, arg2) {
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split(".")[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  },
  mul (arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
      m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  },
  div (arg1, arg2) {
    if (!arg1)return '';
    if (!arg2)return '';
    var t1 = 0, t2 = 0, r1, r2;
    try {
      t1 = arg1.toString().split(".")[1].length
    } catch (e) {
    }
    try {
      t2 = arg2.toString().split(".")[1].length
    } catch (e) {
    }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
  },
  formatTime: (time, option) => {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
      return '刚刚'
    } else if (diff < 3600) {
      // less 1 hour
      return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
      return '1天前'
    }
    if (option) {
      return parseTime(time, option)
    } else {
      return (
        d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日' +
        d.getHours() +
        '时' +
        d.getMinutes() +
        '分'
      )
    }
  },
  debounce: (func, wait, immediate) => {
    let timeout, args, context, timestamp, result

    const later = function() {
      // 据上一次触发时间间隔
      const last = +new Date() - timestamp

      // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }

    return function(...args) {
      context = this
      timestamp = +new Date()
      const callNow = immediate && !timeout
      // 如果延时不存在，重新设定延时
      if (!timeout) timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }

      return result
    }
  },
  isExternal: (path) => {
    return /^(https?:|mailto:|tel:)/.test(path)
  },
  regEmail: (email) => {
    if (String(email).indexOf('@') > 0) {
      const str = email.split('@')
      let _s = ''
      if (str[0].length > 3) {
        for (var i = 0; i < str[0].length - 3; i++) {
          _s += '*'
        }
      }
      var new_email = str[0].substr(0, 3) + _s + '@' + str[1]
    }
    return new_email
  },
  regMobile: (mobile) => {
    if (mobile.length > 7) {
      var new_mobile = mobile.substr(0, 3) + '****' + mobile.substr(7)
    }
    return new_mobile
  },
  downloadFile: (obj, name, suffix) => {
    const url = window.URL.createObjectURL(new Blob([obj]))
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    const fileName = suffix ? parseTime(new Date()) + '-' + name + '.' + suffix : name
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },
  classify: (list, key) =>{
    list = list || [];
    let obj = {};
    list.forEach(item =>{
      if (!obj[item[key]]) {
        obj[item[key]] = [];
        obj[item[key]].push(item);
      } else {
        obj[item[key]].push(item);
      }
    })
    return obj;
  },
  unClassify: (obj) => {
    if (!obj) return [];
    let arr = [];
    for (let i in obj) {
      obj[i].forEach(item => {
        arr.push(item);
      })
    }
    return arr;
  },
  getStrLentth: (str) => {
    if (!str) return 0;
    str = str.toString();
    let l = 0;
    let arr = str.split('');
    arr.forEach(item =>{
      if (/[^\x00-\xff]/.test(item)) {
        l += 2;
      } else {
        l += 1;
      }
    })
    return l;
  },
  manyList (list, row) {
    if (!list) return '';
    list = list.filter(item => row[item]);
    list = list.map(item => row[item]);
    const str = list.join(' | ');
    return str;
  },
  removeNull (obj) {
    if (!obj) return {}
    for (let i in obj) {
      if (!obj[i] && obj[i] !== 0) delete obj[i];
    }
    return obj;
  },
  randomProperty (obj) {
    let keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
  },
  hasItem (item, list, key, listKey) {
    if (!list) return false;
    listKey = listKey ? listKey : key;
    for (let i = 0; i < list.length; i++) {
      if (item[key] === list[i][listKey] && item[key]) return true
    }
    return false
  },
  getKeybyKeyOfList (targetKey, byKey, byValue, list) {
    if (!targetKey || !byKey || !byValue || !list) return '';
    for (let i = 0; i< list.length; i++) {
      if (list[i][byKey] == byValue) {
        return list[i][targetKey];
      }
    }
  },
  getFixed (all, value, num) {
    value = new Number(value);
    if (all) {
      return value.toFixed(num);
    } else {
      if (value.toString().indexOf('.') == -1) {
        return value
      } else {
        return value.toFixed(num);
      }
    }
  }
}