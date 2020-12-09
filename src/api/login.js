import request from './axios/baseAxios'

export function getCodeImg () {
  return request({
    url: 'auth/code',
    method: 'get'
  })
}

export function login (data) {
  return request({
    url: 'auth/login',
    method: 'post',
    data
  })
}

export function getInfo () {
  return request({
    url: 'auth/info',
    method: 'get'
  })
}

export function logout () {
  return request({
    url: 'auth/logout',
    method: 'delete'
  })
}