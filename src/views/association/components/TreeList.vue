<template>
  <TreeSelect
    treeIcon
    :replace-fields="replaceFields"
    style="width: 100%"
    show-search
    allow-clear
    treeNodeFilterProp="title"
    placeholder="请选择"
    :multiple="multiple"
    :treeCheckable="multiple"
    v-bind="$attrs"
    :treeData="localList"
    :value="computedValue"
    @change="handleChange"
  >
  </TreeSelect>
</template>

<script>
import { TreeSelect } from 'ant-design-vue'
import treeForEach from '@/utils/treeForEach'
import Api from '../api'
export default {
  name: 'TreeList',
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
    treeCheckable: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: null
    },
    types: {
      type: Number
    },
    // 是否使用身份证号作为key和value，在某些场景下需要
    idCardNumberAsKey: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localList: [],
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
    }
  },
  created() {
    Api.getOPrganizationList({ type: this.types, companyId: this.$store.state.user.companyId }).then(res => {
      this.localList = res.data
      treeForEach(this.localList, item => {
        if (!item) return
        item.label = item.name
        item.icon = item.children ? <i class="el-icon-folder" /> : <i class="el-icon-s-custom" />
        item.disabled = item.children ? _.size(item.children) === 0 : item.id === null
        // item.disabled = item.children && _.size(item.children) === 0
        if (item.children && item.children.length) {
          item.children.map(e => {
            return (e.id = e.identityCardNumber)
          })
        } else {
          item.children = []
        }
        return item
      })
    })
  },
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
.vue-treeselect {
  line-height: 18px;
}
</style>
