import request from './axios/baseAxios'

export function getAll(params) {
  return request({
    url: 'api/roles/all',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/roles',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/roles/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/roles',
    method: 'put',
    data
  })
}
