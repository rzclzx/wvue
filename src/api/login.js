import request from './axios/base'

export function getDepts() {
  return request({
    url: 'api/menus/build',
    method: 'get'
  })
}