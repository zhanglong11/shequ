<template>
  <div class="container">
    <CommonDoc
      model="文化宣传"
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
  name: 'CulturePropagandaDoc',
  components: { CommonDoc },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('CulturePropagandaDocAdd'),
      hasDownload: this.$hasPower('CulturePropagandaDocDownload'),
      hasDelete: this.$hasPower('CulturePropagandaDocDelete'),
      hasRename: this.$hasPower('CulturePropagandaDocRename'),
      hasMove: this.$hasPower('CulturePropagandaDocMove'),
      hasCopy: this.$hasPower('CulturePropagandaDocCopy'),
      hasMultipleDownload: this.$hasPower('CulturePropagandaDocMultipleDownload'),
      hasMultipleDelete: this.$hasPower('CulturePropagandaDocMultipleDelete'),
      hasMultipleMove: this.$hasPower('CulturePropagandaDocMultipleMove'),
      hasMultipleCopy: this.$hasPower('CulturePropagandaDocMultipleCopy')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
