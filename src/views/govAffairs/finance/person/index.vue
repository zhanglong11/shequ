<template>
  <div class="container">
    <CommonPerson
      model="财务"
      hasAdd
      hasEdit
      hasCheck
      hasDelete
      add-router-name="FinancePersonAdd"
      edit-router-name="FinancePersonEdit"
      detail-router-name="FinancePersonDetail"
    >
    </CommonPerson>
  </div>
</template>

<script>
import CommonPerson from '@/views/epidemicControl/components/person/CommonPerson'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'FinancePerson',
  components: { CommonPerson },
  data() {
    // 这里存放数据
    return {}
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang="less" scoped></style>
