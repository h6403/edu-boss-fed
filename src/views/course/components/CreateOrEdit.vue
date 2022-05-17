<template>
  <div class="course-create-or-edit">
    <el-card v-loading="isLoading">
      <!-- 设置 slot 后 Element 会⾃动设置为上下两部分的布局样式（具有分割 线） -->
      <div slot="header">
        <el-steps :active="activeStep" simple>
          <el-step
            v-for="(step, i) in steps"
            :key="step.id"
            :title="step.title"
            :icon="step.icon"
            @click.native="activeStep=i"
          ></el-step>
        </el-steps>
      </div>
      <!-- 步骤容器 -->
      <el-form
        label-width="100px"
        ref="form"
        :model="course"
        :rules="rules">
        <!-- 基本信息 -->
        <div v-show="activeStep === 0">
          <el-form-item label="课程名称" prop="courseName">
            <el-input
              v-model="course.courseName"
              maxlength="50"
              show-word-limit
            ></el-input>
            </el-form-item>
          <el-form-item label="课程简介" prop="brief">
            <el-input
              v-model="course.brief"
              maxlength="100"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="课程概述" required>
            <div style="float: left;width: 49.5%;margin-right: 1%;">
              <el-form-item prop="previewFirstField">
                <el-input
                  v-model="course.previewFirstField"
                  placeholder="概述1"
                  maxlength="20"
                  show-word-limit
                >
                </el-input>
              </el-form-item>
            </div>
            <div style="float: left;width: 49.5%;">
              <el-form-item prop="previewSecondField">
                <el-input
                  v-model="course.previewSecondField"
                  placeholder="概述2"
                  maxlength="20"
                  show-word-limit
                >
                </el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="讲师姓名" prop="teacherDTO.teacherName">
            <el-input
              v-model="course.teacherDTO.teacherName"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="讲师职位" prop="teacherDTO.position">
            <el-input
              v-model="course.teacherDTO.position"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="讲师简介" prop="teacherDTO.description">
            <el-input
              v-model="course.teacherDTO.description"
              maxlength="100"
              show-word-limit
            ></el-input >
          </el-form-item>
          <el-form-item label="课程排序" prop="sortNum">
            <el-input-number
              v-model="course.sortNum"
              label="描述⽂字"
              controls-position="right"
            ></el-input-number>
            <span style="margin-left: 10px;color: #909399;">（数字控制排序，数字越大越靠后）</span>
          </el-form-item>
        </div>
        <!-- 课程封⾯ -->
        <div v-show="activeStep === 1">
          <course-image
            label="课程封面"
            v-model="course.courseListImg"
            info="建议尺寸：230*300px，JPG、PNG格式，图片小于150k"
          ></course-image>
          <course-image
            label="解锁封面"
            v-model="course.courseImgUrl"
            info="建议尺寸：750*422px，JPG、PNG格式，图片小于150k"
          ></course-image>
        </div>
        <!-- 销售信息 -->
        <div v-show="activeStep === 2">
          <el-form-item label="售卖价格" prop="discounts">
            <el-input
              type="number"
              v-model="course.discounts"
              :min="0"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input
              type="number"
              v-model="course.price"
              :min="0"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input
              type="number"
              v-model="course.sales"
              :min="0"
            >
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input
              v-model="course.discountsTag"
              maxlength="4"
              show-word-limit
            ></el-input>
          </el-form-item>
        </div>
        <!-- 秒杀活动 -->
        <div v-show="activeStep === 3">
          <!-- 设置秒杀状态开关 -->
          <el-form-item label="限时秒杀开关" label-width="120px">
            <el-switch
              v-model="course.activityCourse"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <template v-if="course.activityCourse">
            <el-form-item label="开始时间">
              <el-date-picker
                type="datetime"
                placeholder="选择开始时间"
                v-model="course.activityCourseDTO.beginTime"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                type="datetime"
                placeholder="选择结束时间"
                v-model="course.activityCourseDTO.endTime"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价">
              <el-input v-model="course.activityCourseDTO.amount">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存">
              <el-input v-model="course.activityCourseDTO.stock">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <!-- 课程详情 -->
        <div v-show="activeStep === 4">
          <el-form-item label="课程详情">
            <text-editor v-model="course.courseDescriptionMarkDown"></text-editor>
          </el-form-item>
          <!-- 增加上架开关 -->
          <el-form-item label="是否上架">
            <el-switch
              v-model="course.status"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </div>
        <!-- 操作按钮 -->
        <el-form-item>
          <el-button
             v-if="activeStep !== steps.length-1"
            type="primary"
            @click="nextStep"
          >下⼀步</el-button>
          <el-button
            v-if="activeStep === steps.length-1"
            type="primary"
            @click="onSave"
            :loading="isSaving"
          >保存</el-button>
          <el-button
            @click="$router.back()"
          >返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { saveOrUpdateCourse, getCourseById } from '@/services/course'
import CourseImage from './CourseImage'
import TextEditor from '@/components/TextEditor'

export default {
  name: 'CreateOrEdit',
  components: {
    CourseImage,
    TextEditor
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    courseId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      activeStep: 0,
      steps: [
        { id: 1, title: '基本信息', icon: 'el-icon-edit' },
        { id: 2, title: '课程封⾯', icon: 'el-icon-upload' },
        { id: 3, title: '销售信息', icon: 'el-icon-picture' },
        { id: 4, title: '秒杀信息', icon: 'el-icon-picture' },
        { id: 5, title: '课程详情', icon: 'el-icon-picture' }
      ],
      // 课程信息
      course: {
        // id: '',
        // 课程名称
        courseName: '',
        // 课程简介
        brief: '',
        // 课程排序
        sortNum: 0,
        // 课程概述1
        previewFirstField: '',
        // 课程概述2
        previewSecondField: '',
        // 讲师信息
        teacherDTO: {
          // id: '',
          // courseId: '',
          // 讲师姓名
          teacherName: '',
          teacherHeadPicUrl: '',
          // 讲师职位
          position: '',
          // 讲师简介
          description: ''
        },
        // 课程封面
        courseListImg: '',
        // 解锁封面
        courseImgUrl: '',
        // 商品原价
        price: 0,
        // 售卖价格
        discounts: 0,
        priceTag: '',
        // 活动标签
        discountsTag: '',
        // 销量
        sales: 0,
        // 是否开启秒杀
        activityCourse: false,
        // 秒杀信息
        activityCourseDTO: {
          // id: '',
          // courseId: '',
          // 开始时间
          beginTime: '',
          // 结束时间
          endTime: '',
          // 秒杀价
          amount: 0,
          // 秒杀库存
          stock: 0
        },
        // 课程详情
        courseDescriptionMarkDown: '',
        autoOnlineTime: '',
        isNew: true,
        isNewDes: '',
        status: 0
      },
      isLoading: false,
      isSaving: false,
      // 校验规则
      rules: {
        courseName: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        brief: [
          { required: true, message: '请输入课程简介', trigger: 'blur' }
        ],
        previewFirstField: [
          { required: true, message: '请输入课程概述1', trigger: 'blur' }
        ],
        previewSecondField: [
          { required: true, message: '请输入课程概述2', trigger: 'blur' }
        ],
        'teacherDTO.teacherName': [
          { required: true, message: '请输入讲师姓名', trigger: 'blur' }
        ],
        'teacherDTO.position': [
          { required: true, message: '请输入讲师职位', trigger: 'blur' }
        ],
        'teacherDTO.description': [
          { required: true, message: '请输入讲师简介', trigger: 'blur' }
        ],
        sortNum: [
          { required: true, message: '请输入课程排序', trigger: 'blur' }
        ],
        discounts: [
          { required: true, message: '请输入售卖价格', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.isEdit) {
      // 编辑时，加载课程内容
      this.loadCourse()
    }
  },
  methods: {
    // 加载课程信息
    async loadCourse () {
      this.isLoading = true
      const { data } = await getCourseById(this.courseId)
      if (data.code === '000000') {
        // 为⾮秒杀课程初始化属性
        if (!data.data.activityCourse) {
          data.data.activityCourseDTO = {
            beginTime: '',
            endTime: '',
            amount: 0,
            stock: 0
          }
        }
        // 将要编辑的分类数据保存到 course 中
        this.course = data.data
      }
      this.isLoading = false
    },
    // 下一步
    nextStep () {
      const fileds = [
        ['courseName', 'brief', 'previewFirstField', 'previewSecondField', 'teacherDTO.teacherName', 'teacherDTO.position', 'teacherDTO.description', 'sortNum'],
        [],
        ['discounts'],
        [],
        []
      ]
      let errors = 0
      this.$refs.form.validateField(fileds[this.activeStep], errorMessage => {
        if (errorMessage) {
          errors++
        }
      })
      if (!errors) {
        this.activeStep++
      }
    },
    // 保存
    async onSave () {
      try {
        await this.$refs.form.validate()
        this.isSaving = true
        const { data } = await saveOrUpdateCourse(this.course)
        if (data.code === '000000') {
          this.$message.success('保存课程成功')
          this.$router.push({ name: 'course' })
        }
        this.isSaving = false
      } catch (err) {
        this.$message.warning('请检查并完善每个步骤中的必填信息！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-step {
  cursor: pointer;
}
</style>
