<template>
  <CommonNoticeAdd
    model="文化宣传"
    :hasSubmitCheck="hasSubmitCheck"
    :hasPreviewQRcode="hasPreviewQRcode"
  ></CommonNoticeAdd>
</template>

<script>
import CommonNoticeAdd from '@/views/epidemicControl/components/notice/CommonNoticeAdd'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'CulturePropagandaNoticeAdd',
  components: { CommonNoticeAdd },
  data() {
    // 这里存放数据
    return {
      hasSubmitCheck: this.$hasPower('CulturePropagandaNoticeSubmitCheck'),
      hasPreviewQRcode: this.$hasPower('CulturePropagandaNoticeQRcode')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
