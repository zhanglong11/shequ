<template>
  <div class="container">
    <div class="no-footer">
      <div class="tooltips">
        <el-form inline>
          <el-form-item>
            <el-input v-model="filterForm.complainer" placeholder="投诉人"></el-input>
          </el-form-item>
          <el-form-item label="投诉类型">
            <Select v-model="filterForm.type" argGroup="appealType" has-all> </Select>
          </el-form-item>
          <el-form-item label="单据状态">
            <Select v-model="filterForm.status" :options="appealStatus" has-all> </Select>
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
              <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
            </el-button-group>
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
        <vxe-table-column title="投诉单号" field="code" width="200"></vxe-table-column>
        <vxe-table-column title="投诉物业" field="objName" min-width="200"></vxe-table-column>
        <vxe-table-column title="投诉类型" field="typeName" width="200"></vxe-table-column>
        <vxe-table-column title="投诉内容" field="content" min-width="200"></vxe-table-column>
        <vxe-table-column title="投诉人" field="complainerName" width="150"></vxe-table-column>
        <vxe-table-column title="投诉时间" field="createTime" width="180"></vxe-table-column>
        <vxe-table-column title="单据状态" field="status" width="120">
          <template #default="{ row }">
            {{ $getLabel(appealStatus, row.status) }}
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
        <vxe-table-column title="操作" field="opts" width="250" fixed="right">
          <template #default="{ row }">
            <el-button
              v-if="$hasPower('PropertyAppealAssign') && row.status === '0'"
              type="primary"
              @click="handleAssign(row)"
              >指派</el-button
            >
            <el-button
              v-if="$hasPower('PropertyAppealFillResult') && row.status === '1' && row.dealMan.indexOf(userId) >= 0"
              type="primary"
              @click="handleFillResult(row)"
              >填写处理结果</el-button
            >
            <el-button
              v-if="
                $hasPower('PropertyAppealAppeal') && row.status === '2' && !!row.appealFlag && row.appealResult === null
              "
              type="primary"
              @click="handleHandleAppeal(row)"
              >申诉处理</el-button
            >
            <el-button v-if="$hasPower('PropertyAppealDetail')" type="primary" @click="handleDetail(row)"
              >查看详情</el-button
            >
          </template>
        </vxe-table-column>
      </Grid>
    </div>
    <SelectSystemUserTreeList
      v-if="assignVisible"
      title="指派处理人"
      :visible.sync="assignVisible"
      @submit="submitAssign"
    ></SelectSystemUserTreeList>
    <FillResult v-if="fillResultVisible" :visible.sync="fillResultVisible" @submit="submitFillResult"></FillResult>
    <HandleAppealDialog
      v-if="handleAppealVisible"
      :visible.sync="handleAppealVisible"
      :info="selectRow"
      @submit="submitHandleAppeal"
    ></HandleAppealDialog>
  </div>
</template>

<script>
import SelectSystemUserTreeList from '@/views/epidemicControl/components/person/CommonPersonAdd/components/SelectSystemUserTreeList'
import Api from '../api'
import appealStatus from '../../lib/appealStatus'
import appealFlag from '../../lib/appealFlag'
import appealResult from '../../lib/appealResult'
import FillResult from './componnets/FillResult'
import HandleAppealDialog from './componnets/HandleAppealDialog'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'PropertyAppeal',
  components: { SelectSystemUserTreeList, FillResult, HandleAppealDialog },
  data() {
    // 这里存放数据
    return {
      appealStatus,
      appealFlag,
      appealResult,
      sortConfig: {
        remote: true
      },
      filterForm: { module: 2 },
      request: Api.getAppealList,
      selectRow: {},
      assignVisible: false, // 指派弹窗
      fillResultVisible: false, // 填写处理结果
      handleAppealVisible: false // 申诉处理
    }
  },
  computed: {
    userId() {
      return this.$store.state.user.userInfo.id
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
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
    // 指派
    async handleAssign(row) {
      this.selectRow = row
      this.assignVisible = true
    },
    // 指派提交
    async submitAssign(data) {
      const idArr = data.map(item => item.dataUnicode)
      await Api.appealAssign({ id: this.selectRow.id, dealMan: idArr.join(',') })
      this.$message.success('指派成功')
      this.assignVisible = false
      await this.refresh()
    },
    // 填写处理结果
    handleFillResult(row) {
      this.selectRow = row
      this.fillResultVisible = true
    },
    // 填写处理结果提交
    async submitFillResult(data) {
      await Api.submitFillResult({ id: this.selectRow.id, obj: this.selectRow.obj, ...data })
      this.$message.success('提交成功')
      this.fillResultVisible = false
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
      await Api.submitHandleAppeal({ id: this.selectRow.appealId, module: 1, complainId: this.selectRow.id, ...data })
      this.$message.success('提交成功')
      this.handleAppealVisible = false
      await this.refresh()
    },
    handleDetail(row) {
      this.$router.push({
        name: 'PropertyAppealDetail',
        params: {
          id: row.id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
