<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline :model="filterForm">
        <el-form-item>
          <el-input v-model="filterForm.name" placeholder="物品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filterForm.personOrPhone" placeholder="发布人/手机号"></el-input>
        </el-form-item>
        <el-form-item label="发布时间：">
          <SelectDateRange :startTime.sync="filterForm.beginTime" :endTime.sync="filterForm.endTime" />
        </el-form-item>
        <el-form-item label="交换状态：">
          <Select v-model="filterForm.exchangeStatus" has-all :options="exchangeStatusList" />
        </el-form-item>
        <el-form-item label="审核状态：">
          <Select v-model="filterForm.auditStatus" :options="statusList" has-all />
        </el-form-item>

        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset()">重置</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
    </div>
    <Grid ref="table" :request="request" :filter-form.sync="filterForm">
      <vxe-table-column title="物品名称" show-overflow field="name"></vxe-table-column>
      <vxe-table-column title="详情描述" show-overflow field="details"> </vxe-table-column>
      <vxe-table-column title="发布人" field="realName"> </vxe-table-column>
      <vxe-table-column title="发布人手机号" show-overflow field="phone"> </vxe-table-column>
      <vxe-table-column title="发布时间" show-overflow field="createTime"> </vxe-table-column>
      <vxe-table-column
        title="交换状态"
        field="exchangeStatus"
        :formatter="({ cellValue }) => ['未交换', '已交换'][cellValue]"
      >
      </vxe-table-column>
      <vxe-table-column field="auditStatus" title="审核状态">
        <template #default="{ row }">
          {{ statusList.filter(item => item.value === row.auditStatus)[0].label }}
        </template>
      </vxe-table-column>
      <vxe-table-column title="审核人" field="auditPersonName"></vxe-table-column>
      <vxe-table-column title="审核时间" show-overflow field="auditTime"> </vxe-table-column>
      <vxe-table-column title="操作" width="260px" fixed="right">
        <template #default="{ row }">
          <div>
            <span v-if="row.auditStatus === 0" style="margin: 0 15px; display: inline-block">
              <el-button v-if="$hasPower('GoodsCheck')" type="text" @click="handleCheck(row.id)">审核</el-button>
            </span>
            <el-button v-if="$hasPower('GoodsDetail')" type="text" @click="handleDetail(row.id)">查看详情</el-button>
            <el-button v-if="$hasPower('GoodsDelete')" type="text" @click="handleDelete(row.id)">删除</el-button>
          </div>
        </template>
      </vxe-table-column>
    </Grid>
    <!-- 核对模态框 -->
    <CheckAdd v-if="checkAddDialog" :id="checkId" :visible.sync="checkAddDialog" />
  </div>
</template>

<script>
import CheckAdd from './check'
import Api from '../api'
export default {
  name: 'GoodsManage',
  components: { CheckAdd },
  data() {
    return {
      checkAddDialog: false,
      filterForm: {},
      checkId: '',
      request: body => Api.getinformGoodsList(body),
      statusList: [
        { value: 0, label: '审核中' },
        { value: 1, label: '审核通过' },
        { value: 2, label: '审核驳回' }
      ],
      exchangeStatusList: [
        { value: 0, label: '未交换' },
        { value: 1, label: '已交换' }
      ]
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 查询
    search() {
      this.refresh()
    },
    // 重置
    reset() {
      this.$refs.table.reset()
    },
    // 查询列表
    refresh() {
      this.$refs.table.refresh()
    },
    handleDetail(id) {
      this.$router.push({
        name: `GoodsDetail`,
        query: { id }
      })
    },
    // 核对
    handleCheck(id) {
      this.checkId = id
      this.checkAddDialog = true
    },
    handleDelete(id) {
      this.$confirm('确认删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          Api.getinformGoodsDelete(id).then(res => {
            if (res.code === 200) {
              this.$message.info('删除成功')
              this.refresh()
            }
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
