<template>
  <el-select :value="value" placeholder="请输入员工姓名" filterable @change="handleChange">
    <el-option v-for="item in list" :key="item.id" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script>
import { getUserList } from '@/api/system/user'
export default {
  name: 'SelectUser',
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    disabledKeys: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.queryList()
  },
  methods: {
    // 查询用户列表
    async queryList() {
      const result = await getUserList({})
      let datas = result.data.records || []
      datas.forEach(e => {
        e.label = e.realName + ' ' + e.mobile
        e.value = e.id
      })
      if (_.size(this.disabledKeys)) {
        datas = datas.filter(e => !this.disabledKeys.includes(e.value))
      }
      this.list = datas
    },
    handleChange(value) {
      this.$emit('input', value)
      const target = _.find(this.list, { value })
      this.$emit('update:mobile', target.mobile)
    }
  }
}
</script>
