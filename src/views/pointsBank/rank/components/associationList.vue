<template>
  <Grid :request="request" auto-resize>
    <vxe-table-column field="taskName" title="活动名称" />
    <vxe-table-column field="taskType" title="活动类别" />
    <vxe-table-column field="createTime" title="时间" />
    <vxe-table-column field="score" title="积分值" />
  </Grid>
</template>

<script>
import { getAssociationList } from '../../api/pointsBand.js'

export default {
  name: 'AssociationList',
  components: {},
  props: {
    identityCardNumber: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      request: body => getAssociationList({ ...body, identityCardNumber: this.identityCardNumber })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
