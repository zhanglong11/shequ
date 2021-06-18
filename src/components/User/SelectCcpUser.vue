<template>
  <TreeSelect
    treeIcon
    :replace-fields="replaceFields"
    style="width: 100%"
    show-search
    allow-clear
    :treeCheckable="multiple"
    treeNodeFilterProp="title"
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
export default {
  name: 'SelectCcpUser',
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
    },
    // 是否可以选择积极分子
    withActiveMember: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      replaceFields: {
        key: 'id',
        value: 'id'
      }
    }
  },
  computed: {
    computedValue() {
      return this.multiple ? (this.value ? this.value.split(',') : []) : this.value
    },
    treeData() {
      let treeData
      if (!this.withActiveMember) {
        treeData = this.$store.state.ccp.structWithUserTreeData
      } else {
        treeData = [
          {
            title: '党员',
            type: 1,
            id: 'ccpMember',
            children: treeMap(this.$store.state.ccp.structWithUserTreeData, item => {
              // 避免树的key重复
              delete item.pid
              if (item.type === 1) {
                item.id = 'ccpMember-' + item.id
              }
              return item
            })
          },
          {
            title: '积极分子',
            type: 1,
            id: 'ccpActiveMember',
            children: this.$store.state.ccp.structWithActiveMemberTreeData.map(item => {
              delete item.pid
              return item
            })
          }
        ]
      }
      return treeMap(treeData, item => {
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
    this.$store.dispatch('ccp/getStructWithUserTreeData')
    if (this.withActiveMember) this.$store.dispatch('ccp/getStructWithActiveMemberList')
    console.log(this.$store.state.ccp.structWithUserTreeData)
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
