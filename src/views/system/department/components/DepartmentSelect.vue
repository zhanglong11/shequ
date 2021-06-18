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
    :max-height="200"
    :disabled="disabled || (elForm || {}).disabled"
    @input="val => $emit('input', val || 0)"
  />
</template>

<script>
import treeForEach from '@/utils/treeForEach'
import treeFilter from '@/utils/treeFilter'
import Api from '@/api/system/department'
export default {
  name: 'DepartmentSelect',
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
    disabledId: {
      type: String
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
    },
    deps: {
      type: Array,
      default() {
        return []
      }
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
      console.log(data)
      console.log(this.disabledId)
      treeForEach(data, e => {
        e.label = e.name
        e.isDisabled = e.parentId === this.disabledId || e.id === this.disabledId

        if (this.disableKeys.includes(e.id)) {
          delete e.children
        }
      })

      return treeFilter(data, e => !this.disableKeys.includes(e.id))
    }
  },
  created() {
    Api.getDepartment(this.deps).then(res => {
      this.localList = res.data
    })
  },
  methods: {}
}
</script>
<style>
.vue-treeselect {
  line-height: 18px;
}
</style>
