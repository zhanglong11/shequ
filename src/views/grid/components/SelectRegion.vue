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
import { treeForEach, treeFilter } from '@/utils'
export default {
  name: 'SelectGridDepartment',
  components: { TreeSelect },
  props: {},
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
      let treeData = _.cloneDeep(this.$store.state.grid.communityTreeData)
      treeData = treeFilter(treeData, item => item.type < 3)
      treeForEach(treeData, item => (item.disabled = item.type !== 2))
      return treeData
    }
  },
  created() {
    if (!this.treeData.length) this.$store.dispatch('grid/getStructTreeData')
  },
  mounted() {},
  methods: {
    handleChange(val, label, extra) {
      this.$emit('input', val)
      this.$emit('update:orgId', extra.triggerNode.dataRef.parentId)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
