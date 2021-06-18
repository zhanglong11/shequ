<template>
  <el-dialog width="400px" :title="'签到二维码'" class="beauty" :visible="visible" @close="close">
    <div v-if="visible" style="text-align: center">
      <el-image :src="url" />
    </div>
    <footer slot="footer" style="text-align: center">
      <el-button v-promise-btn type="primary" @click="dowmLoad">下载二维码</el-button>
    </footer>
  </el-dialog>
</template>
<script>
import Api from '../api'
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
      url: ''
    }
  },
  mounted() {
    this.getActivityQrCode()
  },
  methods: {
    // 获取签到二维码
    async getActivityQrCode() {
      const result = await Api.getActivityQrCode(
        this.id,
        `${process.env.VUE_APP_BASE_WX_URL}/pages/association/detailsVolunteerActivity`
      )
      const datas = result.data
      this.url = window.URL.createObjectURL(datas)
    },
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
