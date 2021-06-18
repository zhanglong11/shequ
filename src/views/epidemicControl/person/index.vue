<template>
  <div class="container">
    <CommonPerson
      model="疫情防控"
      :hasAdd="hasAdd"
      :hasEdit="hasEdit"
      :hasCheck="hasCheck"
      :hasDelete="hasDelete"
      add-router-name="EpidemicControlPersonAdd"
      edit-router-name="EpidemicControlPersonEdit"
      detail-router-name="EpidemicControlPersonDetail"
    >
    </CommonPerson>
  </div>
</template>

<script>
import CommonPerson from '@/views/epidemicControl/components/person/CommonPerson'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'EpidemicControlPerson',
  components: { CommonPerson },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('EpidemicControlPersonAdd'),
      hasEdit: this.$hasPower('EpidemicControlPersonEdit'),
      hasCheck: this.$hasPower('EpidemicControlPersonDetail'),
      hasDelete: this.$hasPower('EpidemicControlPersonDelete')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
