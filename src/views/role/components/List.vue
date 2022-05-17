<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form
          :inline="true"
          :model="form"
          ref="form"
          class="demo-form-inline"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" clearable placeholder="资源名称"></el-input>
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
        <el-divider></el-divider>
        <el-button
          @click="addRole"
          size="medium"
        >添加角色</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="isLoading"
      >
        <el-table-column
          prop="id"
          width="100"
          align="center"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
           <div>
              <el-button
                type="text"
                @click="$router.push({
                  name: 'alloc-menu',
                  params: {
                    roleId: scope.row.id
                  }
                })"
              >分配菜单</el-button>
              <el-button
                type="text"
                @click="$router.push({
                  name: 'alloc-resource',
                  params: {
                    roleId: scope.row.id
                  }
                })"
              >分配资源</el-button>
           </div>
           <div>
              <el-button
                type="text"
                @click="handleEdit(scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                @click="handleDelete(scope.row)"
              >删除</el-button>
           </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="form.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="form.size"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :disabled="isLoading"
      ></el-pagination>
    </el-card>
    <!-- 添加角色对话框 -->
    <el-dialog
      :title="isEdit ? '编辑角色' : '添加角色'"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <create-or-edit
        v-if="dialogVisible"
        :is-edit="isEdit"
        :role-id="roleId"
        @success="handleSuccess"
        @cancel="dialogVisible = false"
      ></create-or-edit>
    </el-dialog>
  </div>
</template>

<script>
import { getRolePages, deleteRole } from '@/services/role'
import CreateOrEdit from './CreateOrEdit'

export default {
  name: 'RoleList',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      form: {
        // 当前页，默认为 1
        current: 1,
        // 每⻚数据条数
        size: 10,
        name: ''
      },
      // 数据总条数
      totalCount: 0,
      tableData: [],
      isLoading: false,
      dialogVisible: false,
      isEdit: false,
      roleId: ''
    }
  },
  created () {
    this.loadRolePages()
  },
  methods: {
    // 添加或更新角色成功后的处理函数
    handleSuccess () {
      this.dialogVisible = false
      this.loadRolePages()
    },
    // 每页显示条数变化时触发
    handleSizeChange (val) {
      this.form.size = val
      // 由于修改了每页条数，应当将页数还原到默认值1
      this.form.current = 1
      this.loadRolePages()
    },
    // 页号改变时触发
    handleCurrentChange (val) {
      // this.form.current = val
      this.loadRolePages()
    },
    // 加载资源列表分页数据
    async loadRolePages () {
      this.isLoading = true
      const { data } = await getRolePages(this.form)
      if (data.code === '000000') {
        this.tableData = data.data.records
        this.totalCount = data.data.total
      }
      this.isLoading = false
    },
    // 提交列表查询
    onSubmit () {
      this.form.current = 1
      this.loadRolePages()
    },
    // 重置列表查询表单
    onReset () {
      this.$refs.form.resetFields()
    },
    // 添加角色
    addRole () {
      this.dialogVisible = true
      this.isEdit = false
    },
    // 编辑
    handleEdit (row) {
      this.roleId = row.id
      this.isEdit = true
      this.dialogVisible = true
    },
    // 删除
    handleDelete (row) {
      this.$confirm('确认删除吗', '删除提示')
        .then(async () => {
          this.isLoading = true
          // 发送删除请求
          const { data } = await deleteRole(row.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            // 更新数据列表
            this.loadRolePages()
          } else {
            this.isLoading = false
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
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
.el-pagination {
  margin-top: 10px;
}
</style>
