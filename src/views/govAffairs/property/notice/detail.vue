<template>
  <CommonNoticeDetail
    :hasEdit="hasEdit"
    :hasDelete="hasDelete"
    :hasSubmitCheck="hasSubmitCheck"
    :hasToTopSet="hasToTopSet"
    :hasCancelPublic="hasCancelPublic"
    :hasPreviewQRcode="hasPreviewQRcode"
    edit-router-name="PropertyNoticeEdit"
  ></CommonNoticeDetail>
</template>

<script>
import CommonNoticeDetail from '@/views/epidemicControl/components/notice/CommonNoticeDetail'

export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'PropertyNoticeDetail',
  components: { CommonNoticeDetail },
  data() {
    // 这里存放数据
    return {
      hasEdit: this.$hasPower('PropertyNoticeEdit'),
      hasDelete: this.$hasPower('PropertyNoticeDelete'),
      hasSubmitCheck: this.$hasPower('PropertyNoticeSubmitCheck'),
      hasToTopSet: this.$hasPower('PropertyNoticeSetTop'),
      hasCancelPublic: this.$hasPower('PropertyNoticeCancelPublic'),
      hasPreviewQRcode: this.$hasPower('PropertyNoticeQRcode')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
