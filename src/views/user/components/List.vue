<template>
  <div class="user-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form
          :inline="true"
          :model="filterParams"
          ref="filter-form"
        >
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="filterParams.phone" clearable></el-input>
          </el-form-item>
          <el-form-item label="注册时间" prop="rangeDate">
            <el-date-picker
              v-model="filterParams.rangeDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd"
            />
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
      </div>
      <el-table
        :data="users"
        style="width: 100%"
        v-loading="isLoading"
      >
        <el-table-column
          prop="id"
          width="150"
          label="用户ID">
        </el-table-column>
        <el-table-column
          label="头像"
          width="100">
          <template slot-scope="scope">
            <img class="portrait" width="30px" :src="scope.row.portrait || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'">
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="注册时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="80">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-value="ENABLE"
              inactive-value="DISABLE"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="switchUserStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="allocateRoles(scope.row)"
            >分配角色</el-button>
            <el-button
              type="text"
              @click="handleDelete(scope.row)"
            >删除</el-button>
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
    <!-- 分配角色对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-select v-model="roleIdList" multiple placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="isSubmit"
          @click="submitAllocRoles"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserPages, deleteUser, forbidUser, enableUser } from '@/services/user'
import { getAllRoles, allocateUserRoles, getUserRoles } from '@/services/role'

export default {
  name: 'UserList',
  data () {
    return {
      filterParams: {
        // 当前页，默认为 1
        current: 1,
        // 每⻚数据条数
        size: 10,
        phone: '',
        startCreateTime: '',
        endCreateTime: '',
        rangeDate: []
      },
      // 数据总条数
      totalCount: 0,
      users: [],
      isLoading: false,
      userId: '',
      dialogVisible: false,
      roles: [],
      roleIdList: [],
      isSubmit: false
    }
  },
  created () {
    this.loadUserPages()
  },
  methods: {
    // 每页显示条数变化时触发
    handleSizeChange (val) {
      this.filterParams.size = val
      // 由于修改了每页条数，应当将页数还原到默认值1
      this.filterParams.current = 1
      this.loadUserPages()
    },
    // 页号改变时触发
    handleCurrentChange (val) {
      this.loadUserPages()
    },
    // 加载用户列表分页数据
    async loadUserPages () {
      this.isLoading = true
      const { rangeDate } = this.filterParams
      if (rangeDate && rangeDate.length) {
        this.filterParams.startCreateTime = rangeDate[0]
        this.filterParams.endCreateTime = rangeDate[1]
      } else {
        this.filterParams.startCreateTime = ''
        this.filterParams.endCreateTime = ''
      }
      const { data } = await getUserPages(this.filterParams)
      if (data.code === '000000') {
        this.users = data.data.records
        this.totalCount = data.data.total
      }
      this.isLoading = false
    },
    // 提交列表查询
    onSubmit () {
      this.filterParams.current = 1
      this.loadUserPages()
    },
    // 重置列表查询表单
    onReset () {
      this.$refs['filter-form'].resetFields()
    },
    // 删除
    handleDelete (row) {
      this.$confirm('确认删除吗', '删除提示')
        .then(async () => {
          this.isLoading = true
          // 发送删除请求
          const { data } = await deleteUser(row.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            // 更新数据列表
            this.loadUserPages()
          } else {
            this.isLoading = false
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 切换用户状态
    async switchUserStatus (user) {
      if (user.status === 'DISABLE') {
        const { data } = await forbidUser(user.id)
        if (data.code === '000000') {
          this.$message.success('封禁用户成功！')
        } else {
          this.$message.error('封禁用户失败！')
          user.status = 'ENABLE'
        }
      } else {
        const { data } = await enableUser(user.id)
        if (data.code === '000000') {
          this.$message.success('启用用户成功！')
        } else {
          this.$message.error('启用用户失败！')
          user.status = 'DISABLE'
        }
      }
    },
    // 分配角色
    async allocateRoles (user) {
      this.roleIdList = []
      this.userId = user.id
      this.dialogVisible = true
      // 获取所有角色
      const { data } = await getAllRoles()
      if (data.code === '000000') {
        this.roles = data.data
      }
      // 获取用户已分配角色
      const { data: result } = await getUserRoles(user.id)
      if (result.code === '000000') {
        /* result.data.forEach(item => {
          this.roleIdList.push(item.id)
        }) */
        this.roleIdList = result.data.map(item => item.id)
      }
    },
    // 确定提交分配角色请求
    async submitAllocRoles () {
      this.isSubmit = true
      const { data } = await allocateUserRoles({
        userId: this.userId,
        roleIdList: this.roleIdList
      })
      if (data.code === '000000') {
        this.$message.success('分配⻆⾊成功')
        this.dialogVisible = false
      }
      this.isSubmit = false
    }
  },
  filters: {
    dateFormat (date) {
      // 这里对日期进行格式化过滤（这里就不过处理，因为返回的模拟数据就是符合的格式，这里只是说明可以这样处理）
      return date
    }
  }
}
</script>

<style lang="scss" scoped>
.user-list {
  .el-pagination {
    margin-top: 10px;
  }
  .el-table {
    .portrait {
      border-radius: 50%;
    }
  }
  .el-dialog {
    .el-select {
      width: 100%;
      .el-input {
        width: 100%;
      }
    }
  }
}
</style>
