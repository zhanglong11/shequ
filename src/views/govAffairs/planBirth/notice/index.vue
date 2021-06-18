<template>
  <div class="container">
    <CommonNotice
      model="计生"
      :hasAdd="hasAdd"
      :hasEdit="hasEdit"
      :hasCheck="hasCheck"
      :hasDelete="hasDelete"
      :hasSubmitCheck="hasSubmitCheck"
      :hasToTopSet="hasToTopSet"
      :hasCancelPublic="hasCancelPublic"
      add-router-name="PlanBirthNoticeAdd"
      edit-router-name="PlanBirthNoticeEdit"
      detail-router-name="PlanBirthNoticeDetail"
    ></CommonNotice>
  </div>
</template>

<script>
import CommonNotice from '@/views/epidemicControl/components/notice/CommonNotice'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'PlanBirthNotice',
  components: { CommonNotice },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('PlanBirthNoticeAdd'),
      hasEdit: this.$hasPower('PlanBirthNoticeEdit'),
      hasCheck: this.$hasPower('PlanBirthNoticeDetail'),
      hasDelete: this.$hasPower('PlanBirthNoticeDelete'),
      hasSubmitCheck: this.$hasPower('PlanBirthNoticeSubmitCheck'),
      hasToTopSet: this.$hasPower('PlanBirthNoticeSetTop'),
      hasCancelPublic: this.$hasPower('PlanBirthNoticeCancelPublic')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
