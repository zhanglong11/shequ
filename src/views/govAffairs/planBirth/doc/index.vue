<template>
  <div class="container">
    <CommonDoc
      model="计生"
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
  name: 'PlanBirthDoc',
  components: { CommonDoc },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('PlanBirthDocAdd'),
      hasDownload: this.$hasPower('PlanBirthDocDownload'),
      hasDelete: this.$hasPower('PlanBirthDocDelete'),
      hasRename: this.$hasPower('PlanBirthDocRename'),
      hasMove: this.$hasPower('PlanBirthDocMove'),
      hasCopy: this.$hasPower('PlanBirthDocCopy'),
      hasMultipleDownload: this.$hasPower('PlanBirthDocMultipleDownload'),
      hasMultipleDelete: this.$hasPower('PlanBirthDocMultipleDelete'),
      hasMultipleMove: this.$hasPower('PlanBirthDocMultipleMove'),
      hasMultipleCopy: this.$hasPower('PlanBirthDocMultipleCopy')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
