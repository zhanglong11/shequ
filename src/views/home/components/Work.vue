<template>
  <div class="task-list">
    <Grid ref="table" :request="request" :filter-form.sync="filterForm" :isPagination="false" height="100%">
      <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
      <vxe-table-column field="processDefinitionName" title="表单名称" min-width="180">
        <template #default="{ row }">
          <el-button type="text" @click="toFormAudit(row)">{{ row.processDefinitionName }}</el-button>
        </template>
      </vxe-table-column>
      <vxe-table-column field="formGroupName" title="所属板块" min-width="200">
        <template #default="{ row }">
          <el-button v-if="row.flag !== '1'" type="text" @click="toFormAudit(row, 0)">{{
            row.formGroupName
          }}</el-button>
          <span v-else>{{ row.formGroupName }}</span>
        </template>
      </vxe-table-column>
      <!--      <vxe-table-column field="content" title="摘要" min-width="300"></vxe-table-column>-->
      <vxe-table-column field="applyUserName" title="发起人" width="120"></vxe-table-column>
      <vxe-table-column field="createTime" title="发起时间" min-width="200">
        <template #default="{ row }">
          <span><i class="el-icon-time" style="color: #2b7bff; margin-right: 3px"></i>{{ row.createTime }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="status" title="审批" width="150" fixed="right">
        <template #default="{ row }">
          <el-button style="font-size: 12px" type="text" @click="toFormAudit(row)">审批</el-button>
        </template>
      </vxe-table-column>
    </Grid>
  </div>
</template>

<script>
import homeApi from '../api'
export default {
  props: {
    taskCount: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    // 这里存放数据
    return {
      filterForm: {
        page: 1,
        rows: 200,
        taskStatus: 0
      },
      request: async body => {
        const result = await homeApi.getTaskList(body)
        const datas = result.data
        this.$emit('update:taskCount', datas.total)
        return result
      }
    }
  },
  // 方法集合
  methods: {
    // 重置搜索
    reset() {
      this.$refs.table.reset()
    },
    // 审批
    toFormAudit(row) {
      this.$router.push({
        name: 'ProjectOACustomFormDetail',
        query: { id: row.targetId, name: row.processDefinitionName, isCheck: true }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.task-list {
  height: 100%;
  overflow: hidden;
}
</style>
