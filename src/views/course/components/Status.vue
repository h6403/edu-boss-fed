<template>
  <div class="status-div">
    <div class="status-info-div">
      <i class="el-icon-info"></i>
      <div class="status-text">当前状态：{{ statusText }}</div>
    </div>
    <el-form label-width="120px">
      <el-form-item label="状态变更为：">
        <el-select
          v-model="status"
          placeholder="请选择">
          <el-option
            v-for="item in statuss"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
import { saveOrUpdateSection, saveOrUpdateLesson } from '@/services/course-section'

export default {
  name: 'EditStatus',
  props: {
    editStatusType: {
      type: String
    },
    editStatusId: {
      type: [String, Number]
    },
    editStatusValue: {
      type: Number
    }
  },
  data () {
    return {
      statuss: [
        { value: 0, label: '已隐藏' },
        { value: 1, label: '待更新' },
        { value: 2, label: '已更新' }
      ],
      status: '',
      statusText: '',
      isSaving: false
    }
  },
  created () {
    this.initStatus()
  },
  methods: {
    initStatus () {
      this.status = this.editStatusValue
      this.getStatusText(this.status)
    },
    getStatusText (val) {
      this.statuss.forEach(item => {
        if (item.value === val) {
          this.statusText = item.label
          return false
        }
      })
    },
    async onSave () {
      this.isSaving = true
      const params = {
        id: this.editStatusId,
        status: this.status
      }
      let data
      if (this.editStatusType === 'section') {
        data = await saveOrUpdateSection(params)
      } else {
        data = await saveOrUpdateLesson(params)
      }
      if (data.data.code === '000000') {
        this.$message.success('状态更新成功！')
      }
      this.$emit('success', this.status)
      this.isSaving = false
    },
    cancel () {
      // 关闭对话框（子组件向父组件传递状态）
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.status-info-div {
  text-align: center;
  .el-icon-info {
    font-size: 50px;
  }
  .status-text {
    padding: 20px;
    font-size: 24px;
  }
}

::v-deep .footer-button .el-form-item__content {
  text-align: right;
  top: 30px;
}
</style>
