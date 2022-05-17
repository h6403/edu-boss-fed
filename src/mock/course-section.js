import Mock from 'mockjs'

// 章节和课时数据
export const sectionAndLessons = () => {
  return Mock.mock({
    code: '000000',
    msg: '处理成功',
    time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
    data: [
      {
        id: 100,
        sectionName: '模块一：Webpack 背景介绍',
        status: 2,
        orderNum: 1,
        lessonDTOS: [{
          id: '100001',
          status: 2,
          sectionId: 100,
          theme: '第01讲：Webpack 究竟解决了什么问题？',
          orderNum: 1
        }]
      },
      {
        id: 101,
        sectionName: '模块二：Webpack 核心特性',
        status: 2,
        orderNum: 2,
        lessonDTOS: [{
          id: '101001',
          status: 2,
          sectionId: 101,
          theme: '第02讲：如何使用 Webpack 实现模块化打包？',
          orderNum: 1
        },
        {
          id: '101002',
          status: 0,
          sectionId: 101,
          theme: '第03讲：如何通过 Loader 实现特殊资源加载？',
          orderNum: 2
        },
        {
          id: '101003',
          status: 1,
          sectionId: 101,
          theme: '第04讲：如何利用插件机制横向扩展 Webpack 的构建能力？',
          orderNum: 3
        },
        {
          id: '101004',
          status: 1,
          sectionId: 101,
          theme: '第05讲：探索 Webpack 运行机制与核心工作原理',
          orderNum: 4
        }]
      },
      {
        id: 102,
        sectionName: '模块三：Webpack 高阶内容',
        status: 0,
        orderNum: 3,
        lessonDTOS: [{
          id: '102001',
          status: 2,
          sectionId: 102,
          theme: '第06讲：如何使用 Dev Server 提高你的本地开发效率？'
        }]
      }
    ]
  })
}

// 单条章节信息
export const sectionInfo = () => {
  return Mock.mock({
    code: '000000',
    msg: '处理成功',
    time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
    data: {
      id: '@id',
      orderNum: /\d{1}/,
      sectionName: '@cword(5,20)',
      description: '@cword(20,60)',
      status: 2
    }
  })
}

// 单条课时信息
export const lessonInfo = () => {
  return Mock.mock({
    code: '000000',
    msg: '处理成功',
    time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
    data: {
      id: '@id',
      orderNum: /\d{1}/,
      theme: '@cword(5,20)',
      'duration|1-100': 50,
      'isFree|1': true
    }
  })
}
