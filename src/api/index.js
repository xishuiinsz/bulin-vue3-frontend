import request from '../utils/request'

export const fetchData = (query) => {
  return request({
    url: '/api/creditInfo',
    method: 'get',
    params: query
  })
}
export const fetchEmployeeData = (query) => {
  return request({
    url: '/api/customerInfo',
    method: 'get',
    params: query
  })
}
export const updateEmployeeData = (query) => {
  return request({
    url: '/api/customerInfo',
    method: 'put',
    params: query
  })
}
