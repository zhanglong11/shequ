<template>
  <el-date-picker
    v-model="value"
    v-bind="$attrs"
    :type="type"
    :format="format"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    @change="handleChange"
  ></el-date-picker>
</template>

<script>
export default {
  name: 'SelectDateRange',
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props: {
    startTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd HH:mm'
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd HH:mm'
    },
    type: {
      type: String,
      default: 'datetimerange'
    }
  },
  data() {
    return {
      value: []
    }
  },
  watch: {
    startTime(val) {
      if (val !== this.value[0]) {
        this.value = [this.startTime, this.endTime]
      }
    },
    endTime(val) {
      if (val !== this.value[1]) {
        this.value = [this.startTime, this.endTime]
      }
    }
  },
  created() {
    if (this.startTime && this.endTime) {
      let formatStr = this.format
      if (this.format.indexOf(' ') !== -1) {
        const [before, after] = this.format.split(' ')
        formatStr = before.toUpperCase() + ' ' + after
      } else {
        formatStr = formatStr.toUpperCase()
      }
      this.value = [dayjs(this.startTime).format(formatStr), dayjs(this.endTime).format(formatStr)]
    }
  },
  methods: {
    handleChange([startTime, endTime]) {
      let formatStr = this.format
      if (this.format.indexOf(' ') !== -1) {
        const [before, after] = this.format.split(' ')
        formatStr = before.toUpperCase() + ' ' + after
      } else {
        formatStr = formatStr.toUpperCase()
      }
      this.$emit('update:startTime', dayjs(startTime).format(formatStr))
      this.$emit('update:endTime', dayjs(endTime).format(formatStr))
      if (this.elFormItem?.validate) {
        this.$nextTick().then(() => {
          this.elFormItem.validate()
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.el-date-editor {
  width: 100%;
}
</style>
