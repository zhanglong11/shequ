<template>
  <div class="big-card" :class="{ overflow: overflow }">
    <div class="card-header">
      <img v-if="icon" :src="icon" class="icon" />
      <span class="title">{{ title }}</span>
      <img src="../images/title/title-right.png" class="r-icon" />
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    // 是否出现滚动条
    overflow: {
      type: Boolean,
      deafult: false
    }
  },
  data() {
    // 这里存放数据
    return {}
  },
  mounted() {},
  // 方法集合
  methods: {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.big-card {
  margin-top: 20px;
  margin-left: 20px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  flex: 1;
  display: flex;
  flex-direction: column;
  .card-header {
    margin: 15px;
    padding: 0 4px 7px 8px;
    display: flex;
    align-items: center;
    border-bottom: 1px #daa5a0 solid;
    position: relative;
    .icon {
      margin-right: 8px;
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
  .card-body {
    flex: 1;
    margin: 0 0 20px;
    padding: 0 20px;
  }
  &.overflow {
    overflow: hidden;
    .card-body {
      overflow-y: auto;
    }
  }
}
</style>
