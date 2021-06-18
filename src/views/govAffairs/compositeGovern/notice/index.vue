<template>
  <div class="container">
    <CommonNotice
      model="综合治理"
      :hasAdd="hasAdd"
      :hasEdit="hasEdit"
      :hasCheck="hasCheck"
      :hasDelete="hasDelete"
      :hasSubmitCheck="hasSubmitCheck"
      :hasToTopSet="hasToTopSet"
      :hasCancelPublic="hasCancelPublic"
      add-router-name="CompositeGovernNoticeAdd"
      edit-router-name="CompositeGovernNoticeEdit"
      detail-router-name="CompositeGovernNoticeDetail"
    ></CommonNotice>
  </div>
</template>

<script>
import CommonNotice from '@/views/epidemicControl/components/notice/CommonNotice'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'CompositeGovernNotice',
  components: { CommonNotice },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('CompositeGovernNoticeAdd'),
      hasEdit: this.$hasPower('CompositeGovernNoticeEdit'),
      hasCheck: this.$hasPower('CompositeGovernNoticeDetail'),
      hasDelete: this.$hasPower('CompositeGovernNoticeDelete'),
      hasSubmitCheck: this.$hasPower('CompositeGovernNoticeSubmitCheck'),
      hasToTopSet: this.$hasPower('CompositeGovernNoticeSetTop'),
      hasCancelPublic: this.$hasPower('CompositeGovernNoticeCancelPublic')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
