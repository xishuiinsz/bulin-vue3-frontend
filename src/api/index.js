import request from '../utils/request'

export const fetchData = (query) => {
  return request({
    url: '/api/creditInfo',
    method: 'get',
    params: query
  })
}
