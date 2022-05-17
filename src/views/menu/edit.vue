<template>
  <div class="menu-edit">
    <!-- 设置 is-edit (建议使⽤ kebab-case)为 true，展示编辑功能 -->
    <create-or-edit :is-edit="true"></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from './components/CreateOrEdit'

export default {
  name: 'MenuEdit',
  components: {
    CreateOrEdit
  }
}
</script>

<style lang="scss" scoped></style>
