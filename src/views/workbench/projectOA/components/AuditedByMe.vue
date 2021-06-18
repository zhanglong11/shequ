<template>
  <div class="container">
    <!-- 工具栏 start -->
    <div class="tooltips">
      <el-form inline>
        <el-form-item label="所属模块">
          <el-select v-model="filterForm.formGroupId" @change="refresh()">
            <el-option
              v-for="(item, index) of formGroupList"
              :key="'fgl' + index"
              :value="item.id"
              :label="item.name"
            ></el-option
          ></el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="filterForm.processDefinitionName"
            style="width: 200px"
            placeholder="表单名称"
            suffix-icon="el-icon-search"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="filterForm.applyUserName"
            style="width: 150px"
            placeholder="发起人"
            suffix-icon="el-icon-search"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="filterForm.status" @change="refresh()">
            <el-option
              v-for="(item, index) of statusList"
              :key="'ss' + index"
              :value="item.value"
              :label="item.label"
            ></el-option
          ></el-select>
        </el-form-item>
        <el-form-item label="发起时间">
          <DateRange :startTime.sync="filterForm.startTimeBegin" :endTime.sync="filterForm.startTimeEnd"></DateRange>
        </el-form-item>
        <el-form-item label="审批时间">
          <DateRange :startTime.sync="filterForm.endTimeBegin" :endTime.sync="filterForm.endTimeEnd"></DateRange>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="refresh()">搜索</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset()">重置</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
    </div>
    <!-- 工具栏 end -->
    <Grid ref="table" :request="request" :filter-form.sync="filterForm">
      <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
      <vxe-table-column field="processDefinitionName" title="表单名称" min-width="180">
        <template #default="{ row }">
          <el-button type="text" @click="toFormAuditDetail(row)">{{ row.processDefinitionName }}</el-button>
        </template>
      </vxe-table-column>
      <vxe-table-column field="formGroupName" title="所属板块" min-width="150">
        <template #default="{ row }">
          <el-button v-if="row.flag !== '1'" type="text" @click="toFormAuditDetail(row, 0)">{{
            row.formGroupName
          }}</el-button>
          <span v-else>{{ row.formGroupName }}</span>
        </template>
      </vxe-table-column>
      <!--      <vxe-table-column field="content" title="摘要" min-width="200"></vxe-table-column>-->
      <vxe-table-column field="applyUserName" title="发起人" width="120"></vxe-table-column>
      <vxe-table-column field="createTime" title="发起时间" min-width="200">
        <template #default="{ row }">
          <span><i class="el-icon-time" style="color: #2b7bff; margin-right: 3px"></i>{{ row.createTime }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="endTime" title="审批时间" min-width="200">
        <template #default="{ row }">
          <span><i class="el-icon-time" style="color: #2b7bff; margin-right: 3px"></i>{{ row.endTime }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="status" title="状态" width="150" fixed="right">
        <template #default="{ row }">
          <p>
            <span
              class="cell-btn-common"
              :style="{
                backgroundColor: ['#2B7BFF', '#F1B238', '#DA4747', '#32B16C'][row.status - 1] || '#eee'
              }"
            >
              {{ $getLabel(statusList, row.status - 0) }}</span
            >
          </p>
        </template>
      </vxe-table-column>
    </Grid>
  </div>
</template>

<script>
import Api from '../api'
import statusList from '../lib/statusList'
export default {
  name: 'AuditedByMe',
  components: {},
  data() {
    return {
      statusList,
      projectId: localStorage.getItem('projectId'),
      formGroupList: [],
      filterForm: {
        // 查询条件
        formGroupId: '',
        processDefinitionName: '',
        applyUserName: '',
        startTimeBegin: '',
        startTimeEnd: '',
        endTimeBegin: '',
        endTimeEnd: '',
        status: null,
        taskStatus: 1 // 任务状态(0:待办,1:已办)
      },
      request(body) {
        body.projectId = this.projectId
        return Api.getTaskList(body)
      }
    }
  },
  computed: {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  created() {
    this.getFormGroupList()
  },
  // 方法集合
  methods: {
    // 获取表单类型
    async getFormGroupList() {
      const res = await Api.getFormGroupList({})
      console.log(res.data)
      this.formGroupList = [{ id: '', name: '全部' }, ...res.data]
    },
    // 刷新数据
    refresh() {
      this.$refs.table.refresh()
    },
    // 重置搜索
    reset() {
      this.$refs.table.reset()
    },
    // 表单点击跳转详情
    toFormAuditDetail(row, isDetail = 1) {
      // 1:自定义表单,2:固定表单
      if (row.flag === '1') {
        if (!+isDetail) return
        this.$router.push({
          name: 'ProjectOACustomFormDetail',
          query: { id: row.targetId, name: row.processDefinitionName }
        })
      } else {
        const pcRouteUrl = !isDetail ? row.powerKey : row.pcRouteUrl
        this.$router.push({ name: pcRouteUrl, query: { showAdd: 0, targetId: row.targetId, isDetail } })
      }
    }
  }
}
</script>

<style lang="less" scoped>
/*/deep/ .vxe-table.size--small .vxe-body--column.col--ellipsis > .vxe-cell {
  max-height: 100px;
}*/
.cell-btn-common {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  padding: 0 5px;
  border-radius: 10px;
  color: #fff;
  font-size: 12px;
}
</style>
