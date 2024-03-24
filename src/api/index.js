import request from '@u/request';
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus';
export const fetchData = (query) => {
  return request({
    url: '/api/creditInfo',
    method: 'get',
    params: query,
  });
};
export const fetchCustomerData = async (query) => {
  let result;
  const loadingInstance = ElLoading.service();
  const url = '/api/customerInfo';
  try {
    result = await request({
      url,
      method: 'get',
      params: query,
    });
  } catch (err) {
    console.error(`接口[${url}]报错，原因：${err.message}`);
  } finally {
    loadingInstance?.close?.();
  }
  return result;
};
export const updateCustomerData = (query) => {
  return request({
    url: '/api/customerInfo',
    method: 'put',
    params: query,
  });
};
export const deleteCustomerData = (query) => {
  return request({
    url: '/api/customerInfo',
    method: 'delete',
    params: query,
  });
};

export const fetchMapJson = async (code) => {
  return request({
    url: `/map/areas_v3/bound/${code}_full.json`,
    method: 'get',
  })
}
