<template>
  <el-dialog width="400px" :title="'签到二维码'" class="beauty" :visible="visible" @close="close">
    <div style="text-align: center">
      <vue-qr :text="url" :size="200"></vue-qr>
    </div>

    <footer slot="footer" style="text-align: center">
      <el-button v-promise-btn type="primary" @click="dowmLoad">下载二维码</el-button>
    </footer>
  </el-dialog>
</template>
<script>
import vueQr from 'vue-qr'
export default {
  name: 'SignAdd',
  components: { vueQr },
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
      url: 'https://img1.baidu.com/it/u=1977046168,368269341&fm=26&fmt=auto&gp=0.jpg'
    }
  },
  methods: {
    dowmLoad() {},
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
