<template>
  <el-dialog title="上传" width="1000px" class="beauty bg-border" :visible="visible" @close="close">
    <div>
      <UploadA
        ref="uploadA"
        v-model="fileId"
        :showFileList="false"
        multiple
        :folderId="parentId"
        :moduleType="moduleType"
        :content="content"
        @process="handleProcess"
      ></UploadA>
      <div class="upload-btn-wrap">
        <el-dropdown @command="handleUploadOpt">
          <el-button type="primary">
            <i class="el-icon-upload2"></i>上传{{ content }}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="file">文件</el-dropdown-item>
            <el-dropdown-item command="folder">文件夹</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="table-container">
        <vxe-table ref="xTable" :data="tableList" row-id="id">
          <vxe-table-column title="文件" field="name" min-width="150"></vxe-table-column>
          <vxe-table-column title="大小" field="size" width="120">
            <template #default="{ row }">
              {{ row.size | fileSize }}
            </template>
          </vxe-table-column>
          <vxe-table-column title="状态" field="aa" width="200">
            <template #default="{ row, $rowIndex }">
              <div class="process-container">
                <el-progress
                  :key="'pg' + $rowIndex"
                  :percentage="row.aa"
                  color="red"
                  :format="e => format(e, row)"
                ></el-progress>
                <p>{{ row.status === 'success' ? '上传成功' : '正在上传' }}</p>
              </div>
            </template>
          </vxe-table-column>
          <!--          <vxe-table-column title="状态" field="status" width="200"></vxe-table-column>-->
          <vxe-table-column title="操作" field="opts" width="120" fixed="right">
            <template #default="{ row, $rowIndex }">
              <el-button v-if="row.status === 'success'" type="danger" @click="handleDelete(row, $rowIndex)"
                >删除</el-button
              >
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import UploadA from './UploadA'
import Api from '@/views/epidemicControl/components/api'
export default {
  name: 'UploadDialog',
  components: { UploadA },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    parentId: {
      type: [String, Number],
      default: 0
    },
    moduleType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      action: '/wisdom-community-file/file/commonFile/upload',
      fileId: '',
      tableList: [],
      content: '文件'
    }
  },
  methods: {
    handleUploadOpt(e) {
      if (e === 'file') {
        this.content = '文件'
        this.$nextTick(() => {
          document.getElementsByClassName('el-upload__input')[0].webkitdirectory = false
        })
        // this.action = '/wisdom-community-file/file/commonFile/upload'
      } else {
        this.content = '文件夹'
        this.$nextTick(() => {
          document.getElementsByClassName('el-upload__input')[0].webkitdirectory = true
        })
        // this.action = '/wisdom-community-file/file/commonFile/uploadTwo'
      }
    },
    format(percentage, row) {
      return percentage === 100 ? (row.status === 'success' ? `100%` : '99%') : `${percentage}%`
    },
    // 上传时
    handleProcess(list) {
      this.tableList = [...list]
    },
    async handleDelete(row, index) {
      const res = await this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message.info('操作已取消')
      })
      if (res) {
        this.tableList.splice(index, 1)
        this.$refs.uploadA.$refs.upload.handleRemove(row, this.tableList)
        await Api.doc.deleteById(row.id)
        this.$message.success('操作成功')
        /* await this.$parent.refresh() */
      }
    },
    // 关闭弹窗
    async close() {
      await this.$refs.uploadA.abort()
      const arr = this.tableList.filter(item => item.response).map(item => item.id) || []
      if (arr.length) {
        await Api.doc.multipleDelete(arr)
      }
      this.$parent.refresh()
      this.$emit('update:visible', false)
    },
    async submit() {
      this.$parent.refresh()
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .el-upload {
  display: block;
  .el-upload-dragger {
    margin: 0 auto;
  }
}
.upload-btn-wrap {
  margin: 15px 0;
  display: flex;
  justify-content: center;
}
.process-container {
  p {
    margin-bottom: 0;
    text-align: left;
    padding-left: 45px;
  }
  /deep/ .el-progress {
    display: flex;
    align-items: center;
    .el-progress-bar {
      width: 130px;
      margin-right: 0;
      padding-right: 0;
    }
    .el-progress__text {
      font-size: 12px !important;
      text-align: left;
      flex: 1;
    }
  }
}
</style>
