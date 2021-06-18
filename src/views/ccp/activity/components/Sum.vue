<template>
  <el-dialog width="600px" :title="'上传活动总结'" class="beauty" :visible="visible" @close="close">
    <el-form ref="upForm" :model="upForm" :rules="rules" label-width="100px">
      <el-form-item label="活动总结" prop="activitySummarize">
        <el-input v-model="upForm.activitySummarize" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="附件" prop="activitySummarizeFile">
        <Upload v-model="upForm.activitySummarizeFile" isOnlyButton></Upload>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">确定</el-button>
    </footer>
  </el-dialog>
</template>
<script>
import Api from '@/views/association/api'
export default {
  name: 'UnitySum',
  props: {
    id: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      form: {},
      upForm: {},
      rules: {
        activitySummarize: [{ required: true, message: '必填' }]
      }
    }
  },
  created() {
    if (this.id) {
      Api.getActivityDetail(this.id).then(res => {
        this.form = res.data
      })
    }
  },
  methods: {
    async submit() {
      await this.$refs.upForm.validate()
      this.form.activitySummarize = this.upForm.activitySummarize
      this.form.activitySummarizeFile = this.upForm.activitySummarizeFile
      if (this.id) {
        Api.getActivityUpdate({ ...this.form }).then(res => {
          if (res.code === 200) {
            this.$message.success('上传成功')
            this.$emit('update:visible', false)
            this.$parent.refresh()
          }
        })
      }
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped lang="scss">
@import '~@/styles/variables.scss';
.el-form {
  max-width: 478px;
}
</style>
