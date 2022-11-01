import request from '../utils/request'

export const fetchLayerData = (query) => {
  return request({
    url: '/api/myPoster/list',
    method: 'get',
    params: query
  })
}
export const fetchData = (query) => {
  return request({
    url: '/api/creditInfo',
    method: 'get',
    params: query
  })
}
export const fetchCustomerData = (query) => {
  return request({
    url: '/api/customerInfo',
    method: 'get',
    params: query
  })
}
export const updateCustomerData = (query) => {
  return request({
    url: '/api/customerInfo',
    method: 'put',
    params: query
  })
}
export const deleteCustomerData = (query) => {
  return request({
    url: '/api/customerInfo',
    method: 'delete',
    params: query
  })
}
