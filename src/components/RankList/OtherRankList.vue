<template>
  <Grid ref="table" :immediate="false" :request="request">
    <vxe-table-column title="事项" field="taskName"></vxe-table-column>
    <vxe-table-column
      title="调整类型"
      field="addOrSubtract"
      :formatter="({ cellValue }) => ['增加', '减少'][cellValue - 1]"
    ></vxe-table-column>
    <vxe-table-column title="积分" field="score"></vxe-table-column>
    <vxe-table-column title="创建时间" field="createTime"></vxe-table-column>
    <vxe-table-column title="创建人" field="creatorName"></vxe-table-column>
  </Grid>
</template>

<script>
import { otherScoreList } from '@/api/rankList'
export default {
  name: 'OtherRankList',
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
        return otherScoreList({ ...body, identityCardNumber: this.identityCardNumber })
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
