<template>
  <el-dialog
    title="设置"
    :close-on-click-modal="false"
    width="500px"
    class="beauty bg-border"
    :visible="visible"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="初始积分值" prop="initScore">
        <InputNumber v-model="form.initScore" placeholder="请输入"></InputNumber>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">确定</el-button>
    </footer>
  </el-dialog>
</template>

<script>
export default {
  name: 'SetIntegral',
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      form: { initScore: 0 },
      rules: { initScore: [{ required: true, message: '必填' }] }
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
      this.$emit('submit', this.form)
    }
  }
}
</script>

<style scoped lang="less"></style>
