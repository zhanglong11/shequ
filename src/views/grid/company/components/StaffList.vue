<template>
  <div>
    <h3>
      <span>员工列表</span>
      <el-button v-if="manage" style="float: right" icon="el-icon-plus" type="text" @click="handleAdd"
        >添加员工</el-button
      >
    </h3>
    <Grid ref="table" :request="request" auto-resize>
      <vxe-table-column title="姓名" field="name"></vxe-table-column>
      <vxe-table-column title="性别" field="sex" formatter="sex"></vxe-table-column>
      <vxe-table-column title="联系电话" width="120" field="phone"></vxe-table-column>
      <vxe-table-column title="学历" field="educationCodeName"></vxe-table-column>
      <vxe-table-column title="操作" width="200px">
        <template #default="{ row }">
          <el-button v-if="manage" type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button v-if="manage" type="text" @click="handleRemove(row)">删除</el-button>
          <el-button type="text" @click="handleViewDetail(row)">查看详情</el-button>
        </template>
      </vxe-table-column>
    </Grid>
    <StaffEdit
      :id="activeId"
      :enterpriseId="enterpriseId"
      :visible.sync="staffEditDialogVisible"
      @change="refresh"
    ></StaffEdit>
    <StaffDetail :id="activeId" :enterpriseId="enterpriseId" :visible.sync="staffDetailDialogVisible"></StaffDetail>
  </div>
</template>
<script>
import { getStaffList, removeStaffById } from '@/api/grid/companyStaff'
import StaffEdit from './StaffEdit'
import StaffDetail from './StaffDetail'

export default {
  name: 'StaffList',
  components: { StaffEdit, StaffDetail },
  props: {
    enterpriseId: {
      type: String,
      default: null
    },
    // 是否可以新建、编辑、删除员工
    manage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      request: body => getStaffList({ ...body, enterpriseId: this.enterpriseId }),
      staffEditDialogVisible: false,
      staffDetailDialogVisible: false,
      activeId: null
    }
  },
  methods: {
    refresh() {
      this.$refs.table.refresh()
    },
    handleAdd() {
      this.activeId = null
      this.staffEditDialogVisible = true
    },
    handleEdit(row) {
      this.activeId = row.id
      this.staffEditDialogVisible = true
    },
    handleViewDetail(row) {
      this.activeId = row.id
      this.staffDetailDialogVisible = true
    },
    async handleRemove(node) {
      await this.$remove(node)
      await removeStaffById(node.id)
      await this.refresh()
      await this.$message.success('删除成功')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
