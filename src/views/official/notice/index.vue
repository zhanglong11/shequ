<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline :model="filterForm">
        <el-form-item>
          <el-input v-model="filterForm.title" placeholder="公告标题"></el-input>
        </el-form-item>
        <el-form-item label="功能模块：">
          <Select v-model="filterForm.parentType" arg-group="module" has-all />
          <!-- <el-select v-model="filterForm.parentType" placeholder="请选择">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              v-for="(complainTypeItem, index) in parentTypeList"
              :key="index"
              :label="complainTypeItem.argText"
              :value="complainTypeItem.argCode"
            />
          </el-select> -->
        </el-form-item>
        <el-form-item label="核对状态：">
          <Select v-model="filterForm.status" :options="statusList" has-all />
        </el-form-item>
        <el-form-item label="核对时间：">
          <SelectDateRange :startTime.sync="filterForm.beginTime" :endTime.sync="filterForm.endTime" />
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-add" @click="search()">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset()">重置</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
    </div>
    <Grid ref="table" :request="request" :filter-form.sync="filterForm">
      <vxe-table-column title="公告标题" show-overflow field="title"></vxe-table-column>
      <vxe-table-column title="功能模块" field="parentTypeName"> </vxe-table-column>
      <vxe-table-column title="发布部门/组织" show-overflow field="parentName"> </vxe-table-column>
      <vxe-table-column title="创建时间" show-overflow field="createTime">
        <template #default="{ row }">
          {{ dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </vxe-table-column>
      <vxe-table-column title="创建人" field="creatorName"></vxe-table-column>
      <vxe-table-column field="status" title="核对状态">
        <template #default="{ row }">
          <Status v-model="row.status" :options="statusList" />
        </template>
      </vxe-table-column>
      <vxe-table-column title="核对人" field="checkPersonName"></vxe-table-column>
      <vxe-table-column title="核对时间" show-overflow field="checkTime"> </vxe-table-column>
      <vxe-table-column title="操作" width="260px" fixed="right">
        <template #default="{ row }">
          <span v-if="row.status === 1" style="margin: 0 15px; display: inline-block">
            <el-button v-if="$hasPower('NoticeCheck')" type="text" @click="handleCheck(row.id)">核对</el-button>
          </span>
          <el-button v-if="$hasPower('NoticeDetail')" type="text" @click="handleDetail(row.id)">查看详情</el-button>
        </template>
      </vxe-table-column>
    </Grid>
    <!-- 核对模态框 -->
    <CheckAdd v-if="checkAddDialog" :id="checkId" :visible.sync="checkAddDialog" />
  </div>
</template>

<script>
import { statusList } from '../lib/optionsList'
import CheckAdd from './check'
import Api from '../api'

export default {
  name: 'NoticeManage',
  components: { CheckAdd },
  data() {
    return {
      statusList,
      parentTypeList: [],
      checkAddDialog: false,
      filterForm: {},
      checkId: '',
      request: body => Api.getinformList(body)
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 查询
    search() {
      this.refresh()
    },
    // 重置
    reset() {
      this.$refs.table.reset()
    },
    // 查询列表
    refresh() {
      this.$refs.table.refresh()
    },
    handleDetail(id) {
      this.$router.push({
        name: `NoticeDetail`,
        params: { id }
      })
    },
    // 核对
    handleCheck(id) {
      this.checkId = id
      this.checkAddDialog = true
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
