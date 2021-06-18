<template>
  <el-date-picker
    v-model="value"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    type="daterange"
    style="width: 280px"
    :clearable="clearable"
    @input="change"
  />
</template>

<script>
export default {
  name: 'DateRange',
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props: {
    startPlaceholder: {
      default: '开始日期'
    },
    endPlaceholder: {
      default: '结束日期'
    },
    startTime: {
      default: null
    },
    endTime: {
      default: null
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: null
    }
  },
  watch: {
    startTime(val) {
      if (!val) this.value = null
    }
  },
  methods: {
    change(val) {
      this.$emit('update:startTime', val ? dayjs(val[0]).format('YYYY-MM-DD 00:00:00') : null)
      this.$emit('update:endTime', val ? dayjs(val[1]).format('YYYY-MM-DD 23:59:59') : null)
    }
  }
}
</script>

<style scoped></style>
