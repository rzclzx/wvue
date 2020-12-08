// axios配置
import axios from 'axios'
import Cookies from 'js-cookie'

function init(url) {
  // 配置默认请求头
  let defaulHeaders = {
    'Content-Type': 'application/json;charset=UTF-8',
    requestId: String(Math.random()).replace('0.',''),
    withCredentials: true
  };

  function refresh (token) {
    defaulHeaders.token = token ? token : ''
  }

  // 拿到初始化请求函数
  const http = axios.create();

  http.defaults.baseURL = url;


  // 请求拦截器
  http.interceptors.request.use(
    config => {
      if (Cookies.get('token')) {
        config.headers['Authorization'] = Cookies.get('token') // 让每个请求携带自定义token 请根据实际情况自行修改
      }
      config.headers['Content-Type'] = 'application/json'
      return config
    },
    error => {
      Promise.reject(error)
    }
  )


  // 响应拦截器
  http.interceptors.response.use(
    response => {
      return response.data
    },
    error => {
      // 兼容blob下载出错json提示
      if (error.response.data instanceof Blob && error.response.data.type.toLowerCase().indexOf('json') !== -1) {
        const reader = new FileReader()
        reader.readAsText(error.response.data, 'utf-8')
        reader.onload = function(e) {
          const errorMsg = JSON.parse(reader.result).message
          Notification.error({
            title: errorMsg,
            duration: 5000
          })
        }
      } else {
        let code = 0
        try {
          code = error.response.data.status
        } catch (e) {
          if (error.toString().indexOf('Error: timeout') !== -1) {
            Notification.error({
              title: '网络请求超时',
              duration: 5000
            })
            return Promise.reject(error)
          }
        }
        console.log(code)
        if (code) {
          if (code === 401) {
            store.dispatch('LogOut').then(() => {
              // 用户登录界面提示
              Cookies.set('point', 401)
              location.reload()
            })
          } else if (code === 403) {
            router.push({ path: '/401' })
          } else {
            const errorMsg = error.response.data.message
            if (errorMsg !== undefined) {
              Notification.error({
                title: errorMsg,
                duration: 5000
              })
            }
          }
        } else {
          Notification.error({
            title: '接口请求失败',
            duration: 5000
          })
        }
      }
      return Promise.reject(error)
    }
  )

  // 获取token初始化headers
  refresh(Cookies.get('token'))

  // 如果代理需要改变url过滤，则完善次方法
  function pathReplace (url) {
    //如果需要则在这里过滤url代理前缀
    return url
  }

  function send (option) {
    if (!option || !option.method || !option.url) {
        console.error('缺少axios请求配置（method、url、system）')
        return
    }
    let url = pathReplace(option.url)
    return http({
        url: url,
        method: option.method,
        headers: option.headers ? {...defaulHeaders, ...option.headers} : defaulHeaders,
        params: option.params || {},
        data: option.data || {}
    })
  }

  return {
    send: send,
    refresh: refresh
  }
}

export default init
