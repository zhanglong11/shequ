<template>
  <div class="container">
    <CommonPerson
      model="计生"
      :hasAdd="hasAdd"
      :hasEdit="hasEdit"
      :hasCheck="hasCheck"
      :hasDelete="hasDelete"
      add-router-name="PlanBirthPersonAdd"
      edit-router-name="PlanBirthPersonEdit"
      detail-router-name="PlanBirthPersonDetail"
    >
    </CommonPerson>
  </div>
</template>

<script>
import CommonPerson from '@/views/epidemicControl/components/person/CommonPerson'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'PlanBirthPerson',
  components: { CommonPerson },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('PlanBirthPersonAdd'),
      hasEdit: this.$hasPower('PlanBirthPersonEdit'),
      hasCheck: this.$hasPower('PlanBirthPersonDetail'),
      hasDelete: this.$hasPower('PlanBirthPersonDelete')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
