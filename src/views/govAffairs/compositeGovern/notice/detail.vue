<template>
  <CommonNoticeDetail
    :hasEdit="hasEdit"
    :hasDelete="hasDelete"
    :hasSubmitCheck="hasSubmitCheck"
    :hasToTopSet="hasToTopSet"
    :hasCancelPublic="hasCancelPublic"
    :hasPreviewQRcode="hasPreviewQRcode"
    edit-router-name="CompositeGovernNoticeEdit"
  ></CommonNoticeDetail>
</template>

<script>
import CommonNoticeDetail from '@/views/epidemicControl/components/notice/CommonNoticeDetail'

export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'CompositeGovernNoticeDetail',
  components: { CommonNoticeDetail },
  data() {
    // 这里存放数据
    return {
      hasEdit: this.$hasPower('CompositeGovernNoticeEdit'),
      hasDelete: this.$hasPower('CompositeGovernNoticeDelete'),
      hasSubmitCheck: this.$hasPower('CompositeGovernNoticeSubmitCheck'),
      hasToTopSet: this.$hasPower('CompositeGovernNoticeSetTop'),
      hasCancelPublic: this.$hasPower('CompositeGovernNoticeCancelPublic'),
      hasPreviewQRcode: this.$hasPower('CompositeGovernNoticeQRcode')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
