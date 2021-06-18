<template>
  <TreeSelect
    :replace-fields="replaceFields"
    style="width: 100%"
    treeNodeFilterProp="title"
    v-bind="$attrs"
    :treeData="treeData"
    @change="handleChange"
  ></TreeSelect>
</template>

<script>
import { TreeSelect } from 'ant-design-vue'
import { treeFilter } from '@/utils'
export default {
  name: 'SelectCcpDepartment',
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
        title: 'title'
      }
    }
  },
  computed: {
    treeData() {
      if (this.disabledKeys) {
        return treeFilter(this.$store.state.ccp.structTreeData, (item, parent) => {
          if (parent && parent.disabled) {
            item.disabled = true
            return false
          }
          const disabled = this.disabledKeys.includes(item.id)
          if (disabled) item.disabled = true
          return !disabled
        })
      } else {
        return this.$store.state.ccp.structTreeData
      }
    }
  },
  created() {
    if (!this.treeData.length) this.$store.dispatch('ccp/getStructTreeData')
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
