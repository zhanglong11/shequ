<template>
  <el-dialog title="重命名" width="500px" class="beauty bg-border" :visible="visible" @close="close">
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
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
  name: 'RenameDialog',
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: { ...this.info, name: this.info.name.split('.')[0] || '' },
      rules: {
        name: [{ required: true, message: '必选' }]
      }
    }
  },
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
