<template>
  <div class="container">
    <Aside @change="handleChange"></Aside>
    <div class="main-content">
      <div class="tooltips">
        <el-form inline>
          <el-form-item>
            <el-input v-model="filterForm.realName" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="filterForm.identityCardNumber" placeholder="身份证号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="filterForm.mobile" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <Select v-model="filterForm.status" has-all arg-group="ccpMemberStatus" placeholder="状态"></Select>
          </el-form-item>
          <el-form-item>
            <Select v-model="filterForm.flowStatus" has-all arg-group="flowStatus" placeholder="流动状态"></Select>
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
              <el-button icon="el-icon-refresh-left" @click="$refs.table.reset()">重置</el-button>
            </el-button-group>
          </el-form-item>
          <el-form-item>
            <button-link v-if="$hasPower('CcpMemberCreate')" to="member/new" type="primary" plain icon="el-icon-plus"
              >新建</button-link
            >
          </el-form-item>
        </el-form>
      </div>
      <Grid ref="table" page-use-query :request="request" :filter-form.sync="filterForm">
        <vxe-table-column title="党组织名称" field="organizationName"></vxe-table-column>
        <vxe-table-column title="姓名" field="realName"></vxe-table-column>
        <vxe-table-column title="性别" field="sex" width="60" formatter="sex"></vxe-table-column>
        <vxe-table-column title="手机号" field="mobile"></vxe-table-column>
        <vxe-table-column title="身份证" field="identityCardNumber"></vxe-table-column>
        <vxe-table-column title="状态" field="statusName"></vxe-table-column>
        <vxe-table-column title="流动状态" field="flowStatusName"></vxe-table-column>
        <vxe-table-column title="党内职务" field="postName"></vxe-table-column>
        <vxe-table-column title="操作" width="180px">
          <template #default="{ row }">
            <button-link v-if="$hasPower('CcpMemberUpdate')" type="text" :to="'member/' + row.id">编辑</button-link>
            <button-link
              v-if="$hasPower('CcpMemberDetail')"
              type="text"
              :to="'member/' + row.id + '/detail?showDelete=true'"
              >查看详情</button-link
            >
            <el-button v-if="$hasPower('CcpMemberRemove')" type="text" @click="handleRemove(row)">删除</el-button>
          </template>
        </vxe-table-column>
      </Grid>
    </div>
  </div>
</template>

<script>
import Aside from '../components/Aside'
import { getPartyMemberManagementList, removePartyMemberManagementById } from '@/api/ccp/member'

export default {
  name: 'CcpDepartment',
  components: { Aside },
  data() {
    return {
      activeId: null,
      filterForm: {},
      request: getPartyMemberManagementList
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
    async handleRemove(row) {
      await this.$remove(row)
      await removePartyMemberManagementById(row.id)
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
