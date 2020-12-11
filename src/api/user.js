import request from './axios/baseAxios'

export function add(data) {
  return request({
    url: 'users',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'users/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'users',
    method: 'put',
    data
  })
}
