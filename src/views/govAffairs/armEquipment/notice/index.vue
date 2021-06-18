<template>
  <div class="container">
    <CommonNotice
      model="武装部"
      :hasAdd="hasAdd"
      :hasEdit="hasEdit"
      :hasCheck="hasCheck"
      :hasDelete="hasDelete"
      :hasSubmitCheck="hasSubmitCheck"
      :hasToTopSet="hasToTopSet"
      :hasCancelPublic="hasCancelPublic"
      add-router-name="ArmEquipmentNoticeAdd"
      edit-router-name="ArmEquipmentNoticeEdit"
      detail-router-name="ArmEquipmentNoticeDetail"
    ></CommonNotice>
  </div>
</template>

<script>
import CommonNotice from '@/views/epidemicControl/components/notice/CommonNotice'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'ArmEquipmentNotice',
  components: { CommonNotice },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('ArmEquipmentNoticeAdd'),
      hasEdit: this.$hasPower('ArmEquipmentNoticeEdit'),
      hasCheck: this.$hasPower('ArmEquipmentNoticeDetail'),
      hasDelete: this.$hasPower('ArmEquipmentNoticeDelete'),
      hasSubmitCheck: this.$hasPower('ArmEquipmentNoticeSubmitCheck'),
      hasToTopSet: this.$hasPower('ArmEquipmentNoticeSetTop'),
      hasCancelPublic: this.$hasPower('ArmEquipmentNoticeCancelPublic')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
