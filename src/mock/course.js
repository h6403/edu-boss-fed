import Mock from 'mockjs'

// 分页获取课程列表数据
export const coursePages = () => {
  return Mock.mock({
    code: '000000',
    msg: '处理成功',
    time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
    data: {
      'records|10': [
        {
          id: '@increment(100)',
          courseName: '@cword(5, 15)',
          price: '@integer(100, 10000)',
          sortNum: '@increment()',
          createdTime: '@datetime',
          'status|+1': [0, 1]
        }
      ],
      'total|10-100': 20
    }
  })
}

// 上传图片地址
export const courseImage = () => {
  return Mock.mock({
    code: '000000',
    msg: '处理成功',
    time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
    data: {
      // name: Mock.Random.image('200x200', '')
      name: Mock.Random.image('300x300', '#50B347', '#FFF', '')
    }
  })
}

// 单条课程信息
export const courseInfo = () => {
  return Mock.mock({
    code: '000000',
    msg: '处理成功',
    time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
    data: {
      id: '@id',
      // 课程名称
      courseName: '@cword(5,30)',
      // 课程简介
      brief: '@cword(50,100)',
      // 课程排序
      sortNum: '@increment(100)',
      // 课程概述1
      previewFirstField: '@cword(10,20)',
      // 课程概述2
      previewSecondField: '@cword(10,20)',
      // 讲师信息
      teacherDTO: {
        id: '@id',
        courseId: function () {
          return this.id
        },
        // 讲师姓名
        teacherName: '@cname',
        teacherHeadPicUrl: '',
        // 讲师职位
        position: '@cword(5,20)',
        // 讲师简介
        description: '@cword(50,100)'
      },
      // 课程封面
      courseListImg: Mock.Random.image('300x300', '#50B347', '#FFF', ''),
      // 解锁封面
      courseImgUrl: Mock.Random.image('300x300', '#894FC4', '#FFF', ''),
      // 商品原价
      'price|1000-10000': 1000,
      // 售卖价格
      discounts: function () {
        return this.price - 500
      },
      priceTag: '',
      // 活动标签
      discountsTag: '@cword(4)',
      // 销量
      'sales|10-100': 10,
      // 是否开启秒杀
      activityCourse: true,
      // 秒杀信息
      activityCourseDTO: {
        id: '@id',
        courseId: '@id',
        // 开始时间
        beginTime: '@datetime',
        // 结束时间
        endTime: '@datetime',
        // 秒杀价
        amount: 999,
        // 秒杀库存
        stock: 100
      },
      // 课程详情
      courseDescriptionMarkDown: '<p><h3 id="awm13">课程背景</h3>TypeScript 是 JavaScript 的超集，并且很好地弥补了 JavaScript 在静态类型检查方面的缺陷，在不严重破坏代码的情况下，开发人员可以更轻松地避免错误并进行代码重构。国内各大互联网公司和中小型团队都在使用 TypeScript 开发项目。<br/>对于前端工程师来说，掌握 TypeScript 不仅可以助力眼前的面试，同时也决定了你未来技术发展的上线。<br/><h3 id="rsrri">专栏解读</h3>这个专栏从环境搭建开始，由浅入深讲解了三个模块的内容，帮助你快速掌握 TypeScript 技术栈，学会构建高可读性、高稳定性前端应用。<br/><h4 id="4w3ps">模块一：TypeScript 入门</h4>这个模块将介绍 TypeScript 环境搭建，并结合浅显易懂的示例与应用场景讲解 TypeScript 基础类型。这部分内容是掌握 TypeScript 编程的一块敲门砖，学完之后，你将对 TypeScript 的核心知识和概念有个整体印象。<br/><h4 id="y64np">模块二：TypeScript 进阶</h4>这个模块主要讲解类型守卫、类型兼容、工具类型等概念，及其在实际业务中的作用和使用技巧。学完之后，能加深你对进阶知识和工具的理解，并教你掌握造轮子（打造自己的工具类型）进行类型编程的能力。<br/><h4 id="018fa">模块三：实战指南</h4>这个模块将结合业务实战系统地讲解 TypeScript Config 配置、TypeScript 常见错误分析定位、浏览器等知识，以及 JavaScript 项目改造实践。还会穿插讲师历经数百个应用开发总结出来的 TypeScript 开发最佳实践经验，助你在业务开发中更好地应用 TypeScript。<br/><h3 id="caztf">讲师简介</h3>乾元 快手资深前端技术专家，快手轻雀协作前端负责人<br/>曾就职于百度、去哪儿、搜狗等大厂，现就职于快手，负责快手第一款 SaaS 应用轻雀协作的前端架构和团队管理工作。<br/><h3 id="qqccj">课程大纲</h3><div><img src="https://s0.lgstatic.com/i/image6/M00/3E/31/Cgp9HWCYmL6AGS5RAAGHBmAhD7c973.png" style="max-width:100%;" contenteditable="false"/></div><div></div></p><p><h3 id="95p73">订阅须知</h3>1.本专栏共 22 讲，每周 二、四 更新；<br/>2.支持 视频+音频+图文 3 种阅读形式；<br/>3.购买后在拉勾教育 App/PC，可永久观看课程；<br/>4.视频课程为虚拟商品，一旦售出不可申请退款；<br/>5.本课程版权归拉勾所有，严禁翻录，违者必究；<br/>6.如有问题请咨询客服同学，召唤客服&gt;&gt;&gt;</p>',
      autoOnlineTime: '',
      isNew: true,
      isNewDes: '',
      status: 0
    }
  })
}
