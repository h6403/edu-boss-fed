import router from '@/router'
import store from '@/store'
import axios from 'axios'
// 通过局部引入方式引入 ElementUI 中的 Message 组件功能
import { Message } from 'element-ui'
import qs from 'qs'

// axios.create() 可以使⽤⾃定义配置新建⼀个 axios 实例
const request = axios.create({})

// 封装 URL 基地址检测函数
function getBaseURL (url) {
  if (url.startsWith('/boss')) {
    return 'http://eduboss.lagou.com'
  } else {
    return 'http://edufront.lagou.com'
  }
}

// 设置请求拦截器
request.interceptors.request.use(function (config) {
  // 根据请求的 URL 判断基地址，设置给 config.baseURL
  config.baseURL = getBaseURL(config.url)

  // Token 统⼀处理
  // 为了严谨，可以读取 store 中的 user 后进⾏ Token 检测
  const { user } = store.state
  if (user && user.access_token) {
    // 设置 Token
    config.headers.Authorization = user.access_token
  }

  return config
})

// 封装跳转登录⻚⾯的函数
function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      // router.currentRoute ⽤于获取当前路由对应的路由信息对象
      redirect: router.currentRoute.fullPath
    }
  })
}

// 是否正在更新 Token
let isRefreshing = false
// 存储因等待 Token 刷新⽽挂起的请求
let requests = []

// 设置响应拦截器
request.interceptors.response.use(function (response) {
  // 状态码为 2xx 都会进⼊这⾥
  return response
}, function (error) {
  // 超出 2xx 都会进⼊这⾥
  if (error.response) {
    // 请求发送成功，也收到了响应，但状态码超过了2xx（常⻅错误处理位置）
    const { status } = error.response
    let errorMessage = ''
    if (status === 400) {
      errorMessage = '请求参数错误'
    } else if (status === 401) {
      // token ⽆效
      // 1.检测: 如果 store 不存在 user，跳转登录⻚
      if (!store.state.user) {
        redirectLogin()
        // 阻⽌后续操作，向下抛出错误对象
        return Promise.reject(error)
      }
      // 发送刷新请求前判断 isRefreshing 是否存在其他已发送的刷新请求
      if (isRefreshing) {
        // 将当前失败的请求保存在函数中，存储到 requests 中等待执⾏，并 return中止操作
        return requests.push(() => {
          request(error.config)
        })
      }
      isRefreshing = true
      // 2.根据 refresh_token 请求新的 access_token
      // - 当前 else if 应当设置 return，就不会执⾏整个 if 后⾯的错误信息 return 了（严谨些）
      return request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: qs.stringify({
          refreshtoken: store.state.user.refresh_token
        })
      }).then(res => {
        // 检测，是否成功请求到新的 access_token
        // a. 如果没有请求到新的 access_token，也就是刷新 token 失败，则跳转回登录⻚
        if (res.data.state !== 1) {
          // 清除已经⽆效的⽤户信息
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(error)
        }
        // b. 如果成功，将新的 access_token 更新到容器与本地存储中
        store.commit('setUser', res.data.content)
        // Token 刷新成功后，将 requests 中的请求重新发送
        requests.forEach(callback => callback())
        // 随后清空已被重新发送的请求
        requests = []
        //  return 本次请求
        return request(error.config)
      }).catch(() => {
        // 这⾥⽤于处理 HTTP 报错的情况（我们的服务器使⽤的为响应⾃定义状态 -1来标识失败）
        // - 此处的操作与 then() 中失败的处理⽅式相同
        // - 由于不需要使⽤ catch 参数中的错误信息 err，所以没有接收
        store.commit('setUser', null)
        redirectLogin()
        return Promise.reject(error)
      }).finally(() => {
        // 请求完毕，⽆论成功失败，设置 isRefreshing 为 false
        isRefreshing = false
      })
    } else if (status === 403) {
      errorMessage = '没有权限，请联系管理员'
    } else if (status === 404) {
      errorMessage = '请求资源不存在'
    } else if (status >= 500) {
      errorMessage = '服务端错误，请联系管理员'
    }
    Message.error(errorMessage)
  } else if (error.request) {
    // 请求发送成功，但没有收到响应
    Message.error('请求超时，请重试')
  } else {
    // 在设置请求时发⽣了⼀些失去，触发了错误（未知型错误）
    Message.error(`请求失败${error.message}`)
  }
  // 将请i失败的错误对象继续抛出，传递给接收响应的处理函数
  return Promise.reject(error)
})

export default request
