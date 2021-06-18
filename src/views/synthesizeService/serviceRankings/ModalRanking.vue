<template>
  <el-dialog title="新建排行服务类型" :visible="visible" width="450px" @close="handleCancel">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="服务类型" prop="type">
        <el-select v-model="form.type" style="width: 100%">
          <el-option v-for="(item, index) in typeList" :key="index" :value="item.id" :label="item.type" />
        </el-select>
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
    }
  },
  data() {
    return {
      form: {
        type: undefined
      },
      rules: {
        type: [{ required: true, message: '必选' }]
      },
      typeList: [],
      btnLoading: false
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.getConvenientAllList()
        })
      }
    }
  },
  methods: {
    // 填充服务类型下拉框数据
    async getConvenientAllList() {
      const res = await Api.getConvenientAllList({})
      if (res.data && res.data.length) {
        this.typeList = res.data
      } else {
        this.typeList = []
      }
    },
    // 取消
    handleCancel() {
      this.$emit('update:visible', false)
    },
    // 确定
    handleEnter() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = {
            type: this.typeList.filter(item => item.id === this.form.type)[0].type
          }

          const parentTableData = this.$parent.tableData
          let index = -1
          if (parentTableData.length) {
            // 判断是否有重复的排行服务
            index = _.findIndex(parentTableData, item => item.type === params.type)
          }

          if (index === -1) {
            this.btnLoading = true
            Api.addConvenientRank(params).then(
              res => {
                this.handleCancel()
                this.$message.success('操作成功')
                this.$emit('refresh')
                this.btnLoading = false
              },
              err => {
                this.btnLoading = false
                console.log(err)
              }
            )
          } else {
            this.$message.error('当前选择的服务已添加过，请重新选择')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
