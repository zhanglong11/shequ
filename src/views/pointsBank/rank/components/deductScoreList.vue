<template>
  <Grid :request="request" auto-resize>
    <vxe-table-column field="giftName" title="兑换商品" />
    <vxe-table-column field="convertCount" title="兑换数量" />
    <vxe-table-column field="orderSubmitTime" title="订单提交时间" />
    <vxe-table-column field="deductScore" title="扣除积分" />
  </Grid>
</template>

<script>
import { getDeductScoreList } from '../../api/pointsBand.js'

export default {
  name: 'DeductScoreList',
  components: {},
  props: {
    identityCardNumber: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      request: body => getDeductScoreList({ ...body, identityCardNumber: this.identityCardNumber })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
