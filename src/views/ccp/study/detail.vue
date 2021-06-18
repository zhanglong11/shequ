<template>
  <div class="container">
    <el-tabs>
      <el-tab-pane label="详情">
        <el-form class="colon" inline>
          <el-form-item label="标题">
            <span>{{ form.title }}</span>
          </el-form-item>
          <el-form-item label="类型">
            <span>{{ form.typeName }}</span>
          </el-form-item>
          <el-form-item label="创建人">
            <span>{{ form.creatorName }}</span>
          </el-form-item>
          <el-form-item label="创建时间">
            <span>{{ form.createTime }}</span>
          </el-form-item>
          <el-form-item label="发布状态">
            <span>{{ $getLabel(studyPublishOptions, form.publishFlag) }}</span>
          </el-form-item>
          <el-form-item label="发布时间">
            <span>{{ form.publishTime }}</span>
          </el-form-item>
          <br />
          <el-form-item label="接收人">
            <span>{{ form.recipientName && form.recipientName.join(',') }}</span>
          </el-form-item>
          <br />
          <el-form-item label="内容">
            <div v-html="form.content"></div>
          </el-form-item>
          <br />
          <el-form-item label="附件">
            <FileList :ids="form.fileIds"></FileList>
          </el-form-item>
          <QRcodeDialog
            v-if="codeDialogVisible"
            :id="id"
            :visible.sync="codeDialogVisible"
            type="study"
            title="党员学习详情"
          ></QRcodeDialog>
          <footer-button>
            <el-button type="primary" @click="handlePreview">二维码预览</el-button>
            <button-link type="primary" to="./">编辑</button-link>
            <el-button v-if="form.publishFlag === 0" type="primary" @click="publish">发布</el-button>
            <el-button v-else type="primary" @click="cancelPublish">取消发布</el-button>
            <el-button v-if="id" type="danger" @click="handleRemove">删除</el-button>
            <el-button @click="$back">返回</el-button>
          </footer-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane lazy label="学习记录">
        <Logs :studyId="id"></Logs>
      </el-tab-pane>
      <el-tab-pane lazy label="学习心得">
        <Exp :studyId="id"></Exp>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  getPartyStudyById,
  partyStudCancelPublishById,
  partyStudPublishById,
  removePartyStudyById
} from '@/api/ccp/study'
import { studyPublishOptions } from '@/views/ccp/lib/options'
import Logs from './components/Logs'
import Exp from './components/Exp'
import QRcodeDialog from '@/views/epidemicControl/components/notice/CommonNoticeDetail/components/QRcodeDialog'

export default {
  name: 'CcpStudyDetail',
  components: { Logs, Exp, QRcodeDialog },
  data() {
    return {
      form: {},
      id: this.$route.params.id,
      codeDialogVisible: false,
      studyPublishOptions
    }
  },
  created() {
    this.refresh()
  },
  mounted() {},
  methods: {
    refresh() {
      getPartyStudyById(this.id).then(res => {
        this.form = res.data
      })
    },
    async publish() {
      await partyStudPublishById(this.id)
      this.$message.success('操作成功')
      this.refresh()
    },
    async cancelPublish() {
      await partyStudCancelPublishById(this.id)
      this.$message.success('操作成功')
      this.refresh()
    },
    async handleRemove() {
      await this.$remove(this.form)
      await removePartyStudyById(this.form.id)
      this.$message.success('删除成功')
      this.activeId = null
      this.$back()
    },
    handlePreview() {
      this.codeDialogVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.el-form-item {
  margin-right: 60px;
}
</style>
