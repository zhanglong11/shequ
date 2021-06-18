<template>
  <div class="line-item">
    <div class="label" :style="{ width: labelWidth + 'px' }">{{ label }}</div>
    <div class="value">{{ value }} <slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'DetailItem',
  components: {},
  props: {
    label: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: [Number, String],
      default: 100
    },
    value: { default: '' }
  },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.line-item {
  display: flex;
  align-items: flex-start;
  line-height: 2;
  margin: 3px 0;
  font-size: 14px;
  .label {
    min-width: 100px;
    flex-grow: 0;
    flex-shrink: 0;
    text-align: right;
    color: #999;
    margin-right: 10px;
    &:after {
      content: ':';
    }
  }
  .value {
    flex: 1;
    color: #000;
  }
}
</style>
