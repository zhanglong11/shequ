<template>
  <div class="container no-footer">
    <GridTree v-model="filterForm.wbsCode"></GridTree>
    <div class="main-content">
      <div class="tooltips">
        <el-form inline>
          <el-form-item>
            <el-input v-model="filterForm.name" placeholder="重点区域名称"></el-input>
          </el-form-item>
          <el-form-item label="区域类型">
            <Select v-model="filterForm.type" argGroup="areaType" has-all> </Select>
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
              <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
            </el-button-group>
          </el-form-item>
          <el-form-item>
            <el-button v-if="$hasPower('CompositeGovernAreaAdd')" type="primary" plain icon="el-icon-plus" @click="add"
              >新建</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <Grid ref="table" page-use-query :request="request" :filterForm.sync="filterForm">
        <vxe-table-column title="网格名称" field="orgName" min-width="180"></vxe-table-column>
        <vxe-table-column title="重点区域名称" field="name" width="200"></vxe-table-column>
        <vxe-table-column title="区域类型" field="typeName" width="180"></vxe-table-column>
        <vxe-table-column title="备注" field="remark" min-width="150"></vxe-table-column>
        <vxe-table-column title="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button v-if="$hasPower('CompositeGovernAreaEdit')" type="primary" @click="handleEdit(row)"
              >编辑</el-button
            >
            <el-button v-if="$hasPower('CompositeGovernAreaDetail')" type="primary" @click="handleDetail(row)"
              >查看详情</el-button
            >
            <el-button v-if="$hasPower('CompositeGovernAreaDelete')" type="danger" @click="handleRemove(row)"
              >删除</el-button
            >
          </template>
        </vxe-table-column>
      </Grid>
    </div>
  </div>
</template>

<script>
import Api from '../api'
import GridTree from '../component/GridTree'
export default {
  name: 'CompositeGovernArea',
  components: { GridTree },
  data() {
    return {
      filterForm: { wbsCode: '' },
      request: Api.getAreaList
    }
  },
  computed: {},
  watch: {
    'filterForm.wbsCode': {
      immediate: false,
      deep: false,
      handler() {
        this.refresh()
      }
    }
  },
  created() {},

  mounted() {},
  methods: {
    async refresh() {
      this.$refs.table.refresh()
    },
    reset() {
      this.$refs.table.reset()
    },
    add() {
      this.$router.push({ name: 'CompositeGovernAreaAdd' })
    },
    async handleRemove(row) {
      const res = await this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message.info('操作已取消')
      })
      if (res) {
        await Api.deleteAreaById(row.id)
        await this.refresh()
        await this.$message.success('删除成功')
      }
    },
    handleEdit(row) {
      this.$router.push({
        name: 'CompositeGovernAreaEdit',
        params: {
          id: row.id
        }
      })
    },
    handleDetail(row) {
      this.$router.push({
        name: 'CompositeGovernAreaDetail',
        params: {
          id: row.id
        }
      })
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
