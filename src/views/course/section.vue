<template>
  <div class="course-section">
    <el-card v-loading="isLoading">
      <div slot="header" class="top-head-div">
        <div>
          <el-button
            type="text"
            icon="el-icon-back"
            @click="$router.push({ name: 'course' })"
          >返回</el-button>
          <span style="margin-left: 40px;font-size: 20px;">{{ courseName }}</span>
        </div>
        <el-button
          type="primary"
          @click="isSectionEdit = false; sectionDialogVisible = true"
        >添加阶段</el-button>
      </div>
      <el-tree
        :data="sections"
        :props="defaultProps"
        draggable
        default-expand-all
        :allow-drop="handleAllowDrop"
        @node-drop="handleNodeDrop"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <!-- 章节按钮 -->
          <span v-if="data.sectionName">
            <el-button @click.stop="editSection(data)">编辑</el-button>
            <el-button
              type="primary"
              @click.stop="createLesson(data)"
            >添加课时</el-button>
            <el-button @click.stop="editStatus(node)">
              {{ data.status === 2 ? '已更新' : (data.status === 1 ? '待更新' : '已隐藏') }}
            </el-button>
          </span>
         <!-- 课时按钮 -->
          <span v-else>
            <el-button @click.stop="editLesson(node, data)">编辑</el-button>
            <el-button
              type="success"
              @click="$router.push({
                name: 'course-video',
                params: {
                  courseId,
                  lessonId: data.id
                }
              })"
            >上传视频</el-button>
            <el-button @click.stop="editStatus(node)">
              {{ data.status === 2 ? '已更新' : (data.status === 1 ? '待更新' : '已隐藏') }}
            </el-button>
          </span>
        </span>
      </el-tree>
    </el-card>
    <!-- 添加/编辑章节对话框 -->
    <el-dialog
      title="章节信息"
      :visible.sync="sectionDialogVisible"
      width="30%"
    >
      <create-or-edit-section
        v-if="sectionDialogVisible"
        :is-edit="isSectionEdit"
        :course-id="courseId"
        :course-name="courseName"
        :section-id="currentSectionId"
        @success="handleSectionSuccess"
        @cancel="sectionDialogVisible = false"
      ></create-or-edit-section>
    </el-dialog>
    <!-- 添加/编辑课时对话框 -->
    <el-dialog
      title="课时基本信息"
      :visible.sync="lessonDialogVisible"
      width="30%"
    >
      <create-or-edit-lesson
        v-if="lessonDialogVisible"
        :is-edit="isLessonEdit"
        :course-id="courseId"
        :course-name="courseName"
        :section-id="currentSectionId"
        :section-name="currentSectionName"
        :lesson-id="currenLessonId"
        @success="handleLessonSuccess"
        @cancel="lessonDialogVisible = false"
      ></create-or-edit-lesson>
    </el-dialog>
     <!-- 编辑状态对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="statusDialogVisible"
      width="25%"
    >
      <edit-status
        v-if="statusDialogVisible"
        :edit-status-type="editStatusType"
        :edit-status-id="editStatusNode.data.id"
        :edit-status-value="editStatusNode.data.status"
        @success="handleStatusSuccess"
        @cancel="statusDialogVisible = false"
      ></edit-status>
    </el-dialog>
  </div>
</template>

<script>
import { getSectionAndLesson, saveOrUpdateSection, saveOrUpdateLesson } from '@/services/course-section'
import CreateOrEditSection from './components/CreateOrEditSection'
import CreateOrEditLesson from './components/CreateOrEditLesson'
import EditStatus from './components/Status'

export default {
  name: 'CourseSection',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    CreateOrEditSection,
    CreateOrEditLesson,
    EditStatus
  },
  data () {
    return {
      courseName: decodeURIComponent(this.$route.query.courseName),
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label: function (data) {
          return data.sectionName || data.theme
        }
      },
      isLoading: false,
      isSectionEdit: false,
      sectionDialogVisible: false,
      currentSectionId: '',
      isLessonEdit: false,
      lessonDialogVisible: false,
      currenLessonId: '',
      currentSectionName: '',
      statusDialogVisible: false,
      editStatusType: '',
      editStatusNode: {}
    }
  },
  created () {
    this.loadSections()
  },
  methods: {
    // 加载章节和课时数据
    async loadSections () {
      this.isLoading = true
      const { data } = await getSectionAndLesson(this.courseId)
      if (data.code === '000000') {
        this.sections = data.data
      }
      this.isLoading = false
    },
    // 拖拽时判定目标节点能否被放置。
    // type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后
    handleAllowDrop (draggingNode, dropNode, type) {
      // 1. 不能有放⼊内部的操作，但例如将章节1拖拽到章节2的课时1之前时，type 为 prev，需要进⼀步处理
      // 2. 所有课时都具有 sectionId，通过下⾯的条件，限制章节不能移动到课时前 后，也不能将章节的课时移动到其他章节
      return type !== 'inner' && draggingNode.data.sectionId === dropNode.data.sectionId
    },
    // 设置节点拖动后的数据更新
    // 拖拽成功完成时触发的事件
    // 共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event
    async handleNodeDrop (draggingNode, dropNode, type, event) {
      this.isLoading = true
      // 1. ⽆论是章节还是课时, dropNode 都有parent(draggingNode.parent 总为 null), 内部有childNodes
      // - dropNode.parent.childNodes 可获取拖拽项所在列表的所有数据
      // - 遍历操作
      // 4. 由于是批量请求，可以使⽤ Promise.all() 便于进⾏统⼀操作
      // - 将 map 返回的，由 Axios 调⽤返回的 Promise 对象组成的数组，传⼊ 到 Promise.all() 中
      // - 设置 async await 并进⾏ try..catch 处理
      try {
        await Promise.all(dropNode.parent.childNodes.map((item, index) => {
          // 2. 对章节与课时进⾏分别处理
          // - 除了 draggingNode.data.sectionId 外，draggingNode.les sonDTOS 也可以判断
          if (item.data.lessonDTOS) {
            // 章节操作
            return saveOrUpdateSection({
              id: item.data.id,
              // 按现在的索引顺序给当前级别列表设置排序序号
              orderNum: index
            })
          } else {
            // 课时操作（同上）
            return saveOrUpdateLesson({
              id: item.data.id,
              orderNum: index
            })
          }
        }))
        this.$message.success('数据更新成功')
      } catch (err) {
        this.$message.error('数据更新失败', err)
      }
      this.isLoading = false
    },
    // 编辑章节
    editSection (data) {
      this.currentSectionId = data.id
      this.isSectionEdit = true
      this.sectionDialogVisible = true
    },
    // 添加或更新章节成功后的处理函数
    handleSectionSuccess () {
      this.sectionDialogVisible = false
      this.loadSections()
    },
    // 添加课时
    createLesson (data) {
      this.currentSectionId = data.id
      this.currentSectionName = data.sectionName
      this.isLessonEdit = false
      this.lessonDialogVisible = true
    },
    // 编辑课时
    editLesson (node, data) {
      this.currentLessonId = data.id
      this.currentSectionId = node.parent.data.id
      this.currentSectionName = node.parent.data.sectionName
      this.isLessonEdit = true
      this.lessonDialogVisible = true
    },
    // 添加或更新课时成功后的处理函数
    handleLessonSuccess () {
      this.lessonDialogVisible = false
      this.loadSections()
    },
    // 变更状态
    editStatus (node) {
      if (node.data.sectionName) {
        this.editStatusType = 'section'
      } else {
        this.editStatusType = 'lesson'
      }
      this.editStatusNode = node
      this.statusDialogVisible = true
    },
    handleStatusSuccess (value) {
      this.statusDialogVisible = false
      this.editStatusNode.data.status = value
    }
  }
}
</script>

<style lang="scss" scoped>
.top-head-div {
  display: flex;
  justify-content: space-between;
}
.custom-tree-node {
  /* 浏览器观察到⽗元素设置了 flex，所以当前元素 flex: 1 占满⼀⾏ */
  flex: 1;
  /* 内部元素希望左右分开，所以给当前元素设置 flex */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid #ebeef5;
}
::v-deep .el-tree-node__content {
  height: auto;
}
</style>
