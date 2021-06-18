<template>
  <div>
    <el-upload
      ref="upload"
      class="upload"
      :data="data"
      :drag="!isOnlyButton"
      action=""
      :value="value"
      :headers="headers"
      name="file"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :list-type="listType"
      :show-file-list="showFileList"
      :auto-upload="autoUpload && !raw"
      :on-error="handleError"
      :on-remove="handleRemove"
      :multiple="multiple"
      :on-success="handleSuccess"
      :on-change="changeUpload"
      :on-progress="progressChange"
      v-bind="$attrs"
      :http-request="handleUpload"
    >
      <template v-if="!isOnlyButton">
        <i class="el-icon-upload" :style="{ marginTop: accept ? '20px' : '40px' }" />
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </template>
      <template v-else>
        <div style="text-align: left">
          <el-button slot="trigger" size="small" type="primary" icon="el-icon-upload2">{{ btnText }}</el-button>
        </div>
      </template>
    </el-upload>
    <p v-if="accept" class="accept">
      支持扩展名: <span>{{ accept }}</span>
    </p>
  </div>
</template>

<script>
import { file, fileUploadUrl } from '@/plugins/axios'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { getFileUrlByIds } from '@/api/file'

export default {
  name: 'Upload',
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props: {
    // 额外参数
    data: {
      type: Object
    },
    // 上传地址
    action: {
      type: String,
      default: fileUploadUrl
    },
    showFileList: {
      type: Boolean,
      default: true
    },
    value: [Object, Array, File, String],
    // 多选
    multiple: {
      type: Boolean,
      default: false
    },
    raw: {
      type: Boolean,
      default: false
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    name: {
      type: String
    },
    isOnlyButton: {
      type: Boolean,
      default: false
    },
    // 接受上传的文件类型（thumbnail-mode 模式下此参数无效）
    accept: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: '上传文件'
    },
    // 最大允许上传个数
    limit: {
      type: Number,
      default: 9
    },
    listType: {
      type: String,
      default: 'text'
    },
    folderId: {
      type: [String, Number],
      default: 0
    },
    moduleType: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: '文件'
    }
  },
  data() {
    return {
      fileList: [],
      listWithPercent: [],
      headers: {
        'x-access-token': getToken()
      },
      cancelArr: []
    }
  },
  watch: {
    fileList: {
      deep: true,
      handler() {
        if (this.raw) {
          const raw = this.fileList.length > 0 ? this.fileList[0].raw : ''
          this.$emit('input', this.multiple ? this.fileList.map(e => e.raw) : raw)
        } else {
          const id = this.fileList.length > 0 ? this.fileList[0].id : ''
          this.$emit('input', this.multiple ? this.fileList.map(e => e.id) : id)
        }

        if (this.elFormItem?.validate) {
          this.elFormItem.validate()
        }
      }
    },
    value: {
      immediate: true,
      handler() {
        if (typeof this.value !== 'string') {
          return
        }
        const newFileIds = _.difference(
          this.value.split(','),
          this.fileList.map(e => e.id)
        )
        if (newFileIds.length) {
          getFileUrlByIds(newFileIds).then(res => {
            res.data.forEach(e => {
              e.name = e.fileName
              e.url = e.fileUrl
              return e
            })
            this.fileList = _.unionBy(res.data.concat(this.fileList), 'id')
          })
        }
      }
    }
  },
  methods: {
    // 选择文件
    changeUpload(file, fileList) {
      this.listWithPercent = [...fileList]
      this.$emit('process', this.listWithPercent)
      // 由于raw模式会让过beforeUpload验证，所以在此处验证文件格式
      if (this.raw && this.accept) {
        fileList = fileList.filter(e => {
          if (!_.some(this.accept.split(','), string => e.name.toLowerCase().includes(string.toLowerCase()))) {
            this.$message.error('文件格式错误，只允许' + this.accept)
            return false
          }
          return true
        })
      }
      // 如果限制上传一个，则再次上传，会覆盖旧的，如果限制上传一个以上，则会进行提示
      if (this.limit === 1) {
        this.fileList = [_.last(fileList)]
      } else if (this.limit < fileList.length) {
        this.$message.error(`最多上传${this.limit}个`)
        this.fileList = fileList.slice(0, this.limit)
      } else {
        this.fileList = fileList
      }
    },
    async handleUpload(options) {
      const files = options.file
      const formData = new FormData()
      formData.append('file', files)
      formData.append('documentAttribution', this.moduleType)
      formData.append('parentId', this.folderId)
      const CancelToken = axios.CancelToken
      const self = this
      const result = await file
        .post('/common/document/file/add', formData, {
          contentType: 'multipart/form-data',
          timeout: 300000,
          cancelToken: new CancelToken(function executor(c) {
            self.cancelArr.push(c)
          }),
          onUploadProgress: progressEvent => {
            const complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0
            this.listWithPercent.forEach(item => {
              if (item.uid === files.uid) {
                item.aa = complete
              }
            })
            this.$emit('process', this.listWithPercent)
          }
        })
        .catch(e => {})
      return result
    },
    handleSuccess(res, file, fileList) {
      if (!file.response) {
        return
      }
      if (!this.raw) {
        file.id = file.response.data
      }
      if (this.multiple) {
        this.fileList = fileList
      } else {
        this.fileList = [file]
      }
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    beforeUpload(file) {
      if (this.content === '文件夹' && file.name.indexOf('.') < 0) {
        this.$message.warning('文件夹不支持拖拽')
        return false
      }
      if (this.accept) {
        if (!_.some(this.accept.split(','), string => file.name.toLowerCase().includes(string.toLowerCase()))) {
          this.$message.error('文件格式错误，只允许' + this.accept)
          return false
        }
      }
    },
    handleError(error) {
      this.$message.error(error.status + '：' + error.message)
    },
    clearFiles() {
      this.$refs.upload.clearFiles()
    },
    progressChange(event, file, fileList) {
      this.listWithPercent.forEach(item => {
        if (item.uid === file.uid) {
          item.aa = +event.percent.toFixed(2)
        }
      })
      this.$emit('process', this.listWithPercent)
    },
    abort() {
      this.cancelArr.forEach(item => {
        item('abort')
      })
    }
  }
}
</script>

<style scoped lang="less">
.accept {
  color: #999;
  margin-top: 10px;
}
/deep/ .el-upload--picture-card {
  display: block;
  border: none;
  height: auto;
  background-color: transparent;
  line-height: 1;
  i {
    font-size: 16px;
    color: #fff;
  }
}
</style>
