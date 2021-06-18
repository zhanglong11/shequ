<template>
  <div class="container">
    <CommonDoc
      model="武装部"
      hasAdd="hasAdd"
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
  name: 'ArmEquipmentDoc',
  components: { CommonDoc },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('ArmEquipmentDocAdd'),
      hasDownload: this.$hasPower('ArmEquipmentDocDownload'),
      hasDelete: this.$hasPower('ArmEquipmentDocDelete'),
      hasRename: this.$hasPower('ArmEquipmentDocRename'),
      hasMove: this.$hasPower('ArmEquipmentDocMove'),
      hasCopy: this.$hasPower('ArmEquipmentDocCopy'),
      hasMultipleDownload: this.$hasPower('ArmEquipmentDocMultipleDownload'),
      hasMultipleDelete: this.$hasPower('ArmEquipmentDocMultipleDelete'),
      hasMultipleMove: this.$hasPower('ArmEquipmentDocMultipleMove'),
      hasMultipleCopy: this.$hasPower('ArmEquipmentDocMultipleCopy')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
