<template>
  <div class="create-or-edit-section">
    <el-form
        label-width="100px"
        ref="form"
        :model="section"
        :rules="rules"
        v-loading="isLoading">
      <el-form-item label="课程名称">
        <el-input
          :value="courseName"
          disabled
        ></el-input>
        </el-form-item>
      <el-form-item label="章节名称" prop="sectionName">
        <el-input
          v-model="section.sectionName"
          maxlength="25"
        ></el-input>
      </el-form-item>
      <el-form-item label="章节描述" prop="description">
        <el-input
          type="textarea"
          v-model="section.description"
          maxlength="250"
        ></el-input>
      </el-form-item>
      <el-form-item label="章节排序">
        <el-input
          type="number"
          v-model="section.orderNum"
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
import { saveOrUpdateSection, getSectionById } from '@/services/course-section'

export default {
  name: 'CreateOrEditSection',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    sectionId: {
      type: [String, Number]
    },
    courseId: {
      type: [String, Number],
      required: true
    },
    courseName: {
      type: String
    }
  },
  data () {
    return {
      section: {
        sectionName: '',
        description: '',
        orderNum: ''
      },
      rules: {
        sectionName: [
          { required: true, message: '请输入章节名称', trigger: 'blur' }
        ]
      },
      isLoading: false,
      isSaving: false
    }
  },
  created () {
    if (this.isEdit) {
      this.loadSection()
    }
  },
  methods: {
    // 编辑时加载章节信息
    async loadSection () {
      this.isLoading = true
      const { data } = await getSectionById(this.sectionId)
      if (data.code === '000000') {
        this.section = data.data
      }
      this.isLoading = false
    },
    // 保存
    async onSave () {
      try {
        await this.$refs.form.validate()
        this.isSaving = true
        this.section.courseId = this.courseId
        const { data } = await saveOrUpdateSection(this.section)
        if (data.code === '000000') {
          this.$message.success('保存章节成功')
          this.$emit('success')
        }
        this.isSaving = false
        this.section = {}
      } catch (err) {
      }
    },
    cancel () {
      // 清空表单
      this.section = {}
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
