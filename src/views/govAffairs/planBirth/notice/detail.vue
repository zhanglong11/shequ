<template>
  <CommonNoticeDetail
    :hasEdit="hasEdit"
    :hasDelete="hasDelete"
    :hasSubmitCheck="hasSubmitCheck"
    :hasToTopSet="hasToTopSet"
    :hasCancelPublic="hasCancelPublic"
    :hasPreviewQRcode="hasPreviewQRcode"
    edit-router-name="PlanBirthNoticeEdit"
  ></CommonNoticeDetail>
</template>

<script>
import CommonNoticeDetail from '@/views/epidemicControl/components/notice/CommonNoticeDetail'

export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'PlanBirthNoticeDetail',
  components: { CommonNoticeDetail },
  data() {
    // 这里存放数据
    return {
      hasEdit: this.$hasPower('PlanBirthNoticeEdit'),
      hasDelete: this.$hasPower('PlanBirthNoticeDelete'),
      hasSubmitCheck: this.$hasPower('PlanBirthNoticeSubmitCheck'),
      hasToTopSet: this.$hasPower('PlanBirthNoticeSetTop'),
      hasCancelPublic: this.$hasPower('PlanBirthNoticeCancelPublic'),
      hasPreviewQRcode: this.$hasPower('PlanBirthNoticeQRcode')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
