<template>
  <div>
    <el-upload
      ref="upload"
      class="upload"
      :data="data"
      :action="action"
      :value="value"
      :headers="headers"
      name="file"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :auto-upload="autoUpload"
      :on-error="handleError"
      :on-remove="handleRemove"
      :multiple="multiple"
      :list-type="listType"
      :on-success="handleSuccess"
      :on-change="changeUpload"
      accept=".png,.jpg,.jpeg,.webp,.gif,.bpm"
      v-bind="$attrs"
    >
      <i v-if="!isOnlyBtn" class="el-icon-plus"></i><el-button v-else size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import { fileUploadUrl } from '@/plugins/axios'
import { getToken } from '@/utils/auth'
import { getFileUrlByIds } from '@/api/file'

export default {
  name: 'UploadImage',
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
    value: [Object, Array, File, String],
    // 多选
    multiple: {
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
    // 最大允许上传个数
    limit: {
      type: Number,
      default: 9
    },
    isOnlyBtn: {
      type: Boolean,
      default: false
    },
    listType: {
      type: String,
      default: 'picture-card'
    }
  },
  data() {
    return {
      fileList: [],
      headers: {
        'x-access-token': getToken()
      }
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
    handleSuccess(res, file, fileList) {
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
    }
  }
}
</script>

<style scoped lang="less"></style>
