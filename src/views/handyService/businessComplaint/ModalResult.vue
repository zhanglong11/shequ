<template>
  <el-dialog title="填写处理结果" :visible="visible" width="600px" @close="handleCancel">
    <el-form ref="form" :model="form" :rules="formRules" label-width="100px">
      <el-form-item label="处理结果" prop="dealResult">
        <el-input v-model="form.dealResult" type="textarea" resize="none" :rows="3" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="本次扣分" prop="score">
        <el-input-number v-model="form.score" :min="1" />
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
        dealResult: '',
        score: undefined,
        dealFileIds: ''
      },
      formRules: {
        dealResult: [{ required: true, message: '必填' }],
        score: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      btnLoading: false
    }
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
          console.log(this.form)
          const params = {
            id: this.item.id,
            ...this.form
          }
          this.btnLoading = true
          Api.updateMerchantComplain(params).then(
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
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog__body {
  padding: 10px 20px;
}
</style>
