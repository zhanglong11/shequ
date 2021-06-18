<template>
  <div class="container has-footer">
    <div class="inner-wrapper">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <div class="common-card">
          <div class="common-card-title">
            <span class="title-content"></span>
            <span class="title-opt">
              <el-button type="text"></el-button>
            </span>
          </div>
          <div class="common-card-body">
            <el-row>
              <el-col :span="12">
                <el-form-item v-if="model !== '智慧党建'" label="发布部门" prop="parentId">
                  <DepartmentSelect v-model="form.parentId" style="width: 100%" allow-root />
                </el-form-item>
                <el-form-item v-else label="发布党组织" prop="parentId">
                  <SelectCcpDepartment v-model="form.parentId" style="width: 100%" allow-root />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公告标题" prop="title">
                  <el-input v-model="form.title" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="接收人" prop="recipientId">
                  <SelectUserNotice
                    v-if="model !== '智慧党建'"
                    v-model="form.recipientId"
                    :name.sync="form.recipientName"
                    width="100%"
                  ></SelectUserNotice>
                  <SelectCcpUser
                    v-else
                    v-model="form.recipientId"
                    idCardNumberAsKey
                    withActiveMember
                    multiple
                    :name.sync="form.recipientName"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公告类型" prop="type">
                  <Select v-model="form.type" :arg-group="noticeType"> </Select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="封面图片" prop="surfacePlot">
                  <UploadImage v-model="form.surfacePlot" isOnlyBtn list-type="text" :limit="1"></UploadImage>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="公告内容" prop="content">
                  <Editor v-model="form.content"></Editor>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="公告标签" prop="label">
                  <InputTag v-model="form.label" width="100%"></InputTag>
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
        </div>
      </el-form>
      <QRcodeDialog v-if="codeDialogVisible" :id="previewId" :visible.sync="codeDialogVisible"></QRcodeDialog>
    </div>
    <div class="footer-button">
      <el-button type="primary" @click="preview">二维码预览</el-button>
      <el-button type="primary" @click="submit(false)">保存</el-button>
      <el-button v-if="hasSubmitCheck" type="primary" @click="submit(true)">保存并核对</el-button>
      <el-button @click="$back">返回</el-button>
    </div>
  </div>
</template>

<script>
import Api from '../../api'
import { noticeTypeList } from '../../lib'
import InputTag from './InputTag'
import SelectUserNotice from './SelectUserNotice'
import DepartmentSelect from '@/views/system/department/components/DepartmentSelect'
import SelectCcpDepartment from '@/views/ccp/components/SelectCcpDepartment'
import QRcodeDialog from '../CommonNoticeDetail/components/QRcodeDialog'
export default {
  name: 'CommonNoticeAdd',
  components: { SelectCcpDepartment, InputTag, SelectUserNotice, DepartmentSelect, QRcodeDialog },
  props: {
    /* 模块 */
    model: {
      type: String,
      default: ''
    },
    /* 公告类型 */
    noticeType: {
      type: String,
      default: 'notificationType'
    },
    // 提交核对
    hasSubmitCheck: {
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
      id: this.$route.params.id || '',
      noticeTypeList,
      codeDialogVisible: false,
      form: {
        recipientId: '',
        recipientName: '',
        topFlag: 0
      },
      rules: {
        parentId: [{ required: true, message: '必选' }],
        title: [{ required: true, message: '必填' }],
        recipientId: [{ required: true, message: '不能为空' }],
        surfacePlot: [{ required: true, message: '不能为空' }],
        type: [{ required: true, message: '必选' }],
        content: [{ required: true, message: '不能为空' }],
        /* label: [{ required: true, message: '不能为空' }], */
        topFlag: [{ required: true, message: '必选' }]
      },
      previewId: this.$route.params.id || ''
    }
  },
  computed: {
    parentType() {
      return this.$getModelType(this.model)
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
    if (this.id) {
      this.getDetail()
    }
  },
  methods: {
    // 获取详情
    async getDetail() {
      const res = await Api.notice.getDetailById(this.id)
      this.form = { ...res.data }
    },
    // 二维码预览
    preview() {
      this.submit(false, true)
    },
    async submit(isSubmit = false, preview = false) {
      await this.$refs.form.validate()
      const params = {
        ...this.form,
        parentType: this.parentType
      }
      let result = ''
      if (isSubmit) {
        result = await Api.notice.addSubmit(params)
      } else {
        result = this.id ? await Api.notice.update(params) : await Api.notice.add(params)
      }
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
        this.form.topFlag = 0
        this.previewId = id
        this.codeDialogVisible = true
      } else {
        this.$message.success(`${this.id ? '修改' : '添加'}成功`)
        this.$back()
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
