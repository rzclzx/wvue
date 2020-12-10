// axios配置
import axios from 'axios'
import { Notification } from 'element-ui'
import store from '@/store'
import Cookies from 'js-cookie'

function init(url) {
  // 创建axios实例
  const service = axios.create({
    baseURL: url,
    timeout: 1200000 // 请求超时时间
  })

  // request拦截器
  service.interceptors.request.use(
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

  // response 拦截器
  service.interceptors.response.use(
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
              location.reload()
            })
          } else if (code === 403) {
            location.reload()
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

  return service
}

export default init
