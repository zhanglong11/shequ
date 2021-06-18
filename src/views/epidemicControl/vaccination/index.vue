<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline>
        <el-form-item>
          <el-input v-model="filterForm.keyword" placeholder="姓名/身份证/联系电话"></el-input>
        </el-form-item>
        <el-form-item label="接种状态">
          <Select v-model="filterForm.status" has-all :options="vaccinationStatus" placeholder="接种状态"></Select>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="$hasPower('EpidemicControlVaccinationAdd')"
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
      <vxe-table-column title="姓名" field="name" width="180"></vxe-table-column>
      <vxe-table-column title="性别" field="sex" width="120" formatter="sex"></vxe-table-column>
      <vxe-table-column title="身份证号" field="idCardNumber" min-width="200"></vxe-table-column>
      <vxe-table-column title="联系电话" field="phone" width="180"></vxe-table-column>
      <vxe-table-column title="接种状态" field="status" width="150">
        <template #default="{ row }">
          {{ $getLabel(vaccinationStatus, row.status) }}
        </template>
      </vxe-table-column>
      <vxe-table-column title="创建时间" field="createTime" width="200"></vxe-table-column>
      <vxe-table-column title="创建人" field="creatorName" width="150"></vxe-table-column>
      <vxe-table-column title="操作" field="opts" width="200" fixed="right">
        <template #default="{ row }">
          <el-button v-if="$hasPower('EpidemicControlVaccinationEdit')" type="primary" @click="handleEdit(row)"
            >编辑状态</el-button
          >
          <el-button v-if="$hasPower('EpidemicControlVaccinationDetail')" type="primary" @click="handleDetail(row)"
            >查看详情</el-button
          >
          <el-button v-if="$hasPower('EpidemicControlVaccinationDelete')" type="danger" @click="handleDelete(row)"
            >删除</el-button
          >
        </template>
      </vxe-table-column>
    </Grid>
    <AddVaccinationDialog
      v-if="addVisible"
      :visible.sync="addVisible"
      @submit="handleAddDialogCommit"
    ></AddVaccinationDialog>
    <EditVaccinationDialog
      v-if="editVisible"
      :info="selectRow"
      :visible.sync="editVisible"
      @submit="handleEditSubmit"
    ></EditVaccinationDialog>
  </div>
</template>

<script>
import Api from './api'
import { vaccinationStatus } from './lib'
import EditVaccinationDialog from './components/EditVaccinationDialog'
import AddVaccinationDialog from './components/AddVaccinationDialog'
export default {
  name: 'VaccinationManege',
  components: { AddVaccinationDialog, EditVaccinationDialog },
  props: {},
  data() {
    return {
      vaccinationStatus,
      sortConfig: {
        remote: true
      },
      filterForm: {},
      selectRow: {},
      addVisible: false,
      editVisible: false,
      request: Api.getList
    }
  },
  computed: {
    companyId() {
      return this.$store.state.user.companyId
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
      this.selectRow = {}
      this.addVisible = true
    },
    // 编辑
    handleEdit(row) {
      this.selectRow = { ...row }
      this.editVisible = true
    },
    // 详情
    handleDetail(row) {
      this.$router.push({
        name: `GridResidentDetail`,
        params: { id: row.idCardNumber }
      })
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
        await Api.deleteById([row.id])
        this.$message.success('操作成功!')
        await this.refresh()
      }
    },
    // 新建提交
    async handleAddDialogCommit(data) {
      const arr = _.map(data, item => {
        return {
          companyId: this.companyId,
          idCardNumber: item.identityCardNumber,
          status: item.vaccinationStatus
        }
      })
      await Api.add(arr)
      this.addVisible = false
      this.$message.success('操作成功!')
      await this.refresh()
    },
    // 修改状态提交
    async handleEditSubmit(data) {
      await Api.update(data)
      this.editVisible = false
      this.$message.success('操作成功!')
      await this.refresh()
    }
  }
}
</script>

<style scoped lang="less"></style>
