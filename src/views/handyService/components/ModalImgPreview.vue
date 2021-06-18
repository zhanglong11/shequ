<template>
  <el-dialog :visible="visible" width="800px" @close="handleCancel">
    <div class="img-dialog-con">
      <img :src="imgUrl" alt="" />
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    imgUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    handleCancel() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="less" scoped>
.img-dialog-con {
  border: solid 1px #e5e5e5;
  padding: 10px;
  img {
    width: 760px !important;
    height: 400px !important;
    object-fit: contain;
  }
}
</style>
