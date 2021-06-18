<template>
  <CommonNoticeDetail
    :hasEdit="hasEdit"
    :hasDelete="hasDelete"
    :hasSubmitCheck="hasSubmitCheck"
    :hasToTopSet="hasToTopSet"
    :hasCancelPublic="hasCancelPublic"
    :hasPreviewQRcode="hasPreviewQRcode"
    edit-router-name="EpidemicControlNoticeEdit"
  ></CommonNoticeDetail>
</template>

<script>
import CommonNoticeDetail from '@/views/epidemicControl/components/notice/CommonNoticeDetail'

export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'EpidemicControlNoticeDetail',
  components: { CommonNoticeDetail },
  data() {
    // 这里存放数据
    return {
      hasEdit: this.$hasPower('EpidemicControlNoticeEdit'),
      hasDelete: this.$hasPower('EpidemicControlNoticeDelete'),
      hasSubmitCheck: this.$hasPower('EpidemicControlNoticeSubmitCheck'),
      hasToTopSet: this.$hasPower('EpidemicControlNoticeSetTop'),
      hasCancelPublic: this.$hasPower('EpidemicControlNoticeCancelPublic'),
      hasPreviewQRcode: this.$hasPower('EpidemicControlNoticeQRcode')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
