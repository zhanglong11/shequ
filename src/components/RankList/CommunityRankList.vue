<template>
  <Grid ref="table" :immediate="false" :request="request">
    <vxe-table-column title="活动名称" field="taskName"></vxe-table-column>
    <vxe-table-column title="活动类型" field="categoryName"></vxe-table-column>
    <vxe-table-column title="时间" field="createTime"></vxe-table-column>
    <vxe-table-column title="积分值" field="score"></vxe-table-column>
  </Grid>
</template>

<script>
import { associationList } from '@/api/rankList'
export default {
  name: 'CommunityRankList',
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
        return associationList({ ...body, identityCardNumber: this.identityCardNumber })
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
