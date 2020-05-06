// axios配置
import Vue from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie';

// 拿到初始化请求函数
const http = axios.create();

// 请求拦截器
http.interceptors.request.use(function(config){
  // 在请求发出之前进行一些操作
  // console.log(
  //     '%c 请求地址: ','background:#333;color:#bada55',
  //     config.baseURL + config.url,
  //     '   method:' + config.method,
  //     '   data:', config.data
  // )
  return config;
},function(err){
  // Do something with request error
  //return Promise.reject(err);
});
// 响应拦截器
http.interceptors.response.use(function(res){
  // 实际应用完善此逻辑，根据返回码做拦截

  // if (res.data.code === 'MGT00000') {
  //     return res.data
  // } else {
  //     const config = {
  //         title: getText('错误'),
  //         content: res.data.code + ': ' + getText(`errorCode['${res.data.code}']`),
  //     };
  //     if (res.data.code === 'MGT00136') {
  //         // 首次登陆,修改密码
  //         return res.data
  //     }
  //     if (res.data.code === 'MGT00135') {
  //         // 首次登陆，绑定ga
  //         return res.data
  //     }
  //     if (res.data.code === 'MGT00019') {
  //         // 如果token过期则跳到登陆页面
  //         config.onOk = () =>{
  //             Cookies.remove('user')
  //             localStorage.userData = null
  //             Cookies.remove('token');
  //             refresh()
  //             window.location.href = '/';
  //         }
  //     }
  //     return Promise.reject(res.data.code);
  // }
},function(err){
  // Do something with response error
  //return Promise.reject(err);
})

// 配置默认请求头
let defaulHeaders = {
  'Content-Type': 'application/json;charset=UTF-8',
  requestId: String(Math.random()).replace('0.',''),
  withCredentials: true
};
// 获取token初始化headers
export const refresh = (token) => {
  defaulHeaders.token = token ? token : ''
}
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

function initAxios () {
  http.defaults.baseURL = process.env.BASE_URL
  Vue.prototype.$axios = send
}

export default initAxios
