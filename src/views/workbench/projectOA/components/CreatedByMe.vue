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
        <el-form-item label="表单类型">
          <el-select v-model="filterForm.formType" @change="refresh()">
            <el-option :value="1" label="需审批"> </el-option>
            <el-option :value="2" label="无需审批"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="filterForm.processDefinitionName"
            style="width: 200px"
            placeholder="表单名称"
            suffix-icon="el-icon-search"
          />
        </el-form-item>
        <el-form-item label="发起时间">
          <DateRange :startTime.sync="filterForm.startTimeBegin" :endTime.sync="filterForm.startTimeEnd"></DateRange>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="filterForm.status" @change="refresh()">
            <el-option
              v-for="(item, index) of processStatusList"
              :key="'ss' + index"
              :value="item.value"
              :label="item.label"
            ></el-option
          ></el-select>
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
          <el-button type="text" @click="toFormFillDetail(row)">{{ row.processDefinitionName }}</el-button>
        </template>
      </vxe-table-column>
      <vxe-table-column field="formGroupName " title="所属板块" min-width="200">
        <template #default="{ row }">
          <el-button v-if="row.flag !== '1'" type="text" @click="toFormFillDetail(row, 0)">{{
            row.formGroupName
          }}</el-button>
          <span v-else>{{ row.formGroupName }}</span>
        </template>
      </vxe-table-column>
      <!--  <vxe-table-column field="content" title="摘要" min-width="300"></vxe-table-column>-->
      <vxe-table-column field="startTime" title="发起时间" min-width="200">
        <template #default="{ row }">
          <span><i class="el-icon-time" style="color: #2b7bff; margin-right: 3px"></i>{{ row.startTime }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="status" title="状态" width="150">
        <template #default="{ row }">
          <p v-if="filterForm.formType === 2" style="color: #999">已完成</p>
          <p v-if="filterForm.formType === 1">
            <span
              class="cell-btn"
              :style="{
                backgroundColor: ['#2B7BFF', '#F1B238', '#DA4747', '#32B16C'][row.status - 1] || '#eee'
              }"
            >
              {{ $getLabel(processStatusList, row.status - 0) }}</span
            >
          </p>
          <p v-if="filterForm.formType === 1" style="margin-left: 0">
            <el-button v-if="row.status === 3" style="font-size: 12px" type="text" @click="reStart(row)"
              >再次发起
            </el-button>
          </p>
        </template>
      </vxe-table-column>
    </Grid>
    <!--<CommonCheckFlow :id="'73371022986385929'"></CommonCheckFlow>-->
  </div>
</template>

<script>
import Api from '../api'
export default {
  name: 'CreatedByMe',
  data() {
    return {
      projectId: localStorage.getItem('projectId'),
      processStatusList: [
        { value: '', label: '全部' },
        { value: 1, label: '审批中' },
        { value: 2, label: '已通过' },
        { value: 3, label: '已驳回' }
      ],
      formGroupList: [],
      filterForm: {
        // 查询条件
        formGroupId: '',
        processDefinitionName: '',
        startTimeBegin: '',
        startTimeEnd: '',
        formType: 1,
        status: ''
      },
      request(body) {
        body.projectId = this.projectId
        return Api.getCreatedByMeList(body)
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
    // 再次发起
    async reStart(row) {
      console.log(row)
      const addQuery = {
        showAdd: 1
      }
      /* if (item.name === '新建单一任务') {
        addQuery.activeName = 'executor'
        addQuery.activeName = 'executor'
      }
      if (item.name === '新建多任务') {
        addQuery.activeName = 'executor'
        addQuery.taskType = 1
      } */
      if (row.flag === '1') {
        await this.$router.push({
          name: 'ProjectOACustomAdd',
          query: {
            id: row.formId,
            name: row.processDefinitionName
          }
        })
      } else {
        await this.$router.push({
          name: row.powerKey,
          query: addQuery
        })
      }
    },
    // 表单点击跳转详情
    toFormFillDetail(row, isDetail = 1) {
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
/deep/ .vxe-table.size--small .vxe-body--column.col--ellipsis > .vxe-cell {
  max-height: 100px;
}
.cell-btn {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  padding: 0 5px;
  border-radius: 10px;
  color: #fff;
  font-size: 12px;
}
</style>
