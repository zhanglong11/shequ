<template>
  <div>
    <el-dialog width="600px" :title="'审核'" class="beauty" :visible="visible" @close="close">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="审核结果：" prop="auditStatus">
          <el-radio v-model="form.auditStatus" label="2">驳回</el-radio>
          <el-radio v-model="form.auditStatus" label="1">通过</el-radio>
        </el-form-item>
        <el-form-item label="说明：" prop="explain">
          <el-input v-model="form.explain" type="textarea" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button v-promise-btn type="primary" @click="submit">确定</el-button>
      </footer>
    </el-dialog>
  </div>
</template>
<script>
import Api from '../api'
export default {
  name: 'CheckAdd',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    id: String
  },
  data() {
    return {
      form: {
        id: this.id
      },
      rules: {
        auditStatus: [{ required: true, message: '必选' }]
      }
    }
  },
  methods: {
    async submit() {
      await this.$refs.form.validate()
      await Api.getinformGoodsAudit({ ...this.form })
      this.$message.success('操作成功')
      this.$parent.refresh()
      this.close()
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
