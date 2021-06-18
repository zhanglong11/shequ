<template>
  <TreeSelect
    :value="value || null"
    :options="computedList"
    label="name"
    searchable
    loading-text="加载中..."
    no-options-text="没有选项..."
    no-results-text="没有匹配的选项..."
    placeholder="请选择"
    :always-open="alwaysOpen"
    :append-to-body="appendToBody"
    :multiple="multiple"
    flat
    style="width: 200px"
    :disabled="disabled || (elForm || {}).disabled"
    @input="val => $emit('input', val || 0)"
  />
</template>

<script>
import treeForEach from '@/utils/treeForEach'
import treeFilter from '@/utils/treeFilter'
import Api from '@/api/system/department'
export default {
  name: 'RoleSelect',
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props: {
    value: {
      type: [Array, String, Number],
      default: null
    },
    disableKeys: {
      type: Array,
      default() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    alwaysOpen: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    valueKey: {
      type: String,
      default: 'id' //  pid 使用 id， 其它分类使用argCode
    },
    list: {
      type: Array,
      default: null
    },
    allowRoot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localList: []
    }
  },
  computed: {
    computedList() {
      const data = this.list || this.localList
      treeForEach(data, e => {
        e.label = e.name
        if (this.disableKeys.includes(e.id)) {
          delete e.children
        }
      })
      return treeFilter(data, e => !this.disableKeys.includes(e.id))
    }
  },
  created() {
    Api.getRoleTree({}).then(res => {
      // this.localList = res.data
      this.localList = treeForEach(res.data, e => {
        if (!e.categoryId) {
          e.isDisabled = true
        }
      })
    })
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.vue-treeselect {
  line-height: 18px;
}
.vue-treeselect {
  /deep/ .vue-treeselect__checkbox--disabled {
    width: 0;
    height: 0;
  }
}
/deep/ .vue-treeselect__option--disabled {
  &:hover {
    color: red;
  }
  .vue-treeselect__checkbox-container {
    width: 0;
    height: 0;
    .vue-treeselect__checkbox--disabled {
      display: none;
    }
  }
  .vue-treeselect__label {
    color: #606266;
  }
}
</style>
