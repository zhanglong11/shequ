<template>
  <div class="container has-footer">
    <div class="inner-wrapper">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <div class="common-card-body">
          <el-row>
            <el-col :span="12">
              <el-form-item label="标题" prop="title">
                <el-input v-model="form.title" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="类型" prop="type">
                <Select v-model="form.type" arg-group="guidanceType"> </Select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="内容" prop="content">
                <Editor v-model="form.content"></Editor>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="24">
              <el-form-item label="是否顶置">
                <el-radio-group v-model="form.topFlag">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row> -->
        </div>
      </el-form>
      <QRcodeDialog
        v-if="codeDialogVisible"
        :id="id"
        :visible.sync="codeDialogVisible"
        type="thePublicGuide"
        title="办事指南"
      ></QRcodeDialog>
    </div>
    <div class="footer-button">
      <el-button type="primary" @click="preview">二维码预览</el-button>
      <el-button v-promise-btn type="primary" @click="submit(false)">保存</el-button>
      <el-button v-promise-btn type="primary" @click="submit(true)">保存并发布</el-button>
      <el-button @click="$back">返回</el-button>
    </div>
  </div>
</template>

<script>
import Api from '../api'
import QRcodeDialog from '@/views/epidemicControl/components/notice/CommonNoticeDetail/components/QRcodeDialog'
// import ruless from '@/utils/regular'
export default {
  name: 'GuidanceAdd',
  components: { QRcodeDialog },
  data() {
    return {
      id: this.$route.params.id || '',
      codeDialogVisible: false,
      form: {
        status: 0
      },
      rules: {
        title: [{ required: true, message: '必填' }],
        type: [{ required: true, message: '必填' }],
        content: [{ required: true, message: '必填' }]
      }
    }
  },
  computed: {},
  watch: {
    'form.content'(e) {
      if (e === '<p><br/></p>') {
        return _.trim((this.form.content = ''))
      }
      return _.trim(this.form.content)
    }
  },
  created() {
    if (this.id) {
      this.getDetail()
    }
  },
  methods: {
    // 获取详情
    async getDetail() {
      const res = await Api.getthePublicGuideDetail(this.id)
      this.form = { ...res.data }
    },
    preview() {
      this.submit(false, true)
    },
    // 保存
    async submit(isSubmit = false, preview = false) {
      await this.$refs.form.validate()
      const params = {
        ...this.form
      }
      let result = ''
      let msg = ''
      if (isSubmit) {
        params.status = 1
        result = this.id ? await Api.getthePublicGuideUpdate(params) : await Api.getthePublicGuideAdd(params)
        msg = `${this.id ? '修改' : '添加'}发布成功`
      } else {
        result = this.id ? await Api.getthePublicGuideUpdate(params) : await Api.getthePublicGuideAdd(params)
        msg = `${this.id ? '修改' : '添加'}成功`
      }
      if (preview) {
        if (this.id) {
          this.codeDialogVisible = true
          return
        }
        const id = result.data
        this.id = id
        this.form.id = id
        this.form.status = 0
        this.form.topFlag = 0
        this.codeDialogVisible = true
      } else {
        this.$message.success(msg)
        this.$back()
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
