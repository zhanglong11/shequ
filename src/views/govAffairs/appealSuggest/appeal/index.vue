<template>
  <div class="container">
    <div class="no-footer">
      <div class="tooltips">
        <el-form inline>
          <el-form-item>
            <el-input v-model="filterForm.applicant" placeholder="诉求人"></el-input>
          </el-form-item>
          <el-form-item label="处理状态">
            <Select v-model="filterForm.status" :options="appealSuggestStatus" has-all> </Select>
          </el-form-item>
          <el-form-item label="提交时间">
            <SelectDateRange
              :startTime.sync="filterForm.startTime"
              :endTime.sync="filterForm.endTime"
              start-placeholder="提交开始时间"
              end-placeholder="提交结束时间"
            />
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
        <vxe-table-column title="诉求人" field="applicant" width="200"></vxe-table-column>
        <vxe-table-column title="诉求内容" field="content" min-width="200"></vxe-table-column>
        <vxe-table-column title="提交时间" field="createTime" width="180"></vxe-table-column>
        <vxe-table-column title="涉及部门" field="involveDepartment" width="150"></vxe-table-column>
        <vxe-table-column title="解决意见或措施" field="solution" min-width="200"></vxe-table-column>
        <vxe-table-column title="处理情况" field="status" width="150">
          <template #default="{ row }">
            {{ $getLabel(appealSuggestStatus, row.status) }}
          </template>
        </vxe-table-column>
        <vxe-table-column title="操作" field="opts" width="200" fixed="right">
          <template #default="{ row }">
            <el-button
              v-if="$hasPower('AppealSuggestAppealAppeal') && row.status === 0"
              type="primary"
              @click="handleHandleAppeal(row)"
              >处理</el-button
            >
            <el-button v-if="$hasPower('AppealSuggestAppealDetail')" type="primary" @click="handleDetail(row)"
              >查看详情</el-button
            >
            <el-button v-if="$hasPower('AppealSuggestAppealDelete')" type="danger" @click="handleDelete(row)"
              >删除</el-button
            >
          </template>
        </vxe-table-column>
      </Grid>
    </div>
    <DetailDialog v-if="detailVisible" :id="selectRowId" :visible.sync="detailVisible"></DetailDialog>
    <!--处理弹窗-->
    <HandleDialog
      v-if="handleVisible"
      :visible.sync="handleVisible"
      :info="selectRow"
      @submit="submitHandle"
    ></HandleDialog>
  </div>
</template>

<script>
import Api from '../api'
import appealSuggestStatus from '../../lib/appealSuggestStatus'
import DetailDialog from '../components/DetailDialog'
import HandleDialog from '../components/HandleDialog'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'AppealSuggestAppeal',
  components: { HandleDialog, DetailDialog },
  data() {
    // 这里存放数据
    return {
      appealSuggestStatus,
      sortConfig: {
        remote: true
      },
      filterForm: {},
      request: Api.getAppealList,
      selectRow: {},
      selectRowId: '',
      handleVisible: false, // 处理弹窗
      detailVisible: false // 详情弹窗
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
    // 处理
    handleHandleAppeal(row) {
      this.selectRow = row
      this.selectRowId = row.id
      this.handleVisible = true
    },
    // 处理提交
    async submitHandle(data) {
      await Api.submitHandleAppeal({ id: this.selectRowId, ...data })
      this.$message.success('提交成功')
      this.handleVisible = false
      await this.refresh()
    },
    handleDetail(row) {
      this.selectRow = row
      this.selectRowId = row.id
      this.detailVisible = true
    },
    // 删除
    async handleDelete(row) {
      const res = await this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message.info('操作已取消')
      })
      if (res) {
        await Api.deleteAppeal(row.id)
        await this.$message.success('删除成功')
        await this.refresh()
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
