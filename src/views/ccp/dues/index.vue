<template>
  <div class="container">
    <Aside @input="handleChange"></Aside>
    <div class="main-content">
      <div class="tooltips">
        <el-form inline>
          <el-form-item>
            <el-input v-model="filterForm.realName" placeholder="党员姓名"></el-input>
          </el-form-item>
          <el-form-item label="年份">
            <Select v-model="filterForm.year" has-all :options="yearOptions"></Select>
          </el-form-item>
          <el-form-item label="月份">
            <Select v-model="filterForm.month" has-all :options="monthOptions"></Select>
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
              <el-button icon="el-icon-refresh-left" @click="$refs.table.reset()">重置</el-button>
            </el-button-group>
          </el-form-item>
          <el-form-item>
            <el-button v-if="$hasPower('CcpDuesCreate')" type="primary" plain icon="el-icon-plus" @click="handleAdd"
              >新建</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <Grid ref="table" :request="request" :filter-form.sync="filterForm">
        <vxe-table-column title="年份" field="paymentMonth" formatter="yy"></vxe-table-column>
        <vxe-table-column title="月份" field="paymentMonth" formatter="MM"></vxe-table-column>
        <vxe-table-column title="党组织" field="organizationName"></vxe-table-column>
        <vxe-table-column title="党员姓名" field="partyMemberName"></vxe-table-column>
        <vxe-table-column title="缴纳金额（元）" field="paymentMoney"></vxe-table-column>
        <vxe-table-column title="缴纳日期" field="actualPaymentDay" formatter="ymd"></vxe-table-column>
        <vxe-table-column title="创建时间" field="createTime" formatter="ymdhm"></vxe-table-column>
        <vxe-table-column title="创建人" field="creatorName"></vxe-table-column>
        <vxe-table-column title="操作" width="160px" fixed="right">
          <template #default="{ row }">
            <el-button v-if="$hasPower('CcpDuesUpdate')" type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button v-if="$hasPower('CcpDuesRemove')" type="text" @click="handleRemove(row)">删除</el-button>
          </template>
        </vxe-table-column>
      </Grid>
    </div>
    <Edit :id="activeId" :visible.sync="visible" @change="refresh"></Edit>
  </div>
</template>

<script>
import Aside from '../components/Aside'
import { getPartyPaymentList, removePartyPaymentById } from '@/api/ccp/dues'
import Edit from './components/Edit'

export default {
  name: 'CcpDues',
  components: { Aside, Edit },
  data() {
    return {
      activeId: null,
      filterForm: {},
      visible: false,
      request: getPartyPaymentList,
      yearOptions: _.range(dayjs().year(), dayjs().year() - 50).map(value => ({ label: value, value: '' + value })),
      monthOptions: _.range(1, 13).map(value => ({ label: value + '月', value: '' + value }))
    }
  },
  created() {},
  mounted() {},
  methods: {
    refresh() {
      this.$refs.table.refresh()
    },
    handleChange(id) {
      this.filterForm.organizationId = id
      this.refresh()
    },
    handleAdd() {
      this.activeId = null
      this.visible = true
    },
    handleEdit(row) {
      this.activeId = row.id
      this.visible = true
    },
    async handleRemove(row) {
      await this.$remove(row)
      await removePartyPaymentById(row.id)
      this.$message.success('删除成功')
      this.activeId = null
      this.refresh()
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.container {
  display: flex;
}
.aside {
  width: 300px;
  border-right: 1px solid #eee;
  margin-right: 15px;
  padding-right: 15px;
}
.main-content {
  flex: 1;
}
</style>
