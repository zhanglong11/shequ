<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline>
        <el-form-item>
          <el-input v-model="filterForm.keyword" placeholder="巡查项目"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filterForm.patrolContent" placeholder="检查内容"></el-input>
        </el-form-item>
        <el-form-item label="巡查时间">
          <el-date-picker
            v-model="filterForm.patrolTime"
            style="width: 200px"
            type="date"
            placeholder="选择巡查时间"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="$hasPower('EpidemicControlInspectAdd')"
            type="primary"
            plain
            icon="el-icon-plus"
            @click="handleAdd"
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
      <vxe-table-column title="巡查时间" field="patrolTime" width="180" formatter="ymd"></vxe-table-column>
      <vxe-table-column title="巡查项目" field="patrolProject" width="180"></vxe-table-column>
      <vxe-table-column title="检查内容" field="patrolContent" min-width="150"></vxe-table-column>
      <vxe-table-column title="巡查对象" field="patrolApplication" width="180"></vxe-table-column>
      <vxe-table-column title="执行情况" field="executiveCondition" width="150"></vxe-table-column>
      <vxe-table-column title="存在问题记录" field="problemRecord" min-width="180"></vxe-table-column>
      <vxe-table-column title="整改建议" field="recommendations" min-width="150"></vxe-table-column>
      <vxe-table-column title="现场人员" field="fieldForce" width="120"></vxe-table-column>
      <vxe-table-column title="操作" field="opts" width="200" fixed="right">
        <template #default="{ row }">
          <el-button v-if="$hasPower('EpidemicControlInspectEdit')" type="primary" @click="handleEdit(row)"
            >编辑</el-button
          >
          <el-button v-if="$hasPower('EpidemicControlInspectDetail')" type="primary" @click="handleDetail(row)"
            >查看详情</el-button
          >
          <el-button v-if="$hasPower('EpidemicControlInspectDelete')" type="danger" @click="handleDelete(row)"
            >删除</el-button
          >
        </template>
      </vxe-table-column>
    </Grid>
    <AddInspectDialog
      v-if="addVisible"
      :info="selectInspect"
      :visible.sync="addVisible"
      @submit="handleSubmit"
    ></AddInspectDialog>
    <InspectDetailDialog v-if="detailVisible" :info="selectInspect" :visible.sync="detailVisible"></InspectDetailDialog>
  </div>
</template>

<script>
import Api from '../api'
import { sexList } from '../components/lib'
import AddInspectDialog from './components/AddInspectDialog'
import InspectDetailDialog from './components/InspectDetailDialog'
export default {
  name: 'InspectManege',
  components: { AddInspectDialog, InspectDetailDialog },
  props: {},
  data() {
    return {
      sexList,
      sortConfig: {
        remote: true
      },
      filterForm: {},
      selectInspect: {},
      addVisible: false,
      detailVisible: false,
      request(body) {
        return Api.getList(body)
      }
    }
  },
  watch: {},
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
    // 新建
    handleAdd() {
      this.selectInspect = {}
      this.addVisible = true
    },
    // 编辑
    handleEdit(row) {
      this.selectInspect = { ...row }
      this.addVisible = true
    },
    // 详情
    handleDetail(row) {
      this.selectInspect = { ...row }
      this.detailVisible = true
    },
    // 删除
    async handleDelete(row) {
      const res = await this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        })
      })
      if (res) {
        await Api.deleteById(row.id)
        this.$message.success('操作成功!')
        await this.refresh()
      }
    },
    // 添加/编辑提交
    async handleSubmit(data) {
      data.id ? await Api.update(data) : await Api.add(data)
      this.$message.success('操作成功!')
      this.addVisible = false
      await this.refresh()
    }
  }
}
</script>

<style scoped lang="less"></style>
