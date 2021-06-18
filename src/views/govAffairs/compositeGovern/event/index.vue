<template>
  <div class="container no-footer">
    <GridTree v-model="filterForm.orgId"></GridTree>
    <div class="main-content">
      <div class="tooltips">
        <el-form inline>
          <el-form-item>
            <el-input v-model="filterForm.description" placeholder="事件描述"></el-input>
          </el-form-item>
          <el-form-item label="事件类型">
            <Select v-model="filterForm.type" argGroup="eventType" has-all> </Select>
          </el-form-item>
          <el-form-item label="状态">
            <Select v-model="filterForm.status" :options="eventStatus" has-all> </Select>
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
              <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
            </el-button-group>
          </el-form-item>
          <el-form-item>
            <el-button v-if="$hasPower('CompositeGovernEventAdd')" type="primary" plain icon="el-icon-plus" @click="add"
              >新建</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <Grid ref="table" page-use-query :request="request" :filterForm.sync="filterForm">
        <vxe-table-column title="网格名称" field="orgName" min-width="150"></vxe-table-column>
        <vxe-table-column title="事件描述" field="description" min-width="150"></vxe-table-column>
        <vxe-table-column title="事件类型" field="typeName" width="150"></vxe-table-column>
        <vxe-table-column title="事件规模" field="scaleName" width="150"></vxe-table-column>
        <vxe-table-column title="发生时间" field="occurrenceTime" width="180"></vxe-table-column>
        <vxe-table-column title="事件状态" field="status" width="120">
          <template #default="{ row }">
            {{ $getLabel(eventStatus, row.status) }}
          </template>
        </vxe-table-column>
        <vxe-table-column title="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button
              v-if="$hasPower('CompositeGovernEventEdit') && row.status !== 1"
              type="primary"
              @click="handleEdit(row)"
              >编辑</el-button
            >
            <el-button v-if="$hasPower('CompositeGovernEventDetail')" type="primary" @click="handleDetail(row)"
              >查看详情</el-button
            >
            <el-button v-if="$hasPower('CompositeGovernEventDelete')" type="danger" @click="handleRemove(row)"
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
import eventStatus from '../../lib/eventStatus'
import GridTree from '../component/GridTree'
export default {
  name: 'CompositeGovernEvent',
  components: { GridTree },
  data() {
    return {
      eventStatus,
      filterForm: { orgId: '' },
      request: Api.getEventList
    }
  },
  computed: {},
  watch: {
    'filterForm.orgId': {
      immediate: true,
      deep: false,
      handler() {
        this.refresh()
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleTreeSelect(data) {
      // if (data.type === 6) {
      this.filterForm.orgId = data.id
      this.refresh()
      // }
    },
    async refresh() {
      this.$refs.table.refresh()
    },
    reset() {
      this.$refs.table.reset()
    },
    add() {
      this.$router.push({ name: 'CompositeGovernEventAdd' })
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
        await Api.deleteEventById(row.id)
        await this.$message.success('删除成功')
        await this.refresh()
      }
    },
    handleEdit(row) {
      this.$router.push({
        name: 'CompositeGovernEventEdit',
        params: {
          id: row.id
        }
      })
    },
    handleDetail(row) {
      this.$router.push({
        name: 'CompositeGovernEventDetail',
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
