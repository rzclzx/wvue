// 通过两条属性定位tree数据的对象
function getChildByDoubleKey (list, key, dkey, childKey, value, dvalue) {
  if (isNull(value)) return {};
  if (isNull(dvalue)) return {};
  list = list || [];
  for (let i = 0; i < list.length; i++) {
    if (list[i][key] == value && list[i][dkey] == dvalue) {
      return list[i];
    } else {
      if (list[i][childKey]) {
        if (getChildByDoubleKey(list[i][childKey], key, dkey, childKey, value, dvalue)) {
          return getChildByDoubleKey(list[i][childKey], key, dkey, childKey, value, dvalue);
        }
      }
    }
  }
}
// 通过id获取tree数据对象(id不可以重复)
function getChildByKey (list, key, childKey, value) {
  if (isNull(value)) return {};
  list = list || [];
  for (let i = 0; i < list.length; i++) {
    if (list[i][key] == value) {
      return list[i];
    } else {
      if (list[i][childKey]) {
        if (getChildByKey(list[i][childKey], key, childKey, value)) {
          return getChildByKey(list[i][childKey], key, childKey, value);
        }
      }
    }
  }
}
// 通过id获取级联选择的数组
function getCascArrByKey (list, key, childKey, value, arr) {
  if (isNull(value)) return [];
  list = list || [];
  for (let i = 0; i < list.length; i++) {
    if (list[i][key] == value) {
      arr.push(list[i][key]);
      return arr;
    } else {
      if (list[i][childKey]) {
        if (getChildByKey(list[i][childKey], key, childKey, value)) {
          arr.push(list[i][key])
          return getCascArrByKey(list[i][childKey], key, childKey, value, arr);
        }
      }
    }
  }
}
// 递归遍历tree且判断是否存在children，执行传入的回调函数
function rootCallBack(item, key, handler, reso) {
  if (!item[key]) {
    handler(item);
  } else {
    reso && reso(item);
    item[key].forEach(val => {
      rootCallBack(val, key, handler, reso);
    })
  }
}
// 表格根据key平铺数据
function manyList (list, row) {
  if (!list) return '';
  list = list.filter(item => row[item]);
  list = list.map(item => row[item]);
  const str = list.join(' | ');
  return str;
}
// 通过数组对象一个值获取当前对象的另一个值
function getKeybyKeyOfList (targetKey, byKey, byValue, list) {
  if (isNull(byValue)) return '';
  for (let i = 0; i< list.length; i++) {
    if (list[i][byKey] == byValue) {
      return list[i][targetKey];
    }
  }
}
// 通过对象的一个属性排序
function sortByObjprop (list, key, trasHandler) {
  list = list || [];
  if (list.length === 0 || !key) return [];
  const compare = (key) =>{
    return (a, b) => {
      if (trasHandler) {
        return trasHandler(a[key]) - trasHandler(b[key]);
      } else {
        return a[key] - b[key];
      }
    }
  }
  return list.sort(compare(key));
}
// 数组中是否包含指定值对象（双值指定）
function hasItem (item, list, key, listKey) {
  if (!list) return false;
  listKey = listKey ? listKey : key;
  for (let i = 0; i < list.length; i++) {
    if (item[key] == list[i][listKey] && item[key]) return true
  }
  return false
}
// 像素转数字
function pxTransNumber (str) {
  str = str || '';
  return Math.ceil(str.slice(0, -2));
}
// 去掉无值参数
function removeNull (obj) {
  if (!obj) return {}
  for (let i in obj) {
    if (!obj[i] && obj[i] !== 0) delete obj[i];
  }
  return obj;
}
function isNull (val) {
  if (!val && val !== 0) return true;
  return false;
}
// 下载文件
function downloadFile (obj, name, suffix) {
  const url = window.URL.createObjectURL(new Blob([obj]))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  const fileName = suffix ? parseTime(new Date()) + '-' + name + '.' + suffix : name
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
// 获取字符串长度
function getStrLentth (str) {
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
}

// 数组根据某一个属性转成对象
function classify (list, key) {
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
}
// 上述反转
function unClassify (obj) {
  if (!obj) return [];
  let arr = [];
  for (let i in obj) {
    obj[i].forEach(item => {
      arr.push(item);
    })
  }
  return arr;
}
// 加
function add (arg1, arg2) {
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
}
// 减
function sub (arg1, arg2) {
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
}
// 乘
function mul (arg1, arg2) {
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
}
// 除
function div (arg1, arg2) {
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
}
// 只考虑数组和对象，其余都是简单值
function getType (v) {
  switch (Object.prototype.toString.call(v)) {
    case "[object Object]":
        return "Object";
    case "[object Array]":
        return "Array";
    default:
        return false;
  }
}
// 深拷贝
function clone (source) {
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
// 时间传化
function parseTime(time, format) {
  if (time) {
    var date = new Date(time)
    var year = date.getFullYear()
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    // format格式如下返回不同格式,默认具体到时分秒
    if (format == 'YYMMDD') {
      return year + '-' + month + '-' + day
    } else if (format == 'YYMMDDHH') {
      return year + '-' + month + '-' + day + ' ' + hours + ':00'
    } else if (format == 'HHMMSS') {
      return hours + ':' + minutes + ':' + seconds
    } else if (format == 'HHMM') {
      return hours + ':' + minutes
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
  getCascArrByKey: getCascArrByKey,
  getChildByKey: getChildByKey,
  getChildByDoubleKey: getChildByDoubleKey,
  rootCallBack: rootCallBack,
  parseTime: parseTime,
  clone: clone,
  add: add,
  sub: sub,
  mul: mul,
  div: div,
  downloadFile: downloadFile,
  classify: classify,
  unClassify: unClassify,
  getStrLentth: getStrLentth,
  manyList: manyList,
  removeNull: removeNull,
  hasItem: hasItem,
  getKeybyKeyOfList: getKeybyKeyOfList,
  pxTransNumber: pxTransNumber,
  sortByObjprop: sortByObjprop,
}