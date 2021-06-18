<template>
  <div>
    <span class="status-point" :style="{ backgroundColor: activeOption.color }"></span>
    <span>{{ activeOption.label }}</span>
  </div>
</template>

<script>
export default {
  name: 'Status',
  props: {
    argGroup: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default() {
        return [
          { color: '#fa4343', value: 0, label: '停用' },
          { color: '#05c95c', value: 1, label: '启用' }
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
