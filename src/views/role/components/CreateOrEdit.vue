<template>
  <div class="edit-form-div">
    <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        v-loading="isLoading"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="form.description" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="isSubmit" @click="onSubmit">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { createOrUpdateRole, getEditRoleInfo } from '@/services/role'

export default {
  name: 'CreateOrEdit',
  props: {
    isEdit: {
      // 要求类型为布尔，默认值 false，即默认为新增功能
      type: Boolean,
      default: false
    },
    roleId: {
      type: [Number, String]
    }
  },
  data () {
    return {
      form: {
        code: '',
        name: '',
        description: ''
      },
      isLoading: false,
      isSubmit: false,
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入角色编码', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' },
          { max: 250, message: '长度不能超过250个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // 编辑功能则加载数据
    if (this.isEdit) {
      this.getEditRoleInfo()
    }
  },
  methods: {
    async onSubmit () {
      try {
        // 1. 表单验证
        await this.$refs.form.validate()
        this.isSubmit = true
        // 2. 验证通过，提交表单
        const { data } = await createOrUpdateRole(this.form)
        // 检测是否提交成功，成功时 data.code 为 '000000
        if (data.code === '000000') {
          // 清空表单
          this.form = {}
          // 成功提示
          this.$message.success('提交成功')
          // 关闭对话框（子组件向父组件传递状态）
          this.$emit('success')
        }
        this.isSubmit = false
      } catch (err) {}
    },
    // 加载当前编辑的角色数据
    async getEditRoleInfo () {
      this.isLoading = true
      const { data } = await getEditRoleInfo(this.roleId)
      // 请求成功，保存到 data 中
      if (data.code === '000000') {
        this.form = data.data
      }
      this.isLoading = false
    },
    cancel () {
      // 清空表单
      this.form = {}
      // 关闭对话框（子组件向父组件传递状态）
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped></style>
