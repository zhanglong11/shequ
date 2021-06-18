<template>
  <el-select v-if="!radio" filterable v-bind="$attrs" v-on="$listeners" @change="handleChange">
    <el-option v-if="hasAll" label="全部" :value="null"></el-option>
    <el-option
      v-for="item in argGroup ? argGroupOptions : options"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    ></el-option>
  </el-select>
  <el-radio-group v-else v-bind="$attrs" v-on="$listeners" @change="handleChange">
    <el-radio v-for="item in argGroup ? argGroupOptions : options" :key="item.value" :label="item.value">
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>

<script>
import { getGroupArgByArgGroup } from '@/api/system/args'
export default {
  name: 'Select',
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    },
    argGroup: {
      type: String,
      default: null
    },
    hasAll: {
      type: Boolean,
      default: false
    },
    // 是否以radio的样式显示,与hasAll = true 冲突
    radio: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      argGroupOptions: []
    }
  },
  watch: {
    argGroup: function (newVal) {
      // 根据参数改变实时请求接口
      if (newVal) this.refresh()
    }
  },
  created() {
    if (this.argGroup) this.refresh()
  },
  methods: {
    refresh() {
      getGroupArgByArgGroup(this.argGroup).then(res => {
        this.argGroupOptions = res.data.map(({ argCode: value, argText: label }) => ({ label, value }))
        if (this.argGroup === 'ccpActiveMemberStatus') {
          const arr = ['普通居民', '申请入党', '积极分子', '发展对象', '预备党员']
          this.argGroupOptions = this.argGroupOptions.sort((a, b) => {
            return arr.indexOf(a.label) - arr.indexOf(b.label)
          })
        }
      })
    },
    handleChange(value) {
      this.$emit(
        'update:label',
        _.find(this.options, { value })?.label || _.find(this.argGroupOptions, { value })?.label
      )
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.el-select {
  width: 100%;
}
</style>
