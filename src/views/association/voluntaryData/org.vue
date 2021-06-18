<template>
  <TreeSelect
    :replace-fields="replaceFields"
    style="width: 100%"
    v-bind="$attrs"
    :treeData="treeData"
    @change="handleChange"
  ></TreeSelect>
</template>

<script>
import { TreeSelect } from 'ant-design-vue'
import Api from '../api'
export default {
  name: 'SelectOrg',
  components: { TreeSelect },
  props: {},
  data() {
    return {
      replaceFields: {
        key: 'id',
        value: 'id'
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    getSelectOrgList() {
      Api.getOPrganizationList({ type: 0 }).then(res => {
        console.log(res)
      })
    },
    handleChange(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
