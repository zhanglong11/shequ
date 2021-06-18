<template>
  <div class="container">
    <CommonNotice
      model="民政"
      :hasAdd="hasAdd"
      :hasEdit="hasEdit"
      :hasCheck="hasCheck"
      :hasDelete="hasDelete"
      :hasSubmitCheck="hasSubmitCheck"
      :hasToTopSet="hasToTopSet"
      :hasCancelPublic="hasCancelPublic"
      add-router-name="CivilAffairsNoticeAdd"
      edit-router-name="CivilAffairsNoticeEdit"
      detail-router-name="CivilAffairsNoticeDetail"
    ></CommonNotice>
  </div>
</template>

<script>
import CommonNotice from '@/views/epidemicControl/components/notice/CommonNotice'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'CivilAffairsNotice',
  components: { CommonNotice },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('CivilAffairsNoticeAdd'),
      hasEdit: this.$hasPower('CivilAffairsNoticeEdit'),
      hasCheck: this.$hasPower('CivilAffairsNoticeDetail'),
      hasDelete: this.$hasPower('CivilAffairsNoticeDelete'),
      hasSubmitCheck: this.$hasPower('CivilAffairsNoticeSubmitCheck'),
      hasToTopSet: this.$hasPower('CivilAffairsNoticeSetTop'),
      hasCancelPublic: this.$hasPower('CivilAffairsNoticeCancelPublic')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
