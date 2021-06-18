<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline>
        <el-form-item>
          <el-input v-model="filterForm.outWarehouseNumber" placeholder="出库单编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filterForm.giftName" placeholder="出库商品"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filterForm.realName" placeholder="兑换人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
    </div>
    <Grid ref="table" :request="request" :filter-form.sync="filterForm">
      <vxe-table-column title="出库单编号" field="outWarehouseNumber"></vxe-table-column>
      <vxe-table-column title="出库商品" field="giftName"></vxe-table-column>
      <vxe-table-column title="出库数量" field="convertCount"></vxe-table-column>
      <vxe-table-column title="兑换人" field="realName"></vxe-table-column>
      <vxe-table-column title="出库时间" field="updateTime"></vxe-table-column>
      <vxe-table-column title="扣除积分" field="deductScore"></vxe-table-column>
      <vxe-table-column title="关联兑换订单" field="convertOrderNumber"></vxe-table-column>
    </Grid>
  </div>
</template>

<script>
import { admin } from '@/plugins/axios'
export default {
  name: 'DeliveryLogs',
  data() {
    return {
      filterForm: {},
      request(body) {
        return admin.post('bankGiftManagement/deliveryRecordList', body)
      }
    }
  },
  watch: {
    // 监听书筛选输入框的变化
    filterText(val) {
      this.$refs.table.filter(val)
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 刷新
    refresh() {
      this.$refs.table.refresh()
    },
    // 重置
    reset() {
      this.$refs.table.reset()
    }
  }
}
</script>
