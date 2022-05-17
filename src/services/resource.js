import request from '@/utils/request'

// 按条件分页查询资源接口
export const getResourcePages = data => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

// 获取所有资源分类数据
export const getResourceCategory = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

// 删除资源
export const deleteResource = id => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}

// 获取单条资源数据
export const getEditResourceInfo = id => {
  return request({
    method: 'GET',
    // 请求参数：
    // url: `/boss/resource/getEditResourceInfo?id=${id}`
    url: '/boss/resource/getEditResourceInfo',
    params: {
      id
    }
  })
}

// 添加或更新资源请求功能
export const createOrUpdateResource = data => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}

// 获取所有资源并按资源分类展示
export const getResourceCategoryList = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/getResourceCategoryList'
  })
}

// 给角色分配资源
export const allocateRoleResources = data => {
  return request({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data
  })
}

// 获取角色拥有的资源
export const getRoleResources = roleId => {
  return request({
    method: 'GET',
    url: '/boss/resource/getRoleResources',
    params: {
      roleId
    }
  })
}
