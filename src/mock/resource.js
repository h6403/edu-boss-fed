import Mock from 'mockjs'

// 分页获取资源列表数据
export const resourcePages = () => {
  return Mock.mock({
    code: '000000',
    msg: '处理成功',
    time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
    data: {
      'records|10': [
        {
          id: '@id',
          name: '@cword(5,10)',
          description: '@cword(10,20)',
          url: '@url',
          createdTime: '@datetime'
        }
      ],
      'total|10-100': 20
    }
  })
}

// 资源分类数据
export const resourceCategory = () => {
  return Mock.mock({
    code: '000000',
    msg: '处理成功',
    time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
    'data|5-10': [
      {
        id: '@id',
        name: '@cword(5,10)'
      }
    ]
  })
}

// 获取编辑资源⻚⾯信息
export const resourceInfo = () => {
  return Mock.mock({
    code: '000000',
    msg: '处理成功',
    time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
    data: {
      id: '@id',
      name: '@cword(5,10)',
      description: '@cword(10,20)',
      url: '@url'
    }
  })
}

export const resourceCategoryList = () => {
  return Mock.mock({
    code: '000000',
    msg: '处理成功',
    time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
    data: [
      {
        id: 1,
        name: '角色管理',
        list: [
          { id: 11, name: '获取所有角色' },
          { id: 12, name: '给用户分配角色' },
          { id: 13, name: '按条件查询角色' },
          { id: 14, name: '列出所有角色并标记用户是否拥有' },
          { id: 15, name: '保存或者更新角色' },
          { id: 16, name: '查询用户角色' },
          { id: 17, name: '获取角色' },
          { id: 18, name: '删除角色' },
          { id: 19, name: '查询用户角色' }
        ]
      },
      {
        id: 2,
        name: '菜单管理',
        list: [
          { id: 21, name: '给角色分配菜单' },
          { id: 22, name: '获取所有菜单' },
          { id: 23, name: '获取编辑菜单页面信息' },
          { id: 24, name: '获取所有菜单并按层级展示' },
          { id: 25, name: '按条件分页查询菜单' },
          { id: 26, name: '获取角色拥有的菜单列表' },
          { id: 27, name: '保存或心脏菜单' },
          { id: 28, name: '是否显示开关' },
          { id: 29, name: '根据ID查询菜单' },
          { id: 30, name: '删除菜单' }
        ]
      },
      {
        id: 3,
        name: '资源管理',
        list: [
          { id: 31, name: '给角色分配资源' },
          { id: 32, name: '查询资源分类列表' },
          { id: 33, name: '保存或更新资源分类' },
          { id: 34, name: '删除资源分类' },
          { id: 35, name: '获取所有资源' },
          { id: 36, name: '按条件分页查询资源' },
          { id: 37, name: '获取角色拥有的资源列表' },
          { id: 38, name: '保存或者更新资源' },
          { id: 39, name: '获取资源' },
          { id: 40, name: '删除资源' }
        ]
      }
    ]
  })
}

export const roleResources = () => {
  return Mock.mock({
    code: '000000',
    msg: '处理成功',
    time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
    data: [
      {
        id: 1,
        name: '角色管理',
        list: [
          { id: 11, name: '获取所有角色', 'selected|1-2': true },
          { id: 12, name: '给用户分配角色', 'selected|1-2': true },
          { id: 13, name: '按条件查询角色', 'selected|1-2': true },
          { id: 14, name: '列出所有角色并标记用户是否拥有', 'selected|1-2': true },
          { id: 15, name: '保存或者更新角色', 'selected|1-2': true },
          { id: 16, name: '查询用户角色', 'selected|1-2': true },
          { id: 17, name: '获取角色', 'selected|1-2': true },
          { id: 18, name: '删除角色', 'selected|1-2': true }
        ]
      },
      {
        id: 2,
        name: '菜单管理',
        list: [
          { id: 21, name: '给角色分配菜单', 'selected|1-2': true },
          { id: 22, name: '获取所有菜单', 'selected|1-2': true },
          { id: 23, name: '获取编辑菜单页面信息', 'selected|1-2': true },
          { id: 24, name: '获取所有菜单并按层级展示', 'selected|1-2': true },
          { id: 25, name: '按条件分页查询菜单', 'selected|1-2': true },
          { id: 26, name: '获取角色拥有的菜单列表', 'selected|1-2': true },
          { id: 27, name: '保存或心脏菜单', 'selected|1-2': true },
          { id: 28, name: '是否显示开关', 'selected|1-2': true },
          { id: 29, name: '根据ID查询菜单', 'selected|1-2': true },
          { id: 30, name: '删除菜单', 'selected|1-2': true }
        ]
      },
      {
        id: 3,
        name: '资源管理',
        list: [
          { id: 31, name: '给角色分配资源', 'selected|1-2': true },
          { id: 32, name: '查询资源分类列表', 'selected|1-2': true },
          { id: 33, name: '保存或更新资源分类', 'selected|1-2': true },
          { id: 34, name: '删除资源分类', 'selected|1-2': true },
          { id: 35, name: '获取所有资源', 'selected|1-2': true },
          { id: 36, name: '按条件分页查询资源', 'selected|1-2': true },
          { id: 37, name: '获取角色拥有的资源列表', 'selected|1-2': true },
          { id: 38, name: '保存或者更新资源', 'selected|1-2': true },
          { id: 39, name: '获取资源', 'selected|1-2': true },
          { id: 40, name: '删除资源', 'selected|1-2': true }
        ]
      }
    ]
  })
}
