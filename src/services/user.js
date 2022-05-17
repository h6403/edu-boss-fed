import request from '@/utils/request'
import qs from 'qs'

// 用户登录接口
export const login = data => {
  return request({
    method: 'POST',
    // header 可省略，qs.stringify() 会⾃动设置
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    url: '/front/user/login',
    // urlencoded格式：名=值&名=值... ，这里通过 qs.stringify 转换后就是这种格式
    data: qs.stringify(data)
  })
}

// ⽤户基本信息请求接口
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}

// 分⻚查询⽤户信息 - ⽤户管理
export const getUserPages = data => {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}

// 封禁⽤户
export const forbidUser = userId => {
  return request({
    method: 'POST',
    url: '/boss/user/forbidUser',
    params: {
      userId
    }
  })
}

// 启用⽤户
export const enableUser = userId => {
  return request({
    method: 'POST',
    url: '/boss/user/enableUser',
    params: {
      userId
    }
  })
}

// 删除用户
export const deleteUser = id => {
  return request({
    method: 'DELETE',
    url: `/boss/user/${id}`
  })
}
