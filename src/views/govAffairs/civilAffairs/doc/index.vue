<template>
  <div class="container">
    <CommonDoc
      model="民政"
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
  name: 'CivilAffairsDoc',
  components: { CommonDoc },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('CivilAffairsDocAdd'),
      hasDownload: this.$hasPower('CivilAffairsDocDownload'),
      hasDelete: this.$hasPower('CivilAffairsDocDelete'),
      hasRename: this.$hasPower('CivilAffairsDocRename'),
      hasMove: this.$hasPower('CivilAffairsDocMove'),
      hasCopy: this.$hasPower('CivilAffairsDocCopy'),
      hasMultipleDownload: this.$hasPower('CivilAffairsDocMultipleDownload'),
      hasMultipleDelete: this.$hasPower('CivilAffairsDocMultipleDelete'),
      hasMultipleMove: this.$hasPower('CivilAffairsDocMultipleMove'),
      hasMultipleCopy: this.$hasPower('CivilAffairsDocMultipleCopy')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
