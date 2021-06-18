<template>
  <el-dialog width="600px" :title="'签到二维码'" class="beauty" :visible="visible" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="" prop="fileId">
        <Upload v-model="form.fileId"></Upload>
      </el-form-item>
    </el-form>
    <footer slot="footer" style="text-align: center">
      <el-button v-promise-btn type="primary" @click="download">下载二维码</el-button>
    </footer>
  </el-dialog>
</template>
<script>
export default {
  name: 'UnitySign',
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
      form: {}
    }
  },
  watch: {
    visible(val) {
      if (val) this.refresh()
    }
  },
  methods: {
    download() {},
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
