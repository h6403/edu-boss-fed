<template>
  <div class="text-editor" ref="editor"></div>
</template>

<script>
import E from 'wangeditor'
import { uploadCourseImage } from '@/services/course'

export default {
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      editor: null,
      // 要编辑的数据是否加载完毕
      isLoaded: false
    }
  },
  mounted () {
    // 初始化富文本编辑器
    this.initEditor()
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor)
      // 设置编辑区域高度为 500px
      editor.config.height = 500
      // 配置 onchange 回调函数
      editor.config.onchange = newHtml => {
        this.$emit('input', newHtml)
      }
      // 配置 ⾃定义上传图⽚ 功能
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      editor.config.customUploadImg = async (resultFiles, insertImgFn) => {
        // 发送请求（参数需要 FormData 类型）
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadCourseImage(fd)
        if (data.code === '000000') {
          // 根据地址创建 img 并插⼊到富⽂本编辑器
          insertImgFn(data.data.name)
        }
      }
      editor.create()
      // 设置编辑器内容
      editor.txt.html(this.value)
      this.editor = editor
    }
  },
  watch: {
    value () {
      // 编辑数据加载成功后，为富⽂本编辑器更新初始内容即可
      if (!this.isLoaded) {
        this.editor.txt.html(this.value)
        this.isLoaded = true
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
