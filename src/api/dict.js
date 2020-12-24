import request from './axios/baseAxios'

export function listDict(params) {
  return request({
    url: 'api/dict',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/dict',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/dict/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/dict',
    method: 'put',
    data
  })
}

export function listDetail(params) {
  return request({
    url: 'api/dictDetail',
    method: 'get',
    params
  })
}

export function addDetail(data) {
  return request({
    url: 'api/dict',
    method: 'post',
    data
  })
}

export function delDetail(id) {
  return request({
    url: 'api/dict/' + id,
    method: 'delete'
  })
}

export function editDetail(data) {
  return request({
    url: 'api/dict',
    method: 'put',
    data
  })
}
