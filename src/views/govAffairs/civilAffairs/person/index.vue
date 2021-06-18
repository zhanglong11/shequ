<template>
  <div class="container">
    <CommonPerson
      model="民政"
      :hasAdd="hasAdd"
      :hasEdit="hasEdit"
      :hasCheck="hasCheck"
      :hasDelete="hasDelete"
      add-router-name="CivilAffairsPersonAdd"
      edit-router-name="CivilAffairsPersonEdit"
      detail-router-name="CivilAffairsPersonDetail"
    >
    </CommonPerson>
  </div>
</template>

<script>
import CommonPerson from '@/views/epidemicControl/components/person/CommonPerson'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'CivilAffairsPerson',
  components: { CommonPerson },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('CivilAffairsPersonAdd'),
      hasEdit: this.$hasPower('CivilAffairsPersonEdit'),
      hasCheck: this.$hasPower('CivilAffairsPersonDetail'),
      hasDelete: this.$hasPower('CivilAffairsPersonDelete')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
