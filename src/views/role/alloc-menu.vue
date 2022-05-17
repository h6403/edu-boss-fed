<template>
  <div class="alloc-menu">
    <el-card v-loading="isLoading">
      <el-tree
        ref="menu-tree"
        node-key="id"
        :data="menus"
        :props="defaultProps"
        :default-checked-keys="checkedKeys"
        default-expand-all
        show-checkbox
      ></el-tree>
      <div style="margin: 20px;text-align: center;">
        <el-button @click="onReset">清空</el-button>
        <el-button
          type="primary"
          @click="onSave"
          :loading="isSave"
        >保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/services/menu'

export default {
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      isSave: false,
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: []
    }
  },
  created () {
    this.loadMenuNodeList()
    this.loadRoleMenus()
  },
  methods: {
    // 加载菜单数据
    async loadMenuNodeList () {
      this.isLoading = true
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menus = data.data
      }
      this.isLoading = false
    },
    // 加载角色拥有的菜单权限数据
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      if (data.code === '000000') {
        this.filterCheckedKeys(data.data)
      }
    },
    // 用于过滤筛选出选中的菜单节点id
    filterCheckedKeys (menus) {
      // 遍历数据，将拥有子节点的节点排除，只对末级节点过滤
      menus.forEach(menu => {
        // 未选中，跳过
        if (!menu.selected) {
          return
        }
        // 判断是否有子节点
        if (menu.subMenuList) {
          // 对子节点进行选中状态检测
          return this.filterCheckedKeys(menu.subMenuList)
        }
        // 能执行到这里，说明是叶子节点（也就是不存在子节点的节点），存储id（若是选中状态）
        // this.checkedKeys.push(menu.id)
        this.checkedKeys = [...this.checkedKeys, menu.id]
      })
    },
    // 保存
    async onSave () {
      this.isSave = true
      const menuIds = this.$refs['menu-tree'].getCheckedKeys()
      if (menuIds.length === 0) {
        this.$message.warning('请至少选中一个菜单')
        this.isSave = false
        return
      }
      const { data } = await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList: menuIds
      })
      if (data.code === '000000') {
        this.$message.success('分配菜单成功')
        this.$router.push({
          name: 'role'
        })
      }
      this.isSave = false
    },
    // 清空
    onReset () {
      this.$refs['menu-tree'].setCheckedKeys([])
    }
  }
}
</script>

<style lang="sass" scoped></style>
