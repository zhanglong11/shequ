<template>
  <el-input
    ref="input"
    :value="_.isNaN(value) ? '' : value"
    :disabled="disabled"
    @input="handleInput"
    @change="handleChange"
  >
    <template v-if="unit" slot="append">
      {{ unit }}
    </template></el-input
  >
</template>

<script>
export default {
  name: 'InputNumber',
  props: {
    value: [String, Number],
    controls: {
      type: Boolean,
      default: false
    },
    unit: String,
    disabled: {
      type: Boolean,
      default: false
    },
    min: { type: Number, default: null },
    max: { type: Number, default: null },
    precision: { type: Number, default: null }
  },
  methods: {
    handleInput(val) {
      val = val.toString().replace(/[^[\-\d].]/g, '')
      const splits = val.split('.')
      if (splits.length > 2) {
        val = splits[0] + '.' + splits.slice(1).join('')
      }
      this.$emit('input', val)
    },
    handleChange(val) {
      val = parseFloat(val)
      if (_.isNumber(val) && !_.isNaN(val)) {
        if (_.isNumber(this.precision)) {
          val = val.toFixed(this.precision)
        }
        if (_.isNumber(this.min)) {
          if (val < this.min) {
            val = this.min
          }
        }
        if (_.isNumber(this.max)) {
          if (val > this.max) {
            val = this.max
          }
        }
        this.$emit('input', val)
      } else {
        this.$emit('input', null)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
