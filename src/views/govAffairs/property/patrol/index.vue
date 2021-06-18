<template>
  <div class="container">
    <div class="no-footer">
      <div class="tooltips">
        <el-form inline>
          <el-form-item label="巡查类型">
            <Select v-model="filterForm.type" argGroup="patrolType" has-all> </Select>
          </el-form-item>
          <el-form-item label="所属物业">
            <Select v-model="filterForm.propertyId" :options="organizationList" has-all> </Select>
          </el-form-item>
          <el-form-item label="巡查结果">
            <Select v-model="filterForm.result" :options="patrolStatus" has-all> </Select>
          </el-form-item>
          <el-form-item label="巡查日期">
            <SelectDateRange
              :startTime.sync="filterForm.policeTimeFrom"
              :endTime.sync="filterForm.policeTimeTo"
              start-placeholder="巡查开始日期"
              end-placeholder="巡查结束日期"
            />
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
              <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
            </el-button-group>
          </el-form-item>
          <el-form-item>
            <el-button v-if="$hasPower('PropertyPatrolAdd')" type="primary" plain icon="el-icon-plus" @click="handleAdd"
              >新建</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <Grid
        ref="table"
        :sortConfig="sortConfig"
        :request="request"
        :filter-form.sync="filterForm"
        @sort-change="handleSortChange"
      >
        <vxe-table-column title="巡查单号" field="code" width="200"></vxe-table-column>
        <vxe-table-column title="巡查名称" field="name" min-width="180"></vxe-table-column>
        <vxe-table-column title="巡查类型" field="typeName" width="150"></vxe-table-column>
        <vxe-table-column title="所属物业" field="propertyName" min-width="180"></vxe-table-column>
        <vxe-table-column title="巡查人" field="policeMan" width="120"></vxe-table-column>
        <vxe-table-column title="巡查日期" field="policeTime" width="180" formatter="ymd"></vxe-table-column>
        <vxe-table-column title="巡查结果" field="result" width="120">
          <template #default="{ row }">
            {{ $getLabel(patrolStatus, row.result) }}
          </template>
        </vxe-table-column>
        <vxe-table-column title="是否申诉" field="appealFlag" width="120">
          <template #default="{ row }">
            {{ $getLabel(appealFlag, row.appealFlag) }}
          </template>
        </vxe-table-column>
        <vxe-table-column title="申诉处理结果" field="appealResult" width="150">
          <template #default="{ row }">
            {{ $getLabel(appealResult, row.appealResult) }}
          </template>
        </vxe-table-column>
        <vxe-table-column title="创建人" field="creatorName" width="120"></vxe-table-column>
        <vxe-table-column title="创建日期" field="createTime" width="180"></vxe-table-column>
        <vxe-table-column title="操作" field="opts" width="200" fixed="right">
          <template #default="{ row }">
            <el-button
              v-if="
                $hasPower('PropertyPatrolAppeal') && row.result === 0 && !!row.appealFlag && row.appealResult === null
              "
              type="primary"
              @click="handleHandleAppeal(row)"
              >申诉处理</el-button
            >
            <el-button v-if="$hasPower('PropertyPatrolDetail')" type="primary" @click="handleDetail(row)"
              >查看详情</el-button
            >
          </template>
        </vxe-table-column>
      </Grid>
    </div>
    <AddPatrol
      v-if="addVisible"
      :visible.sync="addVisible"
      :organizationList="organizationList"
      @submit="handleAddSubmit"
    ></AddPatrol>
    <HandleAppealDialog
      v-if="handleAppealVisible"
      :visible.sync="handleAppealVisible"
      :info="selectRow"
      @submit="submitHandleAppeal"
    ></HandleAppealDialog>
  </div>
</template>

<script>
import Api from '../api'
import patrolStatus from '../../lib/patrolStatus'
import appealFlag from '../../lib/appealFlag'
import appealResult from '../../lib/appealResult'
import AddPatrol from './componnets/AddPatrol'
import HandleAppealDialog from './componnets/HandleAppealDialog'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'PropertyPatrol',
  components: { HandleAppealDialog, AddPatrol },
  data() {
    // 这里存放数据
    return {
      patrolStatus,
      appealFlag,
      appealResult,
      sortConfig: {
        remote: true
      },
      organizationList: [], // 物业列表
      filterForm: {},
      request: Api.getPatrolList,
      selectRow: {},
      addVisible: false, // 新建
      handleAppealVisible: false // 申诉处理
    }
  },
  created() {
    this.getOrganizationList()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    // 物业全部列表
    async getOrganizationList() {
      const res = await Api.getOrganizationListAll({})
      this.organizationList =
        res.data &&
        res.data.map(item => {
          return {
            id: item.id,
            value: item.id,
            label: item.name,
            name: item.name
          }
        })
    },
    refresh() {
      this.$refs.table.refresh()
    },
    // 重置
    reset() {
      this.$refs.table.reset()
    },
    // 排序改变
    handleSortChange({ order, property }) {
      const isDesc = order === 'desc' ? '-' : ''
      this.filterForm.sort = isDesc + property
      this.refresh()
    },
    async handleAdd() {
      this.addVisible = true
    },
    async handleAddSubmit(data) {
      await Api.addPatrol(data)
      this.$message.success('提交成功')
      this.addVisible = false
      await this.refresh()
    },
    // 申诉处理
    handleHandleAppeal(row) {
      this.selectRow = row
      this.handleAppealVisible = true
    },
    // 申诉处理提交
    async submitHandleAppeal(data) {
      console.log(data)
      await Api.submitHandlePatrolAppeal({
        id: this.selectRow.appealId,
        module: 2,
        complainId: this.selectRow.id,
        ...data
      })
      this.$message.success('提交成功')
      this.handleAppealVisible = false
      await this.refresh()
    },
    handleDetail(row) {
      this.$router.push({
        name: 'PropertyPatrolDetail',
        params: {
          id: row.id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
