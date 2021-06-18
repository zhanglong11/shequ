<template>
  <div class="container">
    <CommunityTree
      v-model="filterForm.wbsCode"
      :type.sync="filterForm.nodeType"
      class="scroll-beauty aside"
    ></CommunityTree>
    <div class="main-content">
      <div class="tooltips">
        <el-form inline>
          <el-form-item>
            <el-input
              v-model="filterForm.keyword"
              placeholder="请输入企业名称/统一社会信用代码"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="filterForm.legalPerson" placeholder="请输入法人"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
              <el-button icon="el-icon-refresh-left" @click="$refs.table.reset()">重置</el-button>
            </el-button-group>
          </el-form-item>
          <el-form-item>
            <button-link v-if="$hasPower('GridCompanyCreate')" type="primary" plain icon="el-icon-plus" to="company/new"
              >新建</button-link
            >
          </el-form-item>
        </el-form>
      </div>
      <Grid ref="table" page-use-query :request="request" :filterForm.sync="filterForm">
        <vxe-table-column title="企业名称" field="name"></vxe-table-column>
        <vxe-table-column title="统一社会信用代码" field="unifiedSocialCreditCode"></vxe-table-column>
        <vxe-table-column title="企业类型" field="companyTypeName"></vxe-table-column>
        <vxe-table-column title="行业类别" field="companyIndustryName"></vxe-table-column>
        <vxe-table-column title="法人" field="legalPerson"></vxe-table-column>
        <vxe-table-column title="联系人" field="linkman"></vxe-table-column>
        <vxe-table-column title="联系电话" width="120" field="linkmanMobile"></vxe-table-column>
        <vxe-table-column title="操作" width="160" fixed="right">
          <template #default="{ row }">
            <button-link v-if="$hasPower('GridCompanyUpdate')" type="text" :to="`company/${row.id}`">编辑</button-link>
            <button-link v-if="$hasPower('GridCompanyDetail')" type="text" :to="`company/${row.id}/detail`"
              >查看详情</button-link
            >
            <el-button v-if="$hasPower('GridCompanyRemove')" type="text" @click="handleRemove(row)">删除</el-button>
          </template>
        </vxe-table-column>
      </Grid>
    </div>
  </div>
</template>

<script>
import { getEnterpriseList, removeEnterpriseById } from '@/api/grid/company'
export default {
  name: 'GridCompany',
  components: {},
  data() {
    return {
      filterForm: {},
      request: getEnterpriseList
    }
  },
  watch: {
    'filterForm.wbsCode': 'refresh'
  },
  created() {},
  mounted() {},
  methods: {
    async refresh() {
      this.$refs.table.refresh()
    },
    async handleRemove(node) {
      await this.$remove(node)
      await removeEnterpriseById(node.id)
      await this.refresh()
      await this.$message.success('删除成功')
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
  max-height: calc(100vh - 150px);
  overflow: auto;
}
.main-content {
  flex: 1;
  overflow: auto;
}
</style>
