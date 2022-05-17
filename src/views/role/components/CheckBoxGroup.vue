<template>
  <div class="resource-group">
    <div class="check-all-div">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >{{ resource.name }}</el-checkbox>
    </div>
  <div class="checkbox-group-div">
    <el-checkbox-group
      v-model="checkedIds"
      @change="handleCheckedCitiesChange"
    >
      <el-row :gutter="20">
        <el-col
          :span="8"
          v-for="item in resource.list"
          :key="item.id"
        >
          <el-checkbox
            :value="item.id"
            :label="item.id"
          >
            {{ item.name }}
          </el-checkbox>
        </el-col>
      </el-row>
    </el-checkbox-group>
  </div>
  </div>
</template>

<script>
export default {
  name: 'CheckBoxGroup',
  props: {
    resource: {
      type: Object
    },
    checkedResources: {
      type: Object
    }
  },
  data () {
    return {
      isIndeterminate: false, // 用以表示 checkbox 的不确定状态，一般用于实现全选的效果
      checkAll: false,
      checkedIds: [],
      resourceIds: []
    }
  },
  created () {
    this.filterResourceId()
    this.initChecked()
  },
  methods: {
    // 处理资源项id，用数组单独保存
    filterResourceId () {
      if (this.resource.list) {
        this.resource.list.forEach(item => {
          this.resourceIds.push(item.id)
        })
      }
    },
    // 初始化选中状态
    initChecked () {
      if (this.checkedResources[this.resource.id]) {
        this.checkedIds = this.checkedResources[this.resource.id]
      } else {
        this.checkedIds = []
        this.isIndeterminate = false
        this.checkAll = false
      }
    },
    // 全选（只选中当前复选框祖所有的复选框）
    handleCheckAllChange (val) {
      this.checkedIds = val ? this.resourceIds : []
      this.isIndeterminate = false
      this.$emit('checkChange', [this.resource.id, this.checkedIds])
    },
    // 复选框祖选项选中状态发生改变时触发
    handleCheckedCitiesChange (val) {
      const checkedCount = val.length
      this.checkAll = checkedCount === this.resourceIds.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.resourceIds.length
      this.$emit('checkChange', [this.resource.id, this.checkedIds])
    }
  },
  watch: {
    checkedResources (newVal, oldVal) {
      this.initChecked()
    }
  }
}
</script>

<style lang="scss" scoped>
.resource-group {
  .check-all-div {
    padding: 20px;
    background: #EBEEF6;
  }
  .checkbox-group-div {
    padding: 20px;
    border-top: 1px solid #DEDEDE;
    border-bottom: 1px solid #DEDEDE;
    .el-col {
      margin-bottom: 10px;
    }
  }
}
</style>
