<template>
  <div class="container">
    <CommonNotice
      model="财务"
      :hasAdd="hasAdd"
      :hasEdit="hasEdit"
      :hasCheck="hasCheck"
      :hasDelete="hasDelete"
      :hasSubmitCheck="hasSubmitCheck"
      :hasToTopSet="hasToTopSet"
      :hasCancelPublic="hasCancelPublic"
      add-router-name="FinanceNoticeAdd"
      edit-router-name="FinanceNoticeEdit"
      detail-router-name="FinanceNoticeDetail"
    ></CommonNotice>
  </div>
</template>

<script>
import CommonNotice from '@/views/epidemicControl/components/notice/CommonNotice'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'FinanceNotice',
  components: { CommonNotice },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('FinanceNoticeAdd'),
      hasEdit: this.$hasPower('FinanceNoticeEdit'),
      hasCheck: this.$hasPower('FinanceNoticeDetail'),
      hasDelete: this.$hasPower('FinanceNoticeDelete'),
      hasSubmitCheck: this.$hasPower('FinanceNoticeSubmitCheck'),
      hasToTopSet: this.$hasPower('FinanceNoticeSetTop'),
      hasCancelPublic: this.$hasPower('FinanceNoticeCancelPublic')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
