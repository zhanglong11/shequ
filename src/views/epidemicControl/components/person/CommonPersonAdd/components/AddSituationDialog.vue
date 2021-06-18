<template>
  <el-dialog
    :title="_.isEmpty(info) ? '新建' : '修改'"
    :close-on-click-modal="false"
    width="600px"
    class="beauty bg-border"
    :visible="visible"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="记录内容" prop="content">
        <el-input v-model="form.content" type="textarea" :rows="4" :maxlength="200" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">{{ _.isEmpty(info) ? '新建' : '修改' }}</el-button>
    </footer>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddSituationDialog',
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
      form: { ...this.info },
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
