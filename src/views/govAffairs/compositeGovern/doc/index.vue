<template>
  <div class="container">
    <CommonDoc
      model="综合治理"
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
  name: 'CompositeGovernDoc',
  components: { CommonDoc },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('CompositeGovernDocAdd'),
      hasDownload: this.$hasPower('CompositeGovernDocDownload'),
      hasDelete: this.$hasPower('CompositeGovernDocDelete'),
      hasRename: this.$hasPower('CompositeGovernDocRename'),
      hasMove: this.$hasPower('CompositeGovernDocMove'),
      hasCopy: this.$hasPower('CompositeGovernDocCopy'),
      hasMultipleDownload: this.$hasPower('CompositeGovernDocMultipleDownload'),
      hasMultipleDelete: this.$hasPower('CompositeGovernDocMultipleDelete'),
      hasMultipleMove: this.$hasPower('CompositeGovernDocMultipleMove'),
      hasMultipleCopy: this.$hasPower('CompositeGovernDocMultipleCopy')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
