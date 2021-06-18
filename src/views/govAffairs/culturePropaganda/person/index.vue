<template>
  <div class="container">
    <CommonPerson
      model="文化宣传"
      :hasAdd="hasAdd"
      :hasEdit="hasEdit"
      :hasCheck="hasCheck"
      :hasDelete="hasDelete"
      add-router-name="CulturePropagandaPersonAdd"
      edit-router-name="CulturePropagandaPersonEdit"
      detail-router-name="CulturePropagandaPersonDetail"
    >
    </CommonPerson>
  </div>
</template>

<script>
import CommonPerson from '@/views/epidemicControl/components/person/CommonPerson'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'CulturePropagandaPerson',
  components: { CommonPerson },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('CulturePropagandaPersonAdd'),
      hasEdit: this.$hasPower('CulturePropagandaPersonEdit'),
      hasCheck: this.$hasPower('CulturePropagandaPersonDetail'),
      hasDelete: this.$hasPower('CulturePropagandaPersonDelete')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
