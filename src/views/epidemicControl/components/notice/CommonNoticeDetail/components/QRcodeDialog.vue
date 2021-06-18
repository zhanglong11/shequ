<template>
  <el-dialog title="预览" width="400px" class="beauty bg-border" :visible="visible" @close="close">
    <div style="text-align: center">
      <template v-if="id">
        <vue-qr :text="url" :size="200"></vue-qr>
        <p>请扫描二维码预览</p>
      </template>
      <template v-else>
        <p>二维码生成失败</p>
      </template>
    </div>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import vueQr from 'vue-qr'
export default {
  name: 'QRcodeDialog',
  components: { vueQr },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    id: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      url: `${location.origin}/#/qrCodePreview?id=${this.id}&type=${this.type}&title=${this.title}`
    }
  },
  methods: {
    // 关闭弹窗
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped lang="less"></style>
