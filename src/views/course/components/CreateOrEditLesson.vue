<template>
  <div class="create-or-edit-lesson">
    <el-form
        label-width="120px"
        ref="form"
        :model="lesson"
        :rules="rules"
        v-loading="isLoading">
      <el-form-item label="课程名称">
        <el-input
          :value="courseName"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="章节名称">
        <el-input
          :value="sectionName"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="课时名称" prop="theme">
        <el-input
          v-model="lesson.theme"
          maxlength="25"
        ></el-input>
      </el-form-item>
      <el-form-item label="时长" prop="duration">
        <el-input
          type="number"
          v-model="lesson.duration"
          :min="0"
        >
          <template slot="append">分钟</template>
        </el-input>
      </el-form-item>
      <el-form-item label="是否开放试听" prop="isFree">
        <el-switch
          v-model="lesson.isFree"
          active-color="#13ce66"
          inactive-color="#D8DBE6">
        </el-switch>
      </el-form-item>
      <el-form-item label="课时排序">
        <el-input
          type="number"
          v-model="lesson.orderNum"
          :min="0"
        >
          <template slot="append">数据控制排序，数据越大越靠后</template>
        </el-input>
      </el-form-item>
      <el-form-item class="footer-button">
        <el-button
          @click="cancel"
        >取消</el-button>
        <el-button
          type="primary"
          @click="onSave"
          :loading="isSaving"
        >确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { saveOrUpdateLesson, getLessonById } from '@/services/course-section'

export default {
  name: 'CreateOrEditLesson',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    courseId: {
      type: [String, Number],
      required: true
    },
    courseName: {
      type: String
    },
    sectionId: {
      type: [String, Number]
    },
    sectionName: {
      type: String
    },
    lessonId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      lesson: {
        theme: '',
        duration: '',
        isFree: false,
        orderNum: ''
      },
      rules: {
        theme: [
          { required: true, message: '请输入课时名称', trigger: 'blur' }
        ],
        duration: [
          { required: true, message: '请输入时长', trigger: 'blur' }
        ],
        isFree: [
          { required: true }
        ]
      },
      isLoading: false,
      isSaving: false
    }
  },
  created () {
    if (this.isEdit) {
      this.loadLesson()
    }
  },
  methods: {
    // 编辑时加载课时信息
    async loadLesson () {
      this.isLoading = true
      const { data } = await getLessonById(this.lessonId)
      if (data.code === '000000') {
        this.lesson = data.data
      }
      this.isLoading = false
    },
    // 保存
    async onSave () {
      try {
        await this.$refs.form.validate()
        this.isSaving = true
        this.lesson.courseId = this.courseId
        this.lesson.sectionId = this.sectionId
        const { data } = await saveOrUpdateLesson(this.lesson)
        if (data.code === '000000') {
          this.$message.success('保存章节成功')
          this.$emit('success')
        }
        this.isSaving = false
        this.lesson = {}
      } catch (err) {
      }
    },
    cancel () {
      // 清空表单
      this.lesson = {}
      // 关闭对话框（子组件向父组件传递状态）
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .footer-button .el-form-item__content {
  text-align: right;
  top: 30px;
}
::v-deep .el-form-item .el-textarea__inner {
  height: 80px;
}
</style>
