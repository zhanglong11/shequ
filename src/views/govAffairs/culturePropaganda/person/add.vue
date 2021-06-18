<template>
  <CommonPersonAdd model="文化宣传"></CommonPersonAdd>
</template>

<script>
import CommonPersonAdd from '@/views/epidemicControl/components/person/CommonPersonAdd'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'CulturePropagandaPersonAdd',
  components: { CommonPersonAdd },
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
