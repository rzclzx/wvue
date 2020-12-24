import request from './axios/baseAxios'

export function buildMenus() {
  return request({
    url: 'api/menus/build',
    method: 'get'
  })
}

export function get(params) {
  return request({
    url: 'api/menus',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/users',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/users/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/users',
    method: 'put',
    data
  })
}