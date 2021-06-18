<template>
  <div class="container">
    <CommonPerson
      model="综合治理"
      :hasAdd="hasAdd"
      :hasEdit="hasEdit"
      :hasCheck="hasCheck"
      :hasDelete="hasDelete"
      add-router-name="CompositeGovernPersonAdd"
      edit-router-name="CompositeGovernPersonEdit"
      detail-router-name="CompositeGovernPersonDetail"
    >
    </CommonPerson>
  </div>
</template>

<script>
import CommonPerson from '@/views/epidemicControl/components/person/CommonPerson'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'CompositeGovernPerson',
  components: { CommonPerson },
  data() {
    // 这里存放数据
    return {
      hasAdd: this.$hasPower('CompositeGovernPersonAdd'),
      hasEdit: this.$hasPower('CompositeGovernPersonEdit'),
      hasCheck: this.$hasPower('CompositeGovernPersonDetail'),
      hasDelete: this.$hasPower('CompositeGovernPersonDelete')
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
