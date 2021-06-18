<template>
  <div class="container has-footer">
    <div class="inner-wrapper">
      <div class="common-card">
        <div class="common-card-title">
          <span class="title-content"></span>
          <span class="title-opt">
            <el-button type="text"></el-button>
          </span>
        </div>
        <div class="common-card-body">
          <el-row type="flex">
            <el-col>
              <DetailItem label="公告标题" labelWidth="120">
                <div class="notice-title">
                  {{ info.title }}
                </div></DetailItem
              >
            </el-col>
            <el-col>
              <DetailItem
                :label="$route.name === 'CcpPublicityDetail' ? '发布党组织' : '发布部门'"
                labelWidth="100"
                :value="info.parentName"
              ></DetailItem>
            </el-col>
            <el-col>
              <DetailItem label="公告类型" labelWidth="80" :value="info.typeName"></DetailItem>
            </el-col>
            <el-col>
              <DetailItem
                label="发布时间"
                labelWidth="80"
                :value="info.status === 2 ? info.checkTime : '-'"
              ></DetailItem>
            </el-col>
            <el-col>
              <DetailItem label="创建人" labelWidth="80" :value="info.creatorName"></DetailItem>
            </el-col>
            <el-col>
              <DetailItem label="创建时间" labelWidth="80">{{ info.createTime | ymdhms }}</DetailItem>
            </el-col>
            <el-col>
              <DetailItem label="发布状态" labelWidth="80" :value="info.name">{{
                $getLabel(noticePublicStatusList, info.status)
              }}</DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <DetailItem label="接收人" labelWidth="120" :value="info.recipientName"></DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <DetailItem label="封面图片" labelWidth="120">
                <el-image
                  fit="contain"
                  :src="info.surfacePlot | imgUrl"
                  :preview-src-list="[
                    '/wisdom-community-file/noToken/file/commonFile/onlinePreview/' + info.surfacePlot
                  ]"
                >
                </el-image>
              </DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <DetailItem label="公告内容" labelWidth="120">
                <div v-html="info.content"></div>
                <!--<Editor v-model="info.content" disabled></Editor>-->
              </DetailItem>
            </el-col>
          </el-row>
          <DetailItem label="公告标签" labelWidth="120">
            <el-tag
              v-for="item of info.label ? info.label.split(',') : []"
              :key="item"
              style="margin: 0 5px"
              size="mini"
              >{{ item }}</el-tag
            >
          </DetailItem>
          <el-row>
            <el-col>
              <DetailItem label="是否置顶" labelWidth="120">{{ info.topFlag === 0 ? '否' : '是' }}</DetailItem>
            </el-col>
          </el-row>
          <template v-if="info.status > 1">
            <el-row>
              <el-col>
                <DetailItem label="核对人员" labelWidth="120" :value="info.checkPersonName"></DetailItem>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <DetailItem label="核对结果" labelWidth="120">{{ info.status === 2 ? '通过' : '不通过' }}</DetailItem>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <DetailItem label="说明" labelWidth="120" :value="info.checkOpinion"></DetailItem>
              </el-col>
            </el-row>
          </template>
        </div>
      </div>
    </div>
    <QRcodeDialog v-if="codeDialogVisible" :id="id" :visible.sync="codeDialogVisible"></QRcodeDialog>
    <div class="footer-button">
      <el-button type="primary" @click="codeDialogVisible = true">二维码预览</el-button>
      <template v-if="[0, 3].includes(info.status)">
        <el-button v-if="hasEdit" type="primary" @click="handleEdit">编辑</el-button>
        <el-button v-if="hasSubmitCheck" type="primary" @click="handleSubmitCheck">提交核对</el-button>
      </template>
      <el-button v-if="hasCancelPublic && info.status === 2" type="primary" @click="handleCancelPublic(row)"
        >取消发布</el-button
      >
      <el-button v-if="hasToTopSet && info.topFlag === 0" type="primary" @click="handleToTop">置顶</el-button>
      <el-button v-if="hasToTopSet && info.topFlag === 1" type="primary" @click="handleToTop">取消置顶</el-button>
      <template v-if="[0, 2, 3].includes(info.status)">
        <el-button v-if="hasDelete" type="danger" @click="handleDelete">删除</el-button>
      </template>
      <el-button @click="$back()">返回</el-button>
    </div>
  </div>
</template>

<script>
import QRcodeDialog from './components/QRcodeDialog'
import Api from '@/views/epidemicControl/components/api'
import { noticePublicStatusList } from '../../lib'
export default {
  name: 'CommonNoticeDetail',
  components: { QRcodeDialog },
  props: {
    /* 模块 */
    model: {
      type: String,
      default: ''
    },
    editRouterName: {
      type: String,
      default: ''
    },
    hasEdit: {
      type: Boolean,
      default: true
    },
    hasCancelPublic: {
      type: Boolean,
      default: true
    },
    hasDelete: {
      type: Boolean,
      default: true
    },
    // 提交核对
    hasSubmitCheck: {
      type: Boolean,
      default: true
    },
    // 置顶/取消置顶
    hasToTopSet: {
      type: Boolean,
      default: true
    },
    // 二维码预览
    hasPreviewQRcode: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      noticePublicStatusList,
      id: this.$route.params.id || '',
      codeDialogVisible: false,
      info: {}
    }
  },
  watch: {},
  created() {
    if (this.id) {
      this.getDetail()
    }
  },
  methods: {
    // 获取详情
    async getDetail() {
      const res = await Api.notice.getDetailById(this.id)
      this.info = { ...res.data }
    },
    handleEdit() {
      this.$router.push({
        name: this.editRouterName,
        params: {
          id: this.id
        }
      })
    },
    // 提交核对
    async handleSubmitCheck() {
      const res = await this.$confirm('是否确认提交核对?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message.info('操作已取消!')
      })
      if (res) {
        await Api.notice.toSubmitCheck({ id: this.id, status: 1 })
        this.$message.success('提交核对成功!')
        await this.getDetail()
      }
    },
    // 取消发布
    async handleCancelPublic(row) {
      await Api.notice.cancelPublic({ id: this.id, status: 0 })
      this.$message.success('取消发布成功!')
      await this.getDetail()
    },
    // 置顶/取消置顶操作
    async handleToTop() {
      await Api.notice.changeTopStatus({ id: this.id, topFlag: +!this.info.topFlag })
      this.$message.success('操作成功!')
      await this.getDetail()
    },
    // 删除
    async handleDelete() {
      const res = await this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message.info('操作已取消!')
      })
      if (res) {
        await Api.notice.deleteById(this.id)
        this.$message.success('删除成功!')
        await this.$back()
      }
    }
  }
}
</script>

<style scoped lang="less">
.notice-title {
  max-width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
/deep/ .el-image {
  max-height: 400px;
  max-width: 600px;
}
</style>
