<template>
  <div class="container">
    <el-form ref="form" class="colon" label-width="100px" :rules="rules" :model="form">
      <div style="display: flex">
        <el-form-item style="flex: 1" label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item style="width: 400px" label="类型" prop="type">
          <Select v-model="form.type" arg-group="ccpStudyType"></Select>
        </el-form-item>
      </div>
      <el-form-item label="接收人" prop="recipientId">
        <SelectCcpUser v-model="form.recipientId" withActiveMember id-card-number-as-key multiple></SelectCcpUser>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <Editor v-model="form.content"></Editor>
      </el-form-item>
      <el-form-item label="附件">
        <Upload v-model="form.fileIds" is-only-button></Upload>
      </el-form-item>
      <footer-button>
        <el-button type="primary" @click="preview">二维码预览</el-button>
        <el-button type="primary" @click="save(false)">保存</el-button>
        <el-button type="primary" @click="saveAndPublish">保存并发布</el-button>
        <el-button @click="$back">返回</el-button>
      </footer-button>
      <QRcodeDialog
        v-if="codeDialogVisible"
        :id="previewId"
        :visible.sync="codeDialogVisible"
        type="study"
        title="党员学习详情"
      ></QRcodeDialog>
    </el-form>
  </div>
</template>

<script>
import { createPartyStudy, getPartyStudyById, updatePartyStudy } from '@/api/ccp/study'
import QRcodeDialog from '@/views/epidemicControl/components/notice/CommonNoticeDetail/components/QRcodeDialog'

export default {
  name: 'CcpStudyEdit',
  components: {
    QRcodeDialog
  },
  data() {
    return {
      form: {
        publishFlag: 0
      },
      rules: {
        title: [{ required: true, message: '必填' }],
        type: [{ required: true, message: '必填' }],
        recipientId: [{ required: true, message: '必填' }],
        content: [{ required: true, message: '必填' }]
      },
      id: this.$route.params.id,
      codeDialogVisible: false,
      previewId: this.$route.params.id || ''
    }
  },
  watch: {
    'form.content'(e) {
      if (e === '<p><br/></p>') {
        return _.trim((this.form.content = ''))
      }
      return _.trim(this.form.content)
    }
  },
  created() {
    this.id && this.refresh()
  },
  mounted() {},
  methods: {
    refresh() {
      getPartyStudyById(this.id).then(res => {
        this.form = res.data
      })
    },
    // 二维码预览
    preview() {
      this.save(true)
    },
    async save(preview = false) {
      await this.$refs.form.validate()
      const result = this.id ? await updatePartyStudy(this.form) : await createPartyStudy(this.form)

      if (preview) {
        if (this.id) {
          this.previewId = this.id
          this.codeDialogVisible = true
          return
        }
        const id = result.data
        this.id = id
        this.form.id = id
        this.form.status = 0
        this.previewId = id
        this.codeDialogVisible = true
      } else {
        this.$message.success('操作成功')
        this.$back()
      }
    },
    async saveAndPublish() {
      await this.$refs.form.validate()
      const form = _.assign(_.cloneDeep(this.form), { publishFlag: 1 })
      this.id ? await updatePartyStudy(form) : await createPartyStudy(form)
      this.$message.success('操作成功')
      this.$back()
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
