import request from '@/utils/request'

// 按条件分页查询角色接口
export const getRolePages = data => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

// 删除角色
export const deleteRole = id => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}

// 获取单条资源数据
export const getEditRoleInfo = id => {
  return request({
    method: 'GET',
    // 请求参数：
    // url: `/boss/role/getEditRoleInfo?id=${id}`
    url: '/boss/role/getEditRoleInfo',
    params: {
      id
    }
  })
}

// 添加或更新资源请求功能
export const createOrUpdateRole = data => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

// 获取所有角色
export const getAllRoles = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

// 给用户分配角色
export const allocateUserRoles = data => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}

// 获取用户角色
export const getUserRoles = userId => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${userId}`
  })
}
