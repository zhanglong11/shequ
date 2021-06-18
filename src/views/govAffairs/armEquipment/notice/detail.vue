<template>
  <CommonNoticeDetail
    :hasEdit="hasEdit"
    :hasDelete="hasDelete"
    :hasSubmitCheck="hasSubmitCheck"
    :hasToTopSet="hasToTopSet"
    :hasCancelPublic="hasCancelPublic"
    :hasPreviewQRcode="hasPreviewQRcode"
    edit-router-name="ArmEquipmentNoticeEdit"
  ></CommonNoticeDetail>
</template>

<script>
import CommonNoticeDetail from '@/views/epidemicControl/components/notice/CommonNoticeDetail'

export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'ArmEquipmentNoticeDetail',
  components: { CommonNoticeDetail },
  data() {
    // 这里存放数据
    return {
      hasEdit: this.$hasPower('ArmEquipmentNoticeEdit'),
      hasDelete: this.$hasPower('ArmEquipmentNoticeDelete'),
      hasSubmitCheck: this.$hasPower('ArmEquipmentNoticeSubmitCheck'),
      hasToTopSet: this.$hasPower('ArmEquipmentNoticeSetTop'),
      hasCancelPublic: this.$hasPower('ArmEquipmentNoticeCancelPublic'),
      hasPreviewQRcode: this.$hasPower('ArmEquipmentNoticeQRcode')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
