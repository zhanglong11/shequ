<template>
  <TreeSelect
    treeIcon
    :replace-fields="replaceFields"
    style="width: 100%"
    show-search
    allow-clear
    :multiple="multiple"
    treeNodeFilterProp="title"
    :treeCheckable="multiple"
    v-bind="$attrs"
    :treeData="treeData"
    :value="computedValue"
    @change="handleChange"
  >
  </TreeSelect>
</template>

<script>
import { TreeSelect } from 'ant-design-vue'
import treeMap from '@/utils/treeMap'
import { getOrganizationTree } from '@/api/system/user'
export default {
  name: 'SelectSystemUser',
  components: { TreeSelect },
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      replaceFields: {
        key: 'dataUnicode',
        value: 'dataUnicode',
        title: 'dataName'
      },
      treeData: []
    }
  },
  computed: {
    computedValue() {
      return this.multiple ? (this.value ? this.value.split(',') : []) : this.value
    }
  },
  created() {
    this.refresh()
  },
  mounted() {},
  methods: {
    refresh() {
      getOrganizationTree().then(res => {
        this.treeData = treeMap(res.data, item => {
          item.icon = item.organType !== 2 ? <i class="el-icon-folder" /> : <i class="el-icon-s-custom" />
          item.disabled = this.multiple ? _.size(item.children) === 0 && item.organType === 1 : item.organType === 1
          return item
        })
      })
    },
    handleChange(val) {
      this.$emit('input', this.multiple ? val.join(',') : val)
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
