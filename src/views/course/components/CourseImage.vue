<template>
  <div class="course-image">
    <el-form-item :label="label">
      <!-- 进度条组件 -->
      <div v-if="isUploading">
        <el-progress
          type="circle"
          :width="178"
          :percentage="percentage"
          :status="percentage === 100 ? 'success' : undefined"
        ></el-progress>
      </div>
      <!-- 上传组件 -->
      <el-upload
        v-else
        class="avatar-uploader"
        :show-file-list="false"
        action=""
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :http-request="handleUpload">
        <img v-if="value" :src="value" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-tag type="info" v-if="info">{{ info }}}</el-tag>
    </el-form-item>
  </div>
</template>

<script>
import { uploadCourseImage } from '@/services/course'

export default {
  name: 'CourseImage',
  props: {
    value: {
      type: String
    },
    label: {
      type: String
    },
    limit: {
      type: Number,
      default: 150
    },
    fileType: {
      type: Array,
      default: () => {
        return ['image/jpeg', 'image/png']
      }
    },
    info: {
      type: String
    }
  },
  data () {
    return {
      isUploading: false,
      percentage: 0
    }
  },
  methods: {
    // ⾃定义⽂件上传操作
    async handleUpload (options) {
      this.isUploading = true
      // 创建 FormData 对象保存数据
      const fd = new FormData()
      // 添加数据的键要根据接⼝⽂档设置
      fd.append('file', options.file)
      // 发送请求
      const { data } = await uploadCourseImage(fd, (event) => {
        this.percentage = Math.floor(event.loaded / event.total * 100)
      })
      if (data.code === '000000') {
        // data.data.name 为服务器提供的地址
        // 上传成功后，将数据通过⾃定义事件传递给⽗组件
        this.$emit('input', data.data.name)
        // 提示
        this.$message.success('上传成功')
      }
      this.isUploading = false
      // 上传成功后，设置进度信息归零，避免下次上传出现回退效果
      this.percentage = 0
    },
    // 图⽚预览为组件在 on-success 时设置的本地预览功能
    handleAvatarSuccess (res, file) {
    },
    // before-upload ⽤于在上传⽂件前进⾏规则校验（例如⽂件格式与⼤⼩， 可⾃⾏调整）
    beforeAvatarUpload (file) {
      /* const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png' */
      const isType = this.fileType.some(item => {
        return file.type === item
      })
      const isLimit = file.size / 1024 < this.limit
      if (!isType) {
        this.$message.error('上传的图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLimit) {
        this.$message.error(`上传头像图⽚⼤⼩不能超过 ${this.limit}KB!`)
      }
      return isType && isLimit
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader{
  line-height: normal;
}
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
