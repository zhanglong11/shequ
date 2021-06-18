<template>
  <el-dialog
    title="申诉处理"
    :close-on-click-modal="false"
    width="500px"
    class="beauty bg-border"
    :visible="visible"
    @close="close"
  >
    <div>
      <DetailItem label="申诉理由" labelWidth="120" :value="info.reason"></DetailItem>
      <DetailItem label="提交人" labelWidth="120" :value="info.appealMan"></DetailItem>
      <DetailItem label="提交时间" labelWidth="120" :value="info.appealCreateTime"></DetailItem>
      <DetailItem label="附件" labelWidth="120">
        <DetailItem label="附件" labelWidth="120">
          <ImgList :file-ids="info.fileIds"></ImgList>
        </DetailItem>
      </DetailItem>
      <el-divider></el-divider>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="处理结果" prop="name">
          <el-radio-group v-model="form.sex">
            <el-radio label="1">申诉成功</el-radio>
            <el-radio label="2">申诉失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="理由" prop="content">
          <el-input v-model="form.content" type="textarea" :rows="3" :maxlength="400" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="附件" prop="name">
          <Upload v-model="form.fileId" isOnlyButton></Upload>
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
  name: 'HandleAppealDialog',
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {},
      rules: { content: [{ required: true, message: '必填' }] }
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    userName() {
      return this.$store.state.user.name
    }
  },
  watch: {},
  methods: {
    // 关闭弹窗
    close() {
      this.$emit('update:visible', false)
    },
    async submit() {
      await this.$refs.form.validate()
      this.$emit('submit', this.form)
    }
  }
}
</script>

<style scoped lang="less"></style>
