<template>
  <TreeSelect
    :replace-fields="replaceFields"
    style="width: 100%"
    treeNodeLabelProp="label"
    v-bind="$attrs"
    :treeData="treeData"
    @change="handleChange"
  ></TreeSelect>
</template>

<script>
import { TreeSelect } from 'ant-design-vue'
import { treeForEach } from '@/utils'
export default {
  name: 'SelectCommunityFloor',
  components: { TreeSelect },
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
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
      const treeData = this.$store.state.grid.communityTreeData
      treeForEach(treeData, (item, parent) => {
        item.label = item.name
        if (parent && parent.label) {
          item.label = parent.label + '-' + item.label
        }
        item.disabled = item.type !== 5
      })
      return treeData
    }
  },
  created() {
    if (!this.treeData.length) this.$store.dispatch('grid/getStructTreeData')
  },
  mounted() {},
  methods: {
    handleChange(val) {
      this.$emit('input', val)
      if (this.elFormItem?.validate) {
        this.$nextTick().then(() => {
          this.elFormItem.validate()
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
