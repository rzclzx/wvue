import request from './axios/user'

export function add() {
  return request({
    url: 'api/menus/build',
    method: 'get'
  })
}