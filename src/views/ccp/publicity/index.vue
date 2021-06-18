<template>
  <div class="container">
    <CommonNotice
      model="智慧党建"
      noticeType="ccpNotificationType"
      :hasAdd="$hasPower('CcpPublicityCreate')"
      :hasEdit="$hasPower('CcpPublicityUpdate')"
      :hasSubmitCheck="$hasPower('CcpPublicityCheck')"
      :hasToTopSet="$hasPower('CcpPublicityToTop')"
      :hasCheck="$hasPower('CcpPublicityCheck')"
      :hasDelete="$hasPower('CcpPublicityRemove')"
      add-router-name="CcpPublicityCreate"
      edit-router-name="CcpPublicityEdit"
      detail-router-name="CcpPublicityDetail"
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
    return {}
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
