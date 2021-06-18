<template>
  <div>
    <el-dialog
      class="bim-dialog"
      :visible.sync="dialogVisible"
      :width="popupWidth"
      :show-close="showClose"
      :append-to-body="appendToBody"
      @close="dialogClose"
    >
      <!-- 自定义头部 start -->
      <div class="card-header">
        <img :src="icon" class="icon" />
        <span class="title">{{ dialogTitle }}</span>
        <img src="../images/close.png" class="r-icon" @click="dialogVisible = false" />
      </div>
      <!-- 自定义头部 end -->
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: require('../images/modal.png')
    },
    dialogTitle: {
      type: String,
      default: '标题'
    },
    popupWidth: {
      type: String,
      default: '860px'
    },
    showClose: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    dialogClose() {
      this.$emit('dialogClose')
    }
  }
}
</script>

<style lang="less" scoped>
.card-header {
  padding: 0 4px 7px 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px #daa5a0 solid;
  position: relative;
  margin-bottom: 15px;
  .icon {
    margin-right: 8px;
  }
  .r-icon {
    cursor: pointer;
  }
  .title {
    flex: 1;
    font-size: 16px;
    font-weight: 700;
  }
  &:before,
  &:after {
    content: '';
    background: #ff4338;
    width: 3px;
    height: 3px;
    position: absolute;
    bottom: -1px;
  }
  &:before {
    left: 0;
  }
  &:after {
    right: 0;
  }
}
.bim-dialog {
  /deep/.el-dialog {
    .el-dialog__header {
      display: none !important;
    }
  }
}
</style>
