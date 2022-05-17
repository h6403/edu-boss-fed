import Mock from 'mockjs'

// 登录接口返回数据
export const loginResult = () => {
  return Mock.mock({
    message: function () {
      if (this.state === 1) {
        return '登陆成功'
      } else {
        return '登陆失败'
      }
    },
    state: 1,
    success: function () {
      if (this.state === 1) {
        return true
      } else {
        return false
      }
    },
    content: JSON.stringify(Mock.mock({
      access_token: '9OTcMoaFLersH7Gia307ekIlG1t5aFXpbk5VDk94:hMXHQ0brKY6werchb7qsmP_TrnM=:eyJzY29wZSI6InBoeWF1ZGl0IiwiZGVhZGxpbmUiOjE1ODg3MzU5ODh9',
      token_type: 'bearer',
      user_id: /\d{5,10}/,
      organization: '@cname',
      scope: 'read',
      expires_in: 6444,
      refresh_token: '9OTcMoaFLersH7Gia307ekIlG1t5aFXpbk5VDk94:hMXHQ0brKY6werchb7qsmP_TrnM=:eyJzY29wZSI6InBoeWF1ZGl0IiwiZGVhZGxpbmUiOjE1ODg3MzU5ODh9'
    }))
  })
}

// 用户信息接口返回数据
export const userInfo = () => {
  return Mock.mock({
    state: 1,
    message: 'success',
    success: true,
    content: {
      isUpdatedPassword: true,
      weixinNickName: '@name',
      userName: '@cname',
      portrait: Mock.Random.dataImage('30x30', '像')
    }
  })
}

// 刷新token返回数据
export const refreshTokenData = () => {
  return Mock.mock({
    message: 'success',
    state: 1,
    success: true,
    content: JSON.stringify(Mock.mock({
      access_token: '9OTcMoaFLersH7Gia307ekIlG1t5aFXpbk5VDk94:hMXHQ0brKY6werchb7qsmP_TrnM=:eyJzY29wZSI6InBoeWF1ZGl0IiwiZGVhZGxpbmUiOjE1ODg3MzU5ODh9',
      token_type: 'bearer',
      user_id: /\d{5,10}/,
      organization: '@cname',
      scope: 'read',
      expires_in: 6444,
      refresh_token: '9OTcMoaFLersH7Gia307ekIlG1t5aFXpbk5VDk94:hMXHQ0brKY6werchb7qsmP_TrnM=:eyJzY29wZSI6InBoeWF1ZGl0IiwiZGVhZGxpbmUiOjE1ODg3MzU5ODh9'
    }))
  })
}

// 分页获取用户列表数据
export const userPages = () => {
  return Mock.mock({
    code: '000000',
    msg: '处理成功',
    time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
    data: {
      'records|10': [
        {
          id: /1000300[0-9]2/,
          name: '@cname',
          phone: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
          portrait: () => {
            return Mock.Random.dataImage('30x30', '')
          },
          createdTime: '@datetime',
          'status|+1': ['ENABLE', 'DISABLE']
        }
      ],
      'total|10-100': 20
    }
  })
}
