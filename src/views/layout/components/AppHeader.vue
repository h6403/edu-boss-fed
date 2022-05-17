<template>
    <div class="app-header">
        <!-- 左侧面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 右侧下拉菜单 -->
        <el-dropdown>
            <span class="el-dropdown-link">
                <!-- Avatar 头像组件 -->
                 <el-avatar
                    :size="30"
                    :src="userInfo.portrait || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
                ></el-avatar>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
                <!-- divided 属性⽤于设置分割线 -->
                <el-dropdown-item
                    divided
                    @click.native="logout"
                >退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
// 引入获取用户信息接口
import { getUserInfo } from '@/services/user'

export default {
  name: 'AppHeader',
  created () {
    this.loadUserInfo()
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    // 加载用户信息方法
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
    },
    // 退出登录
    logout () {
      this.$confirm('确认退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除 store 中的⽤户信息
        this.$store.commit('setUser', null)
        // 跳转到登录⻚
        this.$router.push('/login')
        // 退出成功提示
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-header {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown-link {
        display: flex;
        align-items: center;
    }
  }
</style>
