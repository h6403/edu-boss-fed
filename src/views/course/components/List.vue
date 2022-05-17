<template>
  <div class="course-list">
    <el-card class="box-card">
      <div slot="header">
        <span>数据筛选</span>
      </div>
      <el-form
        :inline="true"
        :model="filterParams"
        ref="filter-form"
        label-position="left"
      >
        <el-form-item label="课程名称：" prop="courseName">
          <el-input v-model="filterParams.courseName" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select v-model="filterParams.status">
            <el-option label="全部" value=""></el-option>
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="onReset">重置</el-button>
          <el-button
            type="primary"
            @click="onSubmit"
            :disabled="isLoading"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">
        <span>查询结果：</span>
        <el-button
          style="float: right; margin-top: -10px"
          type="primary"
          :disabled="isLoading"
          @click="$router.push({ name: 'course-create' })"
        >添加课程</el-button>
      </div>
      <el-table
        :data="courses"
        style="width: 100%;margin-bottom: 20px;"
        v-loading="isLoading"
      >
        <el-table-column
          prop="id"
          width="100"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="sortNum"
          label="排序">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :disabled="scope.row.isStatusChangeing"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="onStateChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="$router.push({
                name: 'course-edit',
                params: {
                  courseId: scope.row.id
                }
              })"
            >编辑</el-button>
            <el-button
              @click="$router.push({
                name: 'course-section',
                params: {
                  courseId: scope.row.id
                },
                query: {
                  courseName: encodeURIComponent(scope.row.courseName)
                }
              })"
            >内容管理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="filterParams.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="filterParams.size"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :disabled="isLoading"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getQueryCourses, changeState } from '@/services/course'

export default {
  name: 'CourseList',
  data () {
    return {
      filterParams: {
        // 当前页，默认为 1
        current: 1,
        // 每⻚数据条数
        size: 10,
        courseName: '',
        status: ''
      },
      // 数据总条数
      totalCount: 0,
      courses: [],
      isLoading: false
    }
  },
  created () {
    this.loadCoursePages()
  },
  methods: {
    // 每页显示条数变化时触发
    handleSizeChange (val) {
      this.filterParams.size = val
      // 由于修改了每页条数，应当将页数还原到默认值1
      this.filterParams.current = 1
      this.loadCoursePages()
    },
    // 页号改变时触发
    handleCurrentChange (val) {
      this.loadCoursePages()
    },
    // 加载课程列表分页数据
    async loadCoursePages () {
      this.isLoading = true
      const { data } = await getQueryCourses(this.filterParams)
      if (data.code === '000000') {
        // 给每条数据添加一个属性，用于表示是否正在更改该条课程数据的上下架状态，避免频繁触发上下架switch组件发送请求
        data.data.records.forEach(item => {
          item.isStatusChangeing = false
        })
        this.courses = data.data.records
        this.totalCount = data.data.total
      }
      this.isLoading = false
    },
    // 提交列表查询
    onSubmit () {
      this.filterParams.current = 1
      this.loadCoursePages()
    },
    // 重置列表查询表单
    onReset () {
      this.$refs['filter-form'].resetFields()
    },
    // 课程上下架
    async onStateChange (course) {
      // 请求发送前，更改课程操作状态
      course.isStatusChangeing = true
      const { data } = await changeState({
        courseId: course.id,
        status: course.status
      })
      if (data.code === '000000') {
        this.$message.success(`${course.status === 1 ? '上架' : '下架'}成功`)
      } else {
        this.$message.error(`${course.status === 1 ? '上架' : '下架'}失败`)
        course.status = course.status === 1 ? 0 : 1
      }
      // 请求完毕，更改课程操作状态
      course.isStatusChangeing = false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}
</style>
