import request from './axios/baseAxios'

export function buildMenus() {
  return request({
    url: 'api/menus/build',
    method: 'get'
  })
}