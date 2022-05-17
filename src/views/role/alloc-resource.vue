<template>
  <div class="alloc-resource">
    <el-card v-loading="isLoading">
      <div class="resource-list-div">
        <check-box-group
          v-for="resource in resources"
          :key="resource.id"
          :resource="resource"
          :checked-resources="checkedIds"
          @checkChange="checkedHandle"
        ></check-box-group>
      </div>
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
import CheckBoxGroup from './components/CheckBoxGroup'
import { getResourceCategoryList, allocateRoleResources, getRoleResources } from '@/services/resource'

export default {
  name: 'AllocResource',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    CheckBoxGroup
  },
  data () {
    return {
      isLoading: false,
      isSave: false,
      resources: [],
      checkedIds: {}
    }
  },
  created () {
    this.loadResourceCategoryList()
    this.loadRoleResources()
  },
  methods: {
    // 加载资源数据并按资源分类展示
    async loadResourceCategoryList () {
      this.isLoading = true
      const { data } = await getResourceCategoryList()
      if (data.code === '000000') {
        this.resources = data.data
      }
      this.isLoading = false
    },
    // 加载角色拥有的资源权限数据
    async loadRoleResources () {
      const { data } = await getRoleResources(this.roleId)
      if (data.code === '000000') {
        this.filterCheckedIds(data.data)
      }
    },
    // 用于过滤筛选出选中的菜单节点id
    filterCheckedIds (resources) {
      let ids
      resources.forEach(resource => {
        ids = []
        if (resource.list) {
          resource.list.forEach(item => {
            if (item.selected) {
              ids.push(item.id)
            }
          })
        }
        this.checkedIds[resource.id] = ids
      })
    },
    // 资源分类选项框组发生变化时触发
    checkedHandle (params) {
      this.checkedIds[params[0]] = params[1]
    },
    // 保存
    async onSave () {
      this.isSave = true
      let resourceIds = []
      for (const p in this.checkedIds) {
        resourceIds = resourceIds.concat(this.checkedIds[p])
      }
      if (resourceIds.length === 0) {
        this.$message.warning('请至少选中一个资源项')
        this.isSave = false
        return
      }
      const { data } = await allocateRoleResources({
        roleId: this.roleId,
        resourceIdList: resourceIds
      })
      if (data.code === '000000') {
        this.$message.success('分配资源成功')
        this.$router.push({
          name: 'role'
        })
      }
      this.isSave = false
    },
    // 清空
    onReset () {
      /* for (const key in this.checkedIds) {
        this.checkedIds[key] = []
      } */
      this.checkedIds = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.resource-list-div {
  border: 1px solid #DEDEDE;
  border-bottom: none;
}
</style>
