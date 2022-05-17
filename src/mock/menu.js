import Mock from 'mockjs'

// 获取编辑菜单⻚⾯信息
export const menuInfo = (opts) => {
  let menuObj = {
    id: /[0-9]{1,2}/,
    parentId: /[0-9]{1,2}/,
    name: '@cword(3, 5)',
    href: '/@word',
    icon: '',
    orderNum: 0,
    description: '@csentence',
    shown: true
  }
  if (opts.url.endsWith('?id=-1')) {
    menuObj = null
  }
  return Mock.mock({
    code: '000000',
    msg: '处理成功',
    time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
    data: {
      menuInfo: menuObj,
      'parentMenuList|1-10': [
        {
          name: '@cword(3, 5)',
          id: '@id', // /[0-9]{1,2}/,
          parentId: -1
        }
      ]
    }
  })
}

export const allMenus = () => {
  return Mock.mock({
    code: '000000',
    msg: '处理成功',
    time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
    'data|10-30': [
      {
        id: /[0-9]{1,2}/,
        name: '@cword(3, 5)',
        level: /[1-9]/,
        icon: () => {
          return Mock.Random.dataImage('30x30', '')
        },
        orderNum: /[1-9]/
      }
    ]
  })
}

export const menuNodeList = () => {
  return Mock.mock({
    code: '000000',
    msg: '处理成功',
    time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
    data: [
      {
        id: 1,
        name: '权限管理',
        subMenuList: [
          { id: 2, name: '角色列表' },
          { id: 3, name: '菜单列表' },
          { id: 4, name: '资源列表' },
          { id: 5, name: '给角色分配菜单页面' },
          { id: 6, name: '给角色分配资源页面' },
          { id: 7, name: '添加菜单页面' },
          { id: 8, name: '更新菜单页面' },
          { id: 9, name: '资源分类列表页面' },
          { id: 10, name: '添加资源页面' },
          { id: 11, name: '更新资源页面' }
        ]
      },
      {
        id: 12,
        name: '课程管理',
        subMenuList: [
          { id: 13, name: '课程详情页面' },
          { id: 14, name: '课时信息页面' },
          { id: 15, name: '课时上传视频' }
        ]
      },
      {
        id: 16,
        name: '用户管理',
        subMenuList: []
      },
      {
        id: 17,
        name: '广告管理',
        subMenuList: [
          { id: 18, name: '广告列表' },
          { id: 19, name: '广告位列表' },
          { id: 20, name: '添加广告页面' },
          { id: 21, name: '编辑广告页面' },
          { id: 22, name: '添加广告位页面' },
          { id: 23, name: '编辑广告位页面' }
        ]
      }
    ]
  })
}

export const roleMenus = () => {
  return Mock.mock({
    code: '000000',
    msg: '处理成功',
    time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
    data: [
      {
        id: 1,
        name: '权限管理',
        'selected|1-2': true,
        subMenuList: [
          { id: 2, name: '角色列表', 'selected|1-2': true },
          { id: 3, name: '菜单列表', 'selected|1-2': true },
          { id: 4, name: '资源列表', 'selected|1-2': true },
          { id: 5, name: '给角色分配菜单页面', 'selected|1-2': true },
          { id: 6, name: '给角色分配资源页面', 'selected|1-2': true },
          { id: 7, name: '添加菜单页面', 'selected|1-2': true },
          { id: 8, name: '更新菜单页面', 'selected|1-2': true },
          { id: 9, name: '资源分类列表页面', 'selected|1-2': true },
          { id: 10, name: '添加资源页面', 'selected|1-2': true },
          { id: 11, name: '更新资源页面', 'selected|1-2': true }
        ]
      },
      {
        id: 12,
        name: '课程管理',
        'selected|1-2': true,
        subMenuList: [
          { id: 13, name: '课程详情页面', 'selected|1-2': true },
          { id: 14, name: '课时信息页面', 'selected|1-2': true },
          { id: 15, name: '课时上传视频', 'selected|1-2': true }
        ]
      },
      {
        id: 16,
        name: '用户管理',
        'selected|1-2': true,
        subMenuList: null
      },
      {
        id: 17,
        name: '广告管理',
        'selected|1-2': true,
        subMenuList: [
          { id: 18, name: '广告列表', 'selected|1-2': true },
          { id: 19, name: '广告位列表', 'selected|1-2': true },
          { id: 20, name: '添加广告页面', 'selected|1-2': true },
          { id: 21, name: '编辑广告页面', 'selected|1-2': true },
          { id: 22, name: '添加广告位页面', 'selected|1-2': true },
          { id: 23, name: '编辑广告位页面', 'selected|1-2': true }
        ]
      }
    ]
  })
}
