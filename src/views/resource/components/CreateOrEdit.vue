<template>
  <div class="edit-form-div">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? '编辑资源' : '添加资源' }}</span>
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择资源分类">
            <!-- 动态选项 -->
            <el-option
              v-for="item in resourceCategory"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getResourceCategory, createOrUpdateResource, getEditResourceInfo } from '@/services/resource'

export default {
  name: 'CreateOrEdit',
  props: {
    isEdit: {
      // 要求类型为布尔，默认值 false，即默认为新增功能
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        id: '',
        categoryId: '',
        name: '',
        url: '',
        description: ''
      },
      // 存储资源分类信息
      resourceCategory: [],
      rules: {
        name: [
          { required: true, message: '请输入资源名称', trigger: 'blur' },
          { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入资源路径', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' },
          { max: 250, message: '长度不能超过250个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // 请求资源分类数据
    this.loadResourceCategory()
    // 编辑功能则加载资源数据
    if (this.isEdit) {
      this.getEditResourceInfo()
    }
  },
  methods: {
    async onSubmit () {
      try {
        // 1. 表单验证
        await this.$refs.form.validate()
        // 2. 验证通过，提交表单
        const { data } = await createOrUpdateResource(this.form)
        // 检测是否提交成功，成功时 data.code 为 '000000
        if (data.code === '000000') {
          // 成功提示
          this.$message.success('提交成功')
          // 跳回菜单⻚⾯
          this.$router.push('/resource')
        }
      } catch (err) {}
    },
    // 加载当前编辑的资源数据
    async getEditResourceInfo () {
      const id = this.$route.params.id
      const { data } = await getEditResourceInfo(id)
      // 请求成功，保存到 data 中
      if (data.code === '000000') {
        this.form = data.data
      }
    },
    // 加载资源分类数据
    async loadResourceCategory () {
      const { data } = await getResourceCategory()
      if (data.code === '000000') {
        this.resourceCategory = data.data
      }
    },
    goBack () {
      // this.$router.go(-1)
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form {
  width: 500px;
  .el-select {
      .el-input {
          width: 420px;
      }
  }
}
</style>
