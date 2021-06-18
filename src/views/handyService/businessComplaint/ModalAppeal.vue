<template>
  <el-dialog title="申诉处理" :visible="visible" width="600px" @close="handleCancel">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="申诉理由">{{ detailData.reason }}</el-form-item>
      <el-form-item label="提交人">{{ detailData.appealMan }}</el-form-item>
      <el-form-item label="提交时间">{{ detailData.createTime }}</el-form-item>
      <el-form-item label="附件">
        <FileList :ids="detailData.fileIds" />
      </el-form-item>
      <div class="line"></div>
      <el-form-item label="处理结果" prop="dealResult">
        <el-radio-group v-model="form.dealResult">
          <el-radio :label="1">申诉成功</el-radio>
          <el-radio :label="0">申诉失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="理由" prop="dealReason">
        <el-input v-model="form.dealReason" type="textarea" resize="none" :rows="3" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="附件" prop="dealFileIds">
        <Upload v-model="form.dealFileIds" is-only-button />
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="btnLoading" @click="handleEnter">确 定</el-button>
      <el-button @click="handleCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Api from '@/api/handyService'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        dealResult: undefined,
        dealReason: '',
        dealFileIds: ''
      },
      rules: {
        dealResult: [{ required: true, message: '必选' }],
        dealReason: [{ required: true, message: '必填' }]
      },
      detailData: {},
      btnLoading: false
    }
  },
  mounted() {
    this.getMerchantAppeal()
  },
  methods: {
    // 取消
    handleCancel() {
      this.$emit('update:visible', false)
    },
    // 确定
    handleEnter() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('确定')
          const params = {
            id: this.item.appealId,
            complainId: this.item.id,
            module: 1, // 1投诉、2巡查
            ...this.form
          }
          // console.log(params)
          this.btnLoading = true
          Api.updateMerchantAppeal(params).then(
            res => {
              this.$message.success('操作成功')
              this.handleCancel()
              this.$emit('refresh')
              this.btnLoading = false
            },
            err => {
              console.log(err)
              this.btnLoading = false
            }
          )
        }
      })
    },
    // 获取申诉信息
    getMerchantAppeal() {
      Api.getMerchantAppeal(this.item.appealId).then(res => {
        // console.log(res)
        this.detailData = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog__body {
  padding: 10px 20px;
}
.line {
  height: 1px;
  background: #e5e5e5;
}
</style>
