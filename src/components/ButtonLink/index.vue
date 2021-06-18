<template>
  <router-link class="button-link" :to="to">
    <el-button v-bind="$attrs">
      <slot></slot>
    </el-button>
  </router-link>
</template>

<script>
export default {
  name: 'ButtonLink',
  props: {
    to: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less">
.el-button + .button-link {
  margin-left: 10px;
}
.button-link + .el-button {
  margin-left: 10px;
}
.button-link + .button-link {
  margin-left: 10px;
}
</style>
