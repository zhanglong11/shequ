<template>
  <div class="container">
    <CommonDoc
      model="财务"
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
  name: 'FinanceDoc',
  components: { CommonDoc },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('FinanceDocAdd'),
      hasDownload: this.$hasPower('FinanceDocDownload'),
      hasDelete: this.$hasPower('FinanceDocDelete'),
      hasRename: this.$hasPower('FinanceDocRename'),
      hasMove: this.$hasPower('FinanceDocMove'),
      hasCopy: this.$hasPower('FinanceDocCopy'),
      hasMultipleDownload: this.$hasPower('FinanceDocMultipleDownload'),
      hasMultipleDelete: this.$hasPower('FinanceDocMultipleDelete'),
      hasMultipleMove: this.$hasPower('FinanceDocMultipleMove'),
      hasMultipleCopy: this.$hasPower('FinanceDocMultipleCopy')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
