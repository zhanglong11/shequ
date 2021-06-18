<template>
  <div class="container">
    <CommonDoc
      model="物业"
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
  name: 'PropertyDoc',
  components: { CommonDoc },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('PropertyDocAdd'),
      hasDownload: this.$hasPower('PropertyDocDownload'),
      hasDelete: this.$hasPower('PropertyDocDelete'),
      hasRename: this.$hasPower('PropertyDocRename'),
      hasMove: this.$hasPower('PropertyDocMove'),
      hasCopy: this.$hasPower('PropertyDocCopy'),
      hasMultipleDownload: this.$hasPower('PropertyDocMultipleDownload'),
      hasMultipleDelete: this.$hasPower('PropertyDocMultipleDelete'),
      hasMultipleMove: this.$hasPower('PropertyDocMultipleMove'),
      hasMultipleCopy: this.$hasPower('PropertyDocMultipleCopy')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
