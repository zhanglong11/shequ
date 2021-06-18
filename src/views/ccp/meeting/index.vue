<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline :model="filterForm">
        <el-form-item>
          <el-input v-model="filterForm.meetingSubject" placeholder="会议主题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filterForm.keyword" placeholder="会议室名称"></el-input>
        </el-form-item>
        <el-form-item label="会议状态：">
          <Select v-model="filterForm.status" :options="statusList" has-all />
        </el-form-item>
        <el-form-item label="会议开始时间：">
          <SelectDateRange :startTime.sync="filterForm.startTimeFrom" :endTime.sync="filterForm.startTimeTo" />
        </el-form-item>
        <el-form-item label="会议结束时间：">
          <SelectDateRange :startTime.sync="filterForm.endTimeFrom" :endTime.sync="filterForm.endTimeTo" />
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="$refs.table.reset()">重置</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="$hasPower('CcpMeetingCreate')"
            type="primary"
            plain
            icon="el-icon-plus"
            @click="handleAdd(null, 'add')"
            >新建会议</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPower('MeetingsManage')" icon="el-icon-time" @click="getAddTime()"
            >二维码有效期</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <Grid ref="table" :request="request" :filter-form.sync="filterForm">
      <vxe-table-column title="会议主题" field="meetingSubject"></vxe-table-column>
      <vxe-table-column title="会议室名称" field="meetingAddress">
        <template #default="{ row }"> {{ row.meetingAddress }} </template>
      </vxe-table-column>
      <vxe-table-column title="会议开始时间" show-overflow field="startTime"></vxe-table-column>
      <vxe-table-column title="会议结束时间" show-overflow field="endTime"></vxe-table-column>
      <vxe-table-column field="status" title="会议状态">
        <template #default="{ row }">
          <Status :options="statusList" :value="row.status"></Status>
        </template>
      </vxe-table-column>
      <vxe-table-column title="发起人" show-overflow field="initiatorName"></vxe-table-column>
      <vxe-table-column title="创建时间" show-overflow field="createTime"></vxe-table-column>
      <vxe-table-column title="创建人" show-overflow field="creatorName"></vxe-table-column>
      <vxe-table-column title="操作" width="260px" fixed="right">
        <template #default="{ row }">
          <template v-if="[0, 1].includes(row.status)">
            <el-button type="text" @click="handleAdd(row.id, 'edit')">编辑</el-button>
            <el-button type="primary" @click="handlePick(row.id)">发起签到</el-button>
            <el-button type="text" @click="handleAdd(row.id, 'cancel')">取消会议</el-button>
          </template>
          <template v-if="[2].includes(row.status)">
            <el-button type="primary" @click="handlePick(row.id)">发起签到</el-button>
            <el-button type="text" @click="handleAdd(row.id, 'upload')">上传会议记录</el-button>
          </template>
          <template v-if="[3].includes(row.status)">
            <el-button type="text" @click="handleAdd(row.id, 'edit')">编辑</el-button>
          </template>
          <el-button v-if="$hasPower('CcpMeetingDetail')" type="text" @click="handleDetail(row)">查看详情</el-button>
        </template>
      </vxe-table-column>
    </Grid>
    <!-- 新建,编辑，取消模态框 -->
    <Edit v-if="editDialogVisible" :id="activeId" :visible.sync="editDialogVisible" :type="type"></Edit>
    <!--详情-->
    <CompanyDetail v-if="detailDialogVisible" :id="activeId" :visible.sync="detailDialogVisible" />
    <!--上传签到-->
    <SignAdd v-if="signDialogVisible" :id="signId" :visible.sync="signDialogVisible" />
    <!-- 二维码有效期模态框组件 start -->
    <ModalPeriod :visible.sync="timeDialogVisible" code="meetingsManage" />
    <!-- 二维码有效期模态框组件 end -->
  </div>
</template>

<script>
import { statusList } from '@/views/workbench/lib/optionsList'
import Edit from './components/Edit'
import CompanyDetail from './components/Detail'
import SignAdd from './components/sign'
import ModalPeriod from '../../association/components/ModalPeriod'
import Api from '@/views/workbench/api'
export default {
  name: 'MeetingManage',
  components: { Edit, CompanyDetail, SignAdd, ModalPeriod },
  data() {
    return {
      statusList,
      editDialogVisible: false,
      detailDialogVisible: false,
      signDialogVisible: false,
      timeDialogVisible: false,
      filterForm: {
        companyId: this.$store.state.user.companyId,
        keyword: '',
        startTimeFrom: '',
        endTimeFrom: '',
        module: 2 // 1普通 2党
      },
      activeId: '',
      signId: '',
      type: 'add',
      request: body => Api.getWorkbenchList(body)
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
    // 模态框
    handleAdd(id, type = 'add') {
      this.activeId = id
      this.type = type
      this.editDialogVisible = true
    },
    // 详情模态框
    handleDetail(row) {
      this.activeId = row.id
      this.detailDialogVisible = true
    },
    handlePick(id) {
      this.signId = id
      this.signDialogVisible = true
    },
    getAddTime() {
      this.timeDialogVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
