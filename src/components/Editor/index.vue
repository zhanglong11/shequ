<template>
  <div>
    <div ref="editor"></div>
  </div>
</template>

<script>
import E from 'wangeditor'
import { getFileUrlByIds, upload } from '@/api/file'
export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editorContent: ''
    }
  },
  watch: {
    value() {
      if (this.value !== this.editorContent) {
        this.setContent(this.value)
      }
    }
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  },
  mounted() {
    this.editor = new E(this.$refs.editor)
    this.editor.config.onchange = html => {
      this.editorContent = html
      this.$emit('input', html)
    }
    this.editor.config.zIndex = 1
    this.editor.config.customUploadImg = async (files, insert) => {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法

      // 上传代码返回结果之后，将图片插入到编辑器中
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)
        const { data: fileId } = await upload(formData)
        const { fileUrl } = await getFileUrlByIds([fileId]).then(res => res.data[0])
        insert(fileUrl)
      }
    }
    this.editor.config.customUploadVideo = async (files, insert) => {
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)
        const { data: fileId } = await upload(formData)
        const { fileUrl } = await getFileUrlByIds([fileId]).then(res => res.data[0])
        insert(fileUrl)
      }
    }
    this.editor.config.customInsertVideo = videoUrl => {
      // videoUrl 是返回的视频地址

      // 往编辑器插入 html 内容
      this.editor.cmd.do('insertHTML', `<video src="${videoUrl}" controls="controls">`)
    }
    this.editor.create()
  },
  methods: {
    // 设置编辑器的内容
    setContent(html) {
      this.editor.txt.html(html)
    }
  }
}
</script>

<style>
.w-e-text-container {
  min-height: 300px;
}
video {
  width: 400px;
}
</style>
