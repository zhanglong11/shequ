<template>
  <el-select :value="valueSplit" placeholder="请选择" multiple filterable @change="handleChange">
    <el-option v-for="item in list" :key="item.id" :label="item.label" :value="item.value" />
  </el-select>
</template>
<script>
export default {
  name: 'SelectUser',
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      list: []
    }
  },
  computed: {
    valueSplit() {
      return this.value ? this.value.split(',') : null
    }
  },
  created() {
    const params = {
      page: 1,
      rows: 200
    }
    this.axios.system.post('/cim6d/system/user/list', params).then(res => {
      const datas = res.data
      const list = datas.records || []
      list.forEach(e => {
        e.label = e.realName
        e.value = e.id
      })
      this.list = list
    })
  },
  methods: {
    handleChange(val) {
      this.$emit('input', val.join(','))
      const nameList = [...this.list].filter(item => val.includes(item.value)).map(item => item.label)
      this.$emit('update:principalName', nameList.join(','))
    }
  }
}
</script>
