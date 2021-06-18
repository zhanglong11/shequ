<template>
  <el-dialog
    :title="title"
    :close-on-click-modal="false"
    width="500px"
    class="beauty bg-border"
    :visible="visible"
    @close="close"
  >
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="涉及部门" prop="involveDepartment">
          <el-input v-model="form.involveDepartment"></el-input>
        </el-form-item>
        <el-form-item label="解决意见或措施" prop="solution">
          <el-input v-model="form.solution" type="textarea" :rows="3" :maxlength="400" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="附件" prop="fileId">
          <Upload v-model="form.fileId" isOnlyButton multiple></Upload>
        </el-form-item>
      </el-form>
    </div>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">确定</el-button>
    </footer>
  </el-dialog>
</template>

<script>
export default {
  name: 'HandleDialog',
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: '处理'
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {},
      rules: {
        involveDepartment: [{ required: true, message: '必填' }],
        solution: [{ required: true, message: '必填' }]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 关闭弹窗
    close() {
      this.$emit('update:visible', false)
    },
    async submit() {
      await this.$refs.form.validate()
      console.log(111, this.form)
      this.$emit('submit', {
        ...this.form,
        fileId: this.form.fileId || ''
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
