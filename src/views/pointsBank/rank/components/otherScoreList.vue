<template>
  <Grid :request="request" auto-resize>
    <vxe-table-column field="taskName" title="事项"></vxe-table-column>
    <vxe-table-column field="addOrSubtract" title="调整类型">
      <template #default="{ row }">
        {{ row.addOrSubtract == 1 ? '增加' : '减少' }}
      </template>
    </vxe-table-column>
    <vxe-table-column field="score" title="积分"></vxe-table-column>
    <vxe-table-column field="createTime" title="创建时间"></vxe-table-column>
    <vxe-table-column field="creatorName" title="创建人"></vxe-table-column>
  </Grid>
</template>

<script>
import { getOtherScoreList } from '../../api/pointsBand.js'

export default {
  name: 'OtherScoreList',
  components: {},
  props: {
    identityCardNumber: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      request: body => getOtherScoreList({ ...body, identityCardNumber: this.identityCardNumber })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
