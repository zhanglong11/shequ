<template>
  <div class="container">
    <CommonNotice
      model="文化宣传"
      :hasAdd="hasAdd"
      :hasEdit="hasEdit"
      :hasCheck="hasCheck"
      :hasDelete="hasDelete"
      :hasSubmitCheck="hasSubmitCheck"
      :hasToTopSet="hasToTopSet"
      :hasCancelPublic="hasCancelPublic"
      add-router-name="CulturePropagandaNoticeAdd"
      edit-router-name="CulturePropagandaNoticeEdit"
      detail-router-name="CulturePropagandaNoticeDetail"
    ></CommonNotice>
  </div>
</template>

<script>
import CommonNotice from '@/views/epidemicControl/components/notice/CommonNotice'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'CulturePropagandaNotice',
  components: { CommonNotice },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('CulturePropagandaNoticeAdd'),
      hasEdit: this.$hasPower('CulturePropagandaNoticeEdit'),
      hasCheck: this.$hasPower('CulturePropagandaNoticeDetail'),
      hasDelete: this.$hasPower('CulturePropagandaNoticeDelete'),
      hasSubmitCheck: this.$hasPower('CulturePropagandaNoticeSubmitCheck'),
      hasToTopSet: this.$hasPower('CulturePropagandaNoticeSetTop'),
      hasCancelPublic: this.$hasPower('CulturePropagandaNoticeCancelPublic')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
