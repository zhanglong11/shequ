<template>
  <div class="container">
    <CommonDoc
      model="疫情防控"
      :hasAdd="hasAdd"
      :hasDelete="hasDelete"
      :hasDownload="hasDownload"
      :hasRename="hasRename"
      :hasMove="hasMove"
      :hasCopy="hasCopy"
      :hasMultipleDownload="hasMultipleDownload"
      :hasMultipleDelete="hasMultipleDelete"
      :hasMultipleMove="hasMultipleMove"
      :hasMultipleCopy="hasMultipleCopy"
    ></CommonDoc>
  </div>
</template>

<script>
import CommonDoc from '@/views/epidemicControl/components/doc/CommonDoc'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'EpidemicControlDoc',
  components: { CommonDoc },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('EpidemicControlDocAdd'),
      hasDownload: this.$hasPower('EpidemicControlDocDownload'),
      hasDelete: this.$hasPower('EpidemicControlDocDelete'),
      hasRename: this.$hasPower('EpidemicControlDocRename'),
      hasMove: this.$hasPower('EpidemicControlDocMove'),
      hasCopy: this.$hasPower('EpidemicControlDocCopy'),
      hasMultipleDownload: this.$hasPower('EpidemicControlDocMultipleDownload'),
      hasMultipleDelete: this.$hasPower('EpidemicControlDocMultipleDelete'),
      hasMultipleMove: this.$hasPower('EpidemicControlDocMultipleMove'),
      hasMultipleCopy: this.$hasPower('EpidemicControlDocMultipleCopy')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
