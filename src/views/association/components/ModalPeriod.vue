<template>
  <el-dialog title="二维码有效期" :visible="visible" width="480px" @close="handleCancel">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="有效期" prop="minutes">
        <el-input v-model="form.minutes">
          <template slot="append">分</template>
        </el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="btnLoading" @click="handleEnter">确 定</el-button>
      <el-button @click="handleCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Api from '../api'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      descriptionInfo: {
        groupActivity: '社群活动',
        volunteerActivity: '志愿活动',
        meetingsManage: '会议管理',
        ccpActivity: '党建活动'
      },
      form: {
        minutes: ''
      },
      rules: {
        minutes: [
          { required: true, message: '必填' },
          { pattern: /^\+?[1-9]\d*$/, message: '请输入大于0的整数' }
        ]
      },
      btnLoading: false
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.getCodePeriod()
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
          const params = {
            code: this.code,
            value: this.form.minutes,
            description: this.descriptionInfo[this.code]
          }
          this.btnLoading = true
          Api.setCodePeriod(params).then(
            res => {
              this.$message.success('操作成功')
              this.handleCancel()
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
    // 获取二维码有效期
    getCodePeriod() {
      const params = {
        code: this.code // 参数编码
      }
      Api.getCodePeriod(params).then(res => {
        this.form.minutes = res.data ? res.data.value : 60
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
