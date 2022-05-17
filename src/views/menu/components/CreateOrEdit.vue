<template>
  <div class="edit-form-div">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? '编辑菜单' : '添加菜单' }}</span>
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单">
            <!-- ⽆上级菜单选项 -->
            <el-option label="无上级菜单" value="-1"></el-option>
            <!-- 动态选项 -->
            <el-option
              v-for="item in parentMenuList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标" prop="icon">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.shown">
            <!-- radio 的 label 会同步给 v-model 的 shown，默认为字符串，更改绑定为布尔值 -->
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.orderNum" label="描述⽂字"></el-input-number>
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
import { createOrUpdateMenu, getEditMenuInfo } from '@/services/menu'

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
        parentId: '-1',
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: false
      },
      // 存储上级列表信息
      parentMenuList: [],
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
          { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' },
          { max: 250, message: '长度不能超过250个字符', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请输入菜单图标', trigger: 'blur' },
          { max: 10, message: '长度不能超过10个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // 请求上级菜单信息
    this.loadUpMenuInfo()
  },
  methods: {
    async onSubmit () {
      try {
        // 1. 表单验证
        await this.$refs.form.validate()
        // 2. 验证通过，提交表单
        const { data } = await createOrUpdateMenu(this.form)
        // 检测是否提交成功，成功时 data.code 为 '000000
        if (data.code === '000000') {
          // 成功提示
          this.$message.success('提交成功')
          // 跳回菜单⻚⾯
          this.$router.push('/menu')
        }
      } catch (err) {}
    },
    async loadUpMenuInfo () {
      // 编辑功能合并后，处理接⼝id，默认值 -1 为添加功能使⽤
      const id = this.$route.params.id || -1
      const { data } = await getEditMenuInfo(id)
      // 请求成功，保存到 data 中
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
        // 如果存在 menuInfo，说明为编辑功能，更新展示数据
        if (data.data.menuInfo) {
          this.form = data.data.menuInfo
        }
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
