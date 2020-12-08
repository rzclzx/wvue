import request from './axios/baseAxios'

export function getDepts() {
  return request({
    url: 'api/menus/build',
    method: 'get'
  })
}