<template>
  <TreeSelect
    treeIcon
    :replace-fields="replaceFields"
    style="width: 100%"
    show-search
    allow-clear
    :multiple="multiple"
    :treeCheckable="multiple"
    v-bind="$attrs"
    treeNodeFilterProp="title"
    :treeData="treeData"
    :value="computedValue"
    @change="handleChange"
  >
  </TreeSelect>
</template>

<script>
import { TreeSelect } from 'ant-design-vue'
import treeMap from '@/utils/treeMap'
export default {
  name: 'SelectCcpActiveMember',
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
    // 是否使用身份证号作为key和value，在某些场景下需要
    idCardNumberAsKey: {
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
        key: 'id',
        value: 'id',
        title: 'title'
      }
    }
  },
  computed: {
    computedValue() {
      return this.multiple ? (this.value ? this.value.split(',') : []) : this.value
    },
    treeData() {
      return treeMap(this.$store.state.ccp.structWithActiveMemberTreeData, item => {
        item.icon = item.type === 1 ? <i class="el-icon-folder" /> : <i class="el-icon-s-custom" />
        item.disabled = this.multiple
          ? (_.size(item.children) === 0 && item.type === 1) ||
            (_.every(item.children, i => i.disabled === true) && item.type === 1)
          : item.type === 1
        if (this.idCardNumberAsKey && item.type === 2) {
          item.id = item.identityCardNumber
        }
        return item
      })
    }
  },
  created() {
    this.$store.dispatch('ccp/getStructWithActiveMemberList')
  },
  mounted() {},
  methods: {
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
