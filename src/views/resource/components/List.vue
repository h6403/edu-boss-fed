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
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="form.name" clearable placeholder="资源名称"></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input v-model="form.url" clearable placeholder="资源路径"></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select v-model="form.categoryId" clearable placeholder="资源分类">
              <el-option
                v-for="item in resourceCategory"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
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
          @click="$router.push({ name: 'resource-create' })"
          size="medium"
        >添加</el-button>
        <el-button size="medium">资源分类</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="isLoading"
      >
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径">
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
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
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
  </div>
</template>

<script>
import { getResourcePages, getResourceCategory, deleteResource } from '@/services/resource'

export default {
  name: 'ResourceList',
  data () {
    return {
      form: {
        // 当前页，默认为 1
        current: 1,
        // 每⻚数据条数
        size: 10,
        name: '',
        url: '',
        categoryId: ''
      },
      // 数据总条数
      totalCount: 0,
      tableData: [],
      resourceCategory: [],
      isLoading: false
    }
  },
  created () {
    this.loadResources()
    this.loadResourceCategory()
  },
  methods: {
    // 每页显示条数变化时触发
    handleSizeChange (val) {
      this.form.size = val
      // 由于修改了每页条数，应当将页数还原到默认值1
      this.form.current = 1
      this.loadResources()
    },
    // 页号改变时触发
    handleCurrentChange (val) {
      // this.form.current = val
      this.loadResources()
    },
    // 加载资源列表分页数据
    async loadResources () {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      if (data.code === '000000') {
        this.tableData = data.data.records
        this.totalCount = data.data.total
      }
      this.isLoading = false
    },
    // 加载资源分类数据
    async loadResourceCategory () {
      const { data } = await getResourceCategory()
      if (data.code === '000000') {
        this.resourceCategory = data.data
      }
    },
    // 提交列表查询
    onSubmit () {
      this.form.current = 1
      this.loadResources()
    },
    // 重置列表查询表单
    onReset () {
      this.$refs.form.resetFields()
    },
    // 编辑
    handleEdit (row) {
      // 导航到菜单编辑⻚
      this.$router.push({
        name: 'resource-edit',
        // 传递动态路由参数
        params: {
          id: row.id
        }
      })
    },
    // 删除
    handleDelete (row) {
      this.$confirm('确认删除吗', '删除提示')
        .then(async () => {
          this.isLoading = true
          // 发送删除请求
          const { data } = await deleteResource(row.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            // 更新数据列表
            this.loadResources()
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
