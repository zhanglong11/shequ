<template>
  <CommonNoticeAdd
    noticeType="ccpNotificationType"
    model="智慧党建"
    :hasSubmitCheck="$hasPower('CcpPublicitySubmitCheck')"
    :hasPreviewQRcode="$hasPower('CcpPublicityQRcode')"
  ></CommonNoticeAdd>
</template>

<script>
import CommonNoticeAdd from '@/views/epidemicControl/components/notice/CommonNoticeAdd'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'CivilAffairsNoticeAdd',
  components: { CommonNoticeAdd },
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
