<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button
          @click="$router.push({ name: 'menu-create' })"
        >添加菜单</el-button>
      </div>
      <!-- 菜单列表展示区域 -->
      <el-table
        :data="tableData"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          type="index"
          width="50"
          label="行号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜单名称">
        </el-table-column>
        <el-table-column
          prop="level"
          label="菜单级数">
        </el-table-column>
        <!-- <el-table-column
          prop="icon"
          label="前端图标">
        </el-table-column> -->
        <el-table-column
          prop="icon"
          label="前端图标">
          <template slot-scope="scope">
            <img :src="scope.row.icon">
          </template>
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序">
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
    </el-card>
  </div>
</template>

<script>
import { getAllMenus, deleteMenu } from '@/services/menu'

export default {
  name: 'MenuIndex',
  data () {
    return {
      tableData: [],
      isLoading: false
    }
  },
  created () {
    this.loadAllMenus()
  },
  methods: {
    async loadAllMenus () {
      this.isLoading = true
      const { data } = await getAllMenus()
      if (data.code === '000000') {
        this.tableData = data.data
      }
      this.isLoading = false
    },
    handleEdit (row) {
      // 导航到菜单编辑⻚
      this.$router.push({
        name: 'menu-edit',
        // 传递动态路由参数
        params: {
          id: row.id
        }
      })
    },
    handleDelete (row) {
      // 确认提示（参数3的具体配置不需要可省略）
      this.$confirm('确认删除吗', '删除提示')
        .then(async () => {
          // 发送删除请求
          const { data } = await deleteMenu()
          if (data.code === '000000') {
            this.$message.success('删除成功')
            // 更新数据列表
            this.loadAllMenus()
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
