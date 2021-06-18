<template>
  <div class="container">
    <CommonPerson
      model="武装部"
      :hasAdd="hasAdd"
      :hasEdit="hasEdit"
      :hasCheck="hasCheck"
      :hasDelete="hasDelete"
      add-router-name="ArmEquipmentPersonAdd"
      edit-router-name="ArmEquipmentPersonEdit"
      detail-router-name="ArmEquipmentPersonDetail"
    >
    </CommonPerson>
  </div>
</template>

<script>
import CommonPerson from '@/views/epidemicControl/components/person/CommonPerson'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'ArmEquipmentPerson',
  components: { CommonPerson },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('ArmEquipmentPersonAdd'),
      hasEdit: this.$hasPower('ArmEquipmentPersonEdit'),
      hasCheck: this.$hasPower('ArmEquipmentPersonDetail'),
      hasDelete: this.$hasPower('ArmEquipmentPersonDelete')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
