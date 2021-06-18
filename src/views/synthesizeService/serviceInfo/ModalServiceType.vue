<template>
  <el-dialog :title="itemInfo.id ? '编辑' : '新建'" :visible="visible" width="520px" @close="handleCancel">
    <el-form ref="form" :model="form" :rules="rules" label-width="160px">
      <el-form-item label="服务类型" prop="type">
        <el-input v-model="form.type" placeholder="请输入服务类型" />
      </el-form-item>
      <el-form-item label="当月累计数量(已完成)" prop="completed">
        <el-input v-model="form.completed" placeholder="请输入已完成数量" />
      </el-form-item>
      <el-form-item label="当月累计数量(处理中)" prop="dealing">
        <el-input v-model="form.dealing" placeholder="请输入处理中数量" />
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="btnLoading" @click="handleEnter">确 定</el-button>
      <el-button @click="handleCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Api from '@/api/synthesizeService'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    itemInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        id: '',
        type: undefined,
        completed: undefined,
        dealing: undefined
      },
      rules: {
        type: [{ required: true, message: '必填' }],
        completed: [
          { required: true, message: '必填' },
          {
            pattern: /^\+?[1-9]\d*$/,
            message: '请输入大于0的整数'
          }
        ],
        dealing: [
          { required: true, message: '必填' },
          {
            pattern: /^\+?[1-9]\d*$/,
            message: '请输入大于0的整数'
          }
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
          this.form = _.cloneDeep(this.itemInfo)
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
          this.btnLoading = true
          if (this.form.id) {
            // 编辑
            const params = {
              id: this.form.id,
              type: this.form.type,
              completed: this.form.completed,
              dealing: this.form.dealing
            }
            Api.editConvenient(params).then(
              res => {
                this.handleCancel()
                this.$message.success('操作成功')
                this.$emit('refresh')
                this.btnLoading = false
              },
              err => {
                console.log(err)
                this.btnLoading = false
              }
            )
          } else {
            // 新增
            Api.addConvenient(this.form).then(
              res => {
                this.handleCancel()
                this.$message.success('操作成功')
                this.$emit('refresh')
                this.btnLoading = false
              },
              err => {
                console.log(err)
                this.btnLoading = false
              }
            )
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
