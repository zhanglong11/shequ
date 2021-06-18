<template>
  <div>
    <span class="status-point" :style="{ backgroundColor: activeOption.color }"></span>
    <span>{{ activeOption.label }}</span>
  </div>
</template>

<script>
export default {
  name: 'MeetingStatus',
  props: {
    argGroup: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default() {
        return [
          { color: '#fa4343', value: 0, label: '未开始' },
          { color: '#0E77D1', value: 1, label: '进行中' },
          { color: '#00A854', value: 2, label: '已结束' },
          { color: '#FFCC00', value: 3, label: '已取消' }
        ]
      }
    },
    value: {
      type: [String, Number]
    }
  },
  computed: {
    activeOption() {
      return _.find(this.list, { value: this.value }, this.options[0]) || { label: '未知', color: '#aaa' }
    },
    list() {
      return this.argGroup ? this.$store.state.systemConfig.config[this.argGroup]?.children || [] : this.options
    }
  }
}
</script>

<style scoped lang="less">
.status-point {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 50%;
  & + span {
    margin-left: 5px;
  }
}
</style>
