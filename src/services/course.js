import request from '@/utils/request'

// 按条件分页查询课程接口
export const getQueryCourses = data => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

// 删除课程
export const deleteCourse = id => {
  return request({
    method: 'DELETE',
    url: `/boss/course/${id}`
  })
}

// 课程上下架接口
export const changeState = params => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params
  })
}

// 保存或更新课程信息
export const saveOrUpdateCourse = data => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}

// 上传图⽚
export const uploadCourseImage = (data, onUploadProgress) => {
  // 接⼝要求的请求数据类型为：multipart/form-data
  // 所以需要提交 FormData 数据对象
  return request({
    method: 'POST',
    // url: 'https://jsonplaceholder.typicode.com/posts/',
    url: '/boss/course/upload',
    data/* ,
    // Axios 将 HTML5 新增的上传进度事件：progress
    onUploadProgress */
  })
}

// 通过课程Id获取课程信息
export const getCourseById = courseId => {
  return request({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: {
      courseId
    }
  })
}
