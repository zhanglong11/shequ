<template>
  <span>
    <a v-if="type !== 'other'" :class="{ disabled: type === 'other' || !fileId }" @click="visible = true">
      <slot>预览</slot>
    </a>
    <el-tooltip v-else class="item" effect="dark" content="暂不支持预览" placement="right">
      <a :class="{ disabled: type === 'other' || !fileId || !fileName }">
        <slot>预览</slot>
      </a>
    </el-tooltip>
    <el-dialog
      v-if="fileId"
      title="预览"
      append-to-body
      width="1000px"
      destroy-on-close
      :visible="visible"
      @close="visible = false"
    >
      <img v-if="type === 'img'" class="preview-image" :src="fileUrl" alt="" />
      <video v-if="type === 'video'" autoplay class="preview-video" width="100%" controls :src="fileUrl" alt="" />
      <template v-if="showFrame">
        <iframe v-if="type === 'office' || type === 'pdfTxt'" ref="iframe" width="100%" style="height: 60vh" />
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">确定</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
import { getFileUrlByIds } from '@/api/file'
import { filePreviewUrl, file } from '@/plugins/axios'
const imgReg = /(.*)\.(jpg|png|jepg|gif|webp|jpeg)$/
const videoReg = /(.*)\.(mp4|mkv|ogg|webm)$/
const officeReg = /(.*)\.(doc|xls|xlsx|docx|ppt|pptx)$/
const pdfTxtReg = /(.*)\.(pdf|txt)$/
export default {
  name: 'PreviewByFileId',
  props: {
    fileId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      visible: false,
      fileUrl: '',
      fileName: '',
      showFrame: false
    }
  },
  computed: {
    type() {
      if (!this.fileName) return 'other'
      if (imgReg.test(this.fileName.toLowerCase())) {
        return 'img'
      } else if (videoReg.test(this.fileName.toLowerCase())) {
        return 'video'
      } else if (officeReg.test(this.fileName.toLowerCase())) {
        return 'office'
      } else if (pdfTxtReg.test(this.fileName.toLowerCase())) {
        return 'pdfTxt'
      } else {
        return 'other'
      }
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        return
      }
      file
        .get(`/noToken/file/commonFile/onlinePreview/${this.fileId}`, {
          type: 'noHold'
        })
        .then(res => {
          if ((this.type === 'pdfTxt' || this.type === 'office') && res.data.code === 500) {
            this.$message.error('文件内容有误，无法预览')
            return
          }
          this.showFrame = true
          setTimeout(() => {
            this.$refs.iframe.src = `${filePreviewUrl}/noToken/file/commonFile/onlinePreview/${this.fileId}`
          }, 100)
        })
      // if (val && this.type === 'pdfTxt') {
      //   Api.downloadFileById(this.fileId).then(res => {
      //     let blobUrl = window.URL.createObjectURL(res.data)
      //     this.$refs.iframe.src = blobUrl
      //     this.$refs.iframe.onload = () => {
      //       window.URL.revokeObjectURL(blobUrl)
      //     }
      //   })
      // } else if (val && this.type === 'office') {
      //   setTimeout(() => {
      //     this.$refs.iframe.src = `${filePreviewUrl}/noToken/file/commonFile/onlinePreview/${this.fileId}`
      //   }, 100)
      // }
    }
  },
  created() {
    getFileUrlByIds([this.fileId]).then(res => {
      this.fileUrl = res.data[0].fileUrl
      this.fileName = res.data[0].fileName
    })
  }
}
</script>

<style scoped lang="less">
.preview-image {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}
a {
  font-size: 14px;
}
.disabled {
  color: #333;
  cursor: not-allowed;
}
/deep/ .el-dialog__header {
  border-bottom: 1px #eeeeee solid;
}
</style>
