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
    },
    departmentId: {
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
    /* this.axios.system.get(`/cim6d/system/user/department/getUserList/${this.departmentId}`).then(res => {
      res.data.forEach(e => {
        e.label = e.realName
        e.value = e.id
      })
      this.list = res.data
    })
  }, */
    this.axios.system.post(`/cim6d/system/user/list`, {}).then(res => {
      console.log(res.data.records)
      res.data.records.forEach(e => {
        e.label = e.realName
        e.value = e.id
      })
      this.list = res.data.records
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
