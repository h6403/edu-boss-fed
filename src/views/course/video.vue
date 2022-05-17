<template>
  <div class="course-video">
    <el-card>
      <el-form label-width="100px">
        <el-form-item label="课程">
          <el-input
            :value="course.courseName"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="课时">
          <el-input
            :value="lesson.theme"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="视频上传">
          <el-button type="primary" @click="$refs['video-file'].click()">选择视频</el-button>
          <div v-show="videoName">{{ videoName }}</div>
          <input type="file" ref="video-file" @change="videoFileChange" style="display: none;">
        </el-form-item>
        <el-form-item label="封⾯上传">
          <el-button type="primary" @click="$refs['image-file'].click()">选择封⾯</el-button>
          <div v-show="imageName">{{ imageName }}</div>
          <input type="file" ref="image-file" @change="imageFileChange" style="display: none;">
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpload">开始上传</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-form-item>
        <el-form-item>
          <p v-if="uploadPercent !== 0">视频上传中：{{ uploadPercent }}%</p >
          <p v-if="isUploadSuccess">视频转码中：{{ isTranscodeSuccess ? '完成' : '正在转码，请稍后...' }} </p>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getCourseById } from '@/services/course'
import { getLessonById } from '@/services/course-section'
import {
  aliyunImageUploadAddressAndAuth,
  aliyunVideoUploadAddressAndAuth,
  aliyunVideoTrancode,
  getAliyunTranscodePercent
} from '@/services/aliyun-upload'

export default {
  name: 'CourseVideo',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    },
    lessonId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      course: {},
      lesson: {},
      videoName: '',
      imageName: '',
      imageURL: '',
      uploader: null,
      videoId: '',
      uploadPercent: 0,
      isUploadSuccess: false,
      isTranscodeSuccess: false
    }
  },
  created () {
    this.loadBaseInfo()
    this.initUploader()
  },
  methods: {
    async loadBaseInfo () {
      getCourseById(this.courseId).then(({ data }) => {
        if (data.code === '000000') {
          this.course = data.data
        }
      })
      getLessonById(this.lessonId).then(({ data }) => {
        if (data.code === '000000') {
          this.lesson = data.data
        }
      })
    },
    videoFileChange () {
      this.videoName = this.$refs['video-file'].files[0].name
    },
    imageFileChange () {
      this.imageName = this.$refs['image-file'].files[0].name
    },
    // 初始化上传对象
    initUploader () {
      // 官⽅示例：声明 AliyunUpload.Vod 初始化回调。
      this.uploader = new window.AliyunUpload.Vod({
        // 阿⾥账号ID，必须有值
        userId: '1303984639806000',
        // 上传到视频点播的地域，默认值为'cn-shanghai'，//eu-central- 1，ap-southeast-1
        region: '',
        // 分⽚⼤⼩默认1 MB，不能⼩于100 KB
        partSize: 1048576,
        // 并⾏上传分⽚个数，默认5
        parallel: 5,
        // ⽹络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // ⽹络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传（uploader.startUpload() 触发后执⾏该回调）
        // - 将回调更改为箭头函数，以便在内部通过 this 操作 Vue 实例
        onUploadstarted: async uploadInfo => {
          // ⼀、获取凭证
          // 1. 声明变量存储得到上传凭证
          let uploadAddressAndAuth = null
          // 2. 根据 isImage 检测上传⽂件类型
          if (uploadInfo.isImage) {
            const { data } = await aliyunImageUploadAddressAndAuth()
            if (data.code === '000000') {
              // 3. data.data 即为凭证信息组成的对象
              uploadAddressAndAuth = data.data
              // 5. 保存图⽚地址，给视频接⼝使⽤
              this.imageURL = uploadAddressAndAuth.imageURL
            }
            uploadAddressAndAuth = data
          } else {
            // 4. 观察 uploadInfo 数据，根据请求参数名设置参数
            // - 由于视频接⼝要求传⼊封⾯图⽚地址 imageUrl，所以必须先发图再发视频 （后端
            // - 先将图⽚数据存储给 this，便于视频接⼝使⽤
            const { data } = await aliyunVideoUploadAddressAndAuth({
              fileName: uploadInfo.file.name,
              imageUrl: this.imageURL
            })
            if (data.code === '000000') {
              // 6. 存储凭证
              // - 图⽚与视频上传的区别在于图⽚存在 imageId，视频为 videoId，其他相同
              uploadAddressAndAuth = data.data
              this.videoId = data.data.videoId
            }
          }
          // ⼆、设置凭证
          this.uploader.setUploadAuthAndAddress(
            uploadInfo,
            uploadAddressAndAuth.uploadAuth,
            uploadAddressAndAuth.uploadAddress,
            uploadAddressAndAuth.imageId || uploadAddressAndAuth.videoId
          )
          // 设置完毕，上传进度开始执⾏
        },
        // ⽂件上传成功
        onUploadSucceed: uploadInfo => {
          this.statusText = '文件上传成功!'
        },
        // ⽂件上传失败
        onUploadFailed: (uploadInfo, code, message) => {
          this.statusText = '文件上传失败!'
        },
        // ⽂件上传进度，单位：字节
        onUploadProgress: (uploadInfo, totalSize, loadedPercent) => {
          const progressPercent = Math.ceil(loadedPercent * 100)
          this.uploadPercent = progressPercent
          this.statusText = '文件上传中...'
        },
        // 上传凭证超时
        onUploadTokenExpired: uploadInfo => {
          console.log('onUploadTokenExpired', uploadInfo)
        },
        // 全部⽂件上传结束
        onUploadEnd: async uploadInfo => {
          this.statusText = '文件上传完毕'
          // 调⽤接⼝
          const { data } = await aliyunVideoTrancode({
            lessonId: this.lessonId,
            coverImageUrl: this.imageURL,
            fileName: this.$refs['video-file'].files[0].name,
            fileId: this.videoId
          })
          if (data.code === '000000') {
            // 转码开始后，需要轮询转码进度
            const timer = setInterval(async () => {
              const { data } = getAliyunTranscodePercent(this.lessonId)
              if (data === 100) {
                // 当上传进度为100，停⽌定时器，并进⾏提示
                clearInterval(timer)
                this.$message.success('转码成功')
              }
            }, 1000)
          }
        }
      })
    },
    // 点击开始上传
    handleUpload () {
      // 获取上传的⽂件（视频、图⽚）
      const videoFile = this.$refs['video-file'].files
      if (videoFile.length === 0) {
        this.$message.warning('请选择上传视频')
        return
      }
      const imageFile = this.$refs['image-file'].files
      if (imageFile.length === 0) {
        this.$message.warning('请选择上传封面')
        // return
      }
      // 将⽂件添加到上传列表
      const uploader = this.uploader
      // - ⽂档示例：uploader.addFile(event.target.files[i], null, nul l, null, paramData)
      // uploader.addFile(imageFile[0])
      uploader.addFile(videoFile[0])
      // 开始上传
      // - 开始上传后，上⾯的⽂件回按添加的顺序依次上传
      // - 这时会触发 onUploadStarted 事件
      uploader.startUpload()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  display: flex;
  justify-content: center;
  .el-form {
    width: 800px;
  }
}
</style>
