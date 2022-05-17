import { courseImage, courseInfo, coursePages } from '@/mock/course'
import { sectionAndLessons, sectionInfo, lessonInfo } from '@/mock/course-section'
import { allMenus, menuInfo, menuNodeList, roleMenus } from '@/mock/menu'
import { resourceCategory, resourceCategoryList, resourceInfo, resourcePages, roleResources } from '@/mock/resource'
import { allRoles, roleInfo, rolePages, userRoles } from '@/mock/role'
import { loginResult, refreshTokenData, userInfo, userPages } from '@/mock/user'
import Mock from 'mockjs'

// 配置延迟
Mock.setup({
  timeout: '800-1500'
})

const successResult = Mock.mock({
  code: '000000',
  msg: '处理成功',
  time: Mock.Random.now('yyyy-MM-dd HH:mm:ss SS'),
  data: true
})

// 登陆接口
Mock.mock(/\/front\/user\/login/, 'post', loginResult)

// 获取用户信息接口
Mock.mock(/\/front\/user\/getInfo/, 'get', userInfo)

// 刷新token数据接口
Mock.mock(/\/front\/user\/refresh_token/, 'get', refreshTokenData)

// 新增/更新 菜单接口
Mock.mock(/\/boss\/menu\/saveOrUpdate/, 'post', successResult)

// 获取编辑菜单⻚⾯信息
Mock.mock(/\/boss\/menu\/getEditMenuInfo/, 'get', menuInfo)

// 获取所有菜单
Mock.mock(/\/boss\/menu\/getAll/, 'get', allMenus)

// 删除菜单
Mock.mock(/\/boss\/menu\//, 'delete', successResult)

// 获取资源列表分页数据
Mock.mock(/\/boss\/resource\/getResourcePages/, 'post', resourcePages)

// 获取资源分类数据
Mock.mock(/\/boss\/resource\/category\/getAll/, 'get', resourceCategory)

// 删除资源
Mock.mock(/\/boss\/resource\//, 'delete', successResult)

// 新增/更新 资源接口
Mock.mock(/\/boss\/resource\/saveOrUpdate/, 'post', successResult)

// 获取编辑资源⻚⾯信息
Mock.mock(/\/boss\/resource\/getEditResourceInfo/, 'get', resourceInfo)

// 获取角色列表分页数据
Mock.mock(/\/boss\/role\/getRolePages/, 'post', rolePages)

// 删除角色
Mock.mock(/\/boss\/role\//, 'delete', successResult)

// 获取编辑角色⻚⾯信息
Mock.mock(/\/boss\/role\/getEditRoleInfo/, 'get', roleInfo)

// 新增/更新 角色接口
Mock.mock(/\/boss\/role\/saveOrUpdate/, 'post', successResult)

// 获取所有菜单并按层级展示
Mock.mock(/\/boss\/menu\/getMenuNodeList/, 'get', menuNodeList)

// 给角色分配菜单接口
Mock.mock(/\/boss\/menu\/allocateRoleMenus/, 'post', successResult)

// 获取角色拥有的菜单数据
Mock.mock(/\/boss\/menu\/getRoleMenus/, 'get', roleMenus)

// 获取所有资源并按资源分类展示
Mock.mock(/\/boss\/resource\/getResourceCategoryList/, 'get', resourceCategoryList)

// 给角色分配资源接口
Mock.mock(/\/boss\/resource\/allocateRoleResources/, 'post', successResult)

// 获取角色拥有的菜单数据
Mock.mock(/\/boss\/resource\/getRoleResources/, 'get', roleResources)

// 获取用户列表分页数据
Mock.mock(/\/boss\/user\/getUserPages/, 'post', userPages)

// 删除用户
Mock.mock(/\/boss\/user\//, 'delete', successResult)

// 封禁⽤户
Mock.mock(/\/boss\/user\/forbidUser/, 'post', successResult)

// 启用⽤户
Mock.mock(/\/boss\/user\/enableUser/, 'post', successResult)

// 获取所有角色
Mock.mock(/\/boss\/role\/all/, 'get', allRoles)

// 给用户分配角色
Mock.mock(/\/boss\/role\/allocateUserRoles/, 'post', successResult)

// 获取用户已分配的角色
Mock.mock(/\/boss\/role\/user/, 'get', userRoles)

// 获取课程列表分页数据
Mock.mock(/\/boss\/course\/getQueryCourses/, 'post', coursePages)

// 课程上下架
Mock.mock(/\/boss\/course\/changeState/, 'get', successResult)

// 课程图片上传
Mock.mock(/\/boss\/course\/upload/, 'post', courseImage)

// 保存或更新课程信息
Mock.mock(/\/boss\/course\/saveOrUpdateCourse/, 'post', successResult)

// 根据id获取课程信息
Mock.mock(/\/boss\/course\/getCourseById/, 'get', courseInfo)

// 根据课程id获取章节和课时数据
Mock.mock(/\/boss\/course\/section\/getSectionAndLesson/, 'get', sectionAndLessons)

// 保存或更新章节信息
Mock.mock(/\/boss\/course\/section\/saveOrUpdateSection/, 'post', successResult)

// 保存或更新课时信息
Mock.mock(/\/boss\/course\/lesson\/saveOrUpdate/, 'post', successResult)

// 根据id获取章节数据
Mock.mock(/\/boss\/course\/section\/getSectionById/, 'get', sectionInfo)

// 根据id获取课时数据
Mock.mock(/\/boss\/course\/lesson\/getLessonById/, 'get', lessonInfo)
