<template>
  <Grid :request="request" auto-resize>
    <vxe-table-column field="taskName" title="任务名称" />
    <vxe-table-column field="taskType" title="任务类型" />
    <vxe-table-column field="createTime" title="时间" />
    <vxe-table-column field="score" title="积分值" />
  </Grid>
</template>

<script>
import { getPartyScoreList } from '../../api/pointsBand.js'

export default {
  name: 'VoList',
  components: {},
  props: {
    identityCardNumber: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      request: body => getPartyScoreList({ ...body, identityCardNumber: this.identityCardNumber })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
