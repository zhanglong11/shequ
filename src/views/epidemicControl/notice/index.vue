<template>
  <div class="container">
    <CommonNotice
      model="疫情防控"
      :hasAdd="hasAdd"
      :hasEdit="hasEdit"
      :hasCheck="hasCheck"
      :hasDelete="hasDelete"
      :hasSubmitCheck="hasSubmitCheck"
      :hasToTopSet="hasToTopSet"
      :hasCancelPublic="hasCancelPublic"
      add-router-name="EpidemicControlNoticeAdd"
      edit-router-name="EpidemicControlNoticeEdit"
      detail-router-name="EpidemicControlNoticeDetail"
    ></CommonNotice>
  </div>
</template>

<script>
import CommonNotice from '@/views/epidemicControl/components/notice/CommonNotice'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'EpidemicControlNotice',
  components: { CommonNotice },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('EpidemicControlNoticeAdd'),
      hasEdit: this.$hasPower('EpidemicControlNoticeEdit'),
      hasCheck: this.$hasPower('EpidemicControlNoticeDetail'),
      hasDelete: this.$hasPower('EpidemicControlNoticeDelete'),
      hasSubmitCheck: this.$hasPower('EpidemicControlNoticeSubmitCheck'),
      hasToTopSet: this.$hasPower('EpidemicControlNoticeSetTop'),
      hasCancelPublic: this.$hasPower('EpidemicControlNoticeCancelPublic')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
