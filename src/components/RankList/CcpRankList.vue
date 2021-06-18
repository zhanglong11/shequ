<template>
  <Grid ref="table" :immediate="false" :request="request">
    <vxe-table-column title="任务名称" field="taskName"></vxe-table-column>
    <vxe-table-column title="任务类型" field="categoryName"></vxe-table-column>
    <vxe-table-column title="时间" field="createTime"></vxe-table-column>
    <vxe-table-column title="积分值" field="score"></vxe-table-column>
  </Grid>
</template>

<script>
import { partyScoreList } from '@/api/rankList'
export default {
  name: 'CcpRankList',
  components: {},
  props: {
    identityCardNumber: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      request: body => {
        return partyScoreList({ ...body, identityCardNumber: this.identityCardNumber })
      }
    }
  },
  watch: {
    identityCardNumber: {
      immediate: true,
      handler(val) {
        val && this.$refs.table.refresh()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
