<template>
  <TreeSelect
    :replace-fields="replaceFields"
    style="width: 100%"
    v-bind="$attrs"
    :treeData="treeData"
    @change="handleChange"
  ></TreeSelect>
</template>

<script>
import { TreeSelect } from 'ant-design-vue'
import { treeFilter } from '@/utils'
export default {
  name: 'SelectGridDepartment',
  components: { TreeSelect },
  props: {
    disabledKeys: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      replaceFields: {
        key: 'id',
        value: 'id',
        title: 'name'
      }
    }
  },
  computed: {
    treeData() {
      if (this.disabledKeys) {
        return treeFilter(this.$store.state.grid.structTreeData, (item, parent) => {
          if (parent && parent.disabled) {
            item.disabled = true
            return false
          }
          const disabled = this.disabledKeys.includes(item.id)
          if (disabled) item.disabled = true
          return !this.disabledKeys.includes(item.id)
        })
      } else {
        return this.$store.state.grid.structTreeData
      }
    }
  },
  created() {
    if (!this.treeData.length) this.$store.dispatch('grid/getStructTreeData')
  },
  mounted() {},
  methods: {
    handleChange(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
