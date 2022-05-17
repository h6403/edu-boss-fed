<template>
  <div class="login">
    <el-form
      label-position="top"
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="loginForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
       <el-form-item>
        <el-button type="primary" :loading="isLoginLoading" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/services/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      loginForm: {
        phone: '13533895152',
        password: '123456'
      },
      // 表单校验规则对象
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度为 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      // 登录加载状态，默认不处于加载中
      isLoginLoading: false
    }
  },
  methods: {
    async onSubmit () {
      try {
        // 1. 表单验证
        await this.$refs.loginForm.validate()
        // 2. 请求，这里通过 es6 对象解构得到结果中的 data 数据
        this.isLoginLoading = true
        const { data } = await login(this.loginForm)
        this.isLoginLoading = false
        // 3. 响应处理
        if (data.state === 1) {
          this.$message.success(data.message)
          // 当登录成功时，记录登录状态，存储到 Vuex 中
          this.$store.commit('setUser', data.content)
          // this.$router.push('/')
          /* this.$router.push({
            name: 'home'
          }) */
          // 登录成功后跳转路由
          // 1. 如果路由信息中存在 redirect 则跳转到这个路由
          // 2. 如果不存在，说明是正常登录，跳转⾸⻚ home 即可
          this.$router.push(this.$route.query.redirect || '/')
        } else {
          this.$message.error(data.message)
        }
      } catch (err) {
        console.log('验证失败', err)
      }
    }
  }
}
</script>

<style lang="scss">
.login {
  // 容器撑满⾼度
  height: 100vh;
  display: flex;
  // 内容⽔平垂直居中
  justify-content: center;
  align-items: center;

  .el-form {
    background-color: #fff;
    width: 300px;
    padding: 20px;
    border-radius: 10px;

    .el-button {
      width: 100%;
    }
  }
}
</style>
