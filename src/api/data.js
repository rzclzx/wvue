import request from './axios/baseAxios'

export function initData(url, params, paramsSerializer) {
  return request({
    url: url,
    method: 'get',
    params,
    paramsSerializer
  })
}