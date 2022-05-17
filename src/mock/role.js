import Mock from 'mockjs'

// 分页获取角色列表数据
export const rolePages = () => {
  return Mock.mock({
    code: '000000',
    msg: '处理成功',
    time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
    data: {
      'records|10': [
        {
          id: /[0-9]{1,3}/,
          code: '@word',
          name: '@cword(5,10)',
          description: '@cword(10,30)',
          createdTime: '@datetime'
        }
      ],
      'total|10-100': 20
    }
  })
}

// 获取编辑角色⻚⾯信息
export const roleInfo = () => {
  return Mock.mock({
    code: '000000',
    msg: '处理成功',
    time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
    data: {
      id: /[0-9]{1,3}/,
      code: '@word',
      name: '@cword(5,10)',
      description: '@cword(10,30)'
    }
  })
}

// 获取所有角色数据
export const allRoles = () => {
  return Mock.mock({
    code: '000000',
    msg: '处理成功',
    time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
    'data|10': [
      {
        'id|+1': [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
          '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'
        ],
        name: '@cword(5,10)'
      }
    ]
  })
}

// 获取用户已分配的角色数据
export const userRoles = () => {
  return Mock.mock({
    code: '000000',
    msg: '处理成功',
    time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
    'data|5': [
      {
        'id|+1': [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
          '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'
        ]
      }
    ]
  })
}
