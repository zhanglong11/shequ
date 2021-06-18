<template>
  <el-input v-model="number">
    <el-select slot="prepend" v-model="province" style="width: 75px" placeholder="省份">
      <el-option v-for="item in provinceList" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </el-input>
</template>

<script>
export default {
  name: 'InputLicensePlate',
  components: {},
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      provinceList: '京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领'
        .split('')
        .map(text => ({ label: text, value: text })),
      province: '',
      number: ''
    }
  },
  watch: {
    province() {
      this.$emit('input', _.toUpper(this.province + this.number))
    },
    number() {
      this.$emit('input', _.toUpper(this.province + this.number))
    },
    value() {
      if (this.value && this.value !== this.province + this.number) {
        if (_.find(this.provinceList, { value: _.first(this.province) })) {
          this.province = this.value.slice(0, 1)
          this.number = this.value.slice(1)
        } else {
          this.number = this.value
        }
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    refresh() {}
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
