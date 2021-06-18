<template>
  <div class="container">
    <CommonNotice
      model="物业"
      :hasAdd="hasAdd"
      :hasEdit="hasEdit"
      :hasCheck="hasCheck"
      :hasDelete="hasDelete"
      :hasSubmitCheck="hasSubmitCheck"
      :hasToTopSet="hasToTopSet"
      :hasCancelPublic="hasCancelPublic"
      add-router-name="PropertyNoticeAdd"
      edit-router-name="PropertyNoticeEdit"
      detail-router-name="PropertyNoticeDetail"
    ></CommonNotice>
  </div>
</template>

<script>
import CommonNotice from '@/views/epidemicControl/components/notice/CommonNotice'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'PropertyNotice',
  components: { CommonNotice },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('PropertyNoticeAdd'),
      hasEdit: this.$hasPower('PropertyNoticeEdit'),
      hasCheck: this.$hasPower('PropertyNoticeDetail'),
      hasDelete: this.$hasPower('PropertyNoticeDelete'),
      hasSubmitCheck: this.$hasPower('PropertyNoticeSubmitCheck'),
      hasToTopSet: this.$hasPower('PropertyNoticeSetTop'),
      hasCancelPublic: this.$hasPower('PropertyNoticeCancelPublic')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
