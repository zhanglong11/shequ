<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline>
        <el-form-item>
          <el-input v-model="filterForm.convertOrderNumber" placeholder="订单编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filterForm.giftName" placeholder="兑换商品"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filterForm.realName" placeholder="兑换人"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <Select v-model="filterForm.orderStatus" :options="orderStatusList" has-all> </Select>
        </el-form-item>
        <el-form-item label="兑换状态">
          <Select v-model="filterForm.convertStatus" :options="convertStatusList" has-all> </Select>
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
      <vxe-table-column title="兑换订单编号" field="convertOrderNumber"></vxe-table-column>
      <vxe-table-column title="兑换商品" field="giftName"></vxe-table-column>
      <vxe-table-column title="兑换数量" field="convertCount"></vxe-table-column>
      <vxe-table-column title="兑换人" field="realName"></vxe-table-column>
      <vxe-table-column title="订单提交时间" field="orderSubmitTime"></vxe-table-column>
      <vxe-table-column title="扣除积分" field="deductScore"></vxe-table-column>
      <vxe-table-column title="订单状态" field="orderStatus">
        <template #default="{ row }">
          {{ row.orderStatus == 0 ? '未处理' : '已处理' }}
        </template>
      </vxe-table-column>
      <vxe-table-column title="兑换状态" field="convertStatus">
        <template #default="{ row }">
          {{ row.convertStatus == 0 ? '未兑换' : '已兑换' }}
        </template>
      </vxe-table-column>
      <vxe-table-column title="处理人" field="processingStaff"></vxe-table-column>
      <vxe-table-column title="处理时间" field="updateTime"></vxe-table-column>
      <vxe-table-column title="出库单编号" field="outWarehouseNumber"></vxe-table-column>
      <vxe-table-column title="操作" width="260px" fixed="right">
        <template #default="{ row }">
          <el-button v-if="$hasPower('ProcessOrder') && row.orderStatus == 0" type="primary" @click="handleEdit(row)">
            处理
          </el-button>
          <el-button v-if="$hasPower('OrderDetail')" type="primary" @click="handleInfo(row)">查看详情</el-button>
        </template>
      </vxe-table-column>
    </Grid>
    <Edit
      v-if="editDialogVisible"
      :id="activeId"
      :title="editDialogTitle"
      :visible.sync="editDialogVisible"
      :isorder="order"
    ></Edit>
  </div>
</template>

<script>
import { orderStatusList, convertStatusList } from '../lib/options'
import { deleteBandGift, updateBankGift } from '../api/pointsBand.js'
import Edit from './components/Edit'
import { admin } from '@/plugins/axios'
export default {
  name: 'GiftManage',
  components: { Edit },
  data() {
    return {
      filterForm: {
        giftName: '',
        realName: '',
        convertOrderNumber: '',
        orderStatus: null,
        convertStatus: null
      },
      orderStatusList,
      convertStatusList,
      editDialogVisible: false,
      editDialogTitle: '',
      order: null,
      activeId: null,
      request(body) {
        return admin.post('bankGiftManagement/scoreConvertList', body)
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
    refresh() {
      this.$refs.table.refresh()
    },
    // 处理订单
    handleEdit(row) {
      this.activeId = row.id
      this.editDialogTitle = '处理订单'
      this.order = true
      this.editDialogVisible = true
    },
    // 查看详情
    handleInfo(row) {
      this.activeId = row.id
      this.editDialogTitle = '查看详情'
      this.order = false
      this.editDialogVisible = true
    },
    // 上下架
    async toggleStatus(row) {
      console.log(row.status !== 0)
      if (row.status !== 0) {
        row.status = 0
        const params = Object.assign(row, row.status)
        await updateBankGift(params)
      } else {
        const params = Object.assign(row, (row.status = 1))
        await updateBankGift(params)
      }
    },
    // 重置
    reset() {
      this.$refs.table.reset()
    },
    // 删除礼品
    async handleRemove(row) {
      await deleteBandGift(row.id)
      this.refresh()
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
