<template>
  <el-dialog title="设置" :visible="visible" width="500px" @close="handleCancel">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="初始积分值" prop="initPoint">
        <el-input-number v-model="form.initPoint" :min="0" :max="100" :step="1" step-strictly />
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
    initScore: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      form: {
        initPoint: undefined
      },
      rules: {
        initPoint: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      btnLoading: false
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.form?.resetFields()
          if (this.initScore >= 0) {
            this.form.initPoint = this.initScore
          }
        })
      }
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
          // console.log('确定')
          const params = {
            companyId: this.$store.state.user.companyId,
            initScore: this.form.initPoint,
            module: 1 // 所属模块：1商户投诉、2物业投诉
          }
          this.btnLoading = true
          Api.setMerchantScore(params).then(
            res => {
              this.$message.success('操作成功')
              this.handleCancel()
              this.$emit('refreshInitScore')
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

<style lang="less" scoped></style>
