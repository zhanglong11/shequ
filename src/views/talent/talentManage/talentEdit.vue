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
              <el-form-item label="封面图片" prop="surfacePic">
                <UploadImage v-model="form.surfacePic" :limit="1" />
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
          <el-row>
            <el-col :span="24">
              <el-form-item label="视频" prop="video">
                <Upload v-model="form.video" isOnlyButton multiple :limit="1" accept=".mp4" btnText="选择文件" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="是否顶置">
                <el-radio-group v-model="form.topFlag">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="footer-button">
      <el-button type="primary" @click="submit()">保存</el-button>
      <el-button @click="$back">返回</el-button>
    </div>
  </div>
</template>

<script>
import Api from '../api'
export default {
  name: 'TalentEdit',

  data() {
    return {
      id: this.$route.params.id || '',
      form: {
        topFlag: 0
      },
      rules: {
        title: [{ required: true, message: '必填' }],
        surfacePic: [{ required: true, message: '必填' }],
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
      const res = await Api.getcommunityDetail(this.id)
      this.form = { ...res.data }
    },
    preview() {
      this.codeDialogVisible = true
    },
    async submit() {
      await this.$refs.form.validate()
      const params = {
        ...this.form
      }
      this.id ? await Api.getcommunityUpdate(params) : await Api.getcommunityAdd(params)
      this.$message.success(`${this.id ? '修改' : '添加'}成功`)
      this.$back()
    }
  }
}
</script>

<style scoped lang="less"></style>
