<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline>
        <el-form-item>
          <el-input v-model="filterForm.name" placeholder="活动名称"></el-input>
        </el-form-item>
        <el-form-item label="活动开始时间">
          <SelectDateRange :startTime.sync="filterForm.activityBeginTime" :endTime.sync="filterForm.activityEndTime" />
        </el-form-item>
        <el-form-item label="活动类型">
          <Select v-model="filterForm.type" arg-group="ccpActivityType" has-all />
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="$refs.table.reset()">重置</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="$hasPower('CcpActivityCreate')"
            type="primary"
            plain
            icon="el-icon-plus"
            @click="handleAdd(null)"
            >新建活动</el-button
          >
          <el-button v-if="$hasPower('CcpsActivity')" icon="el-icon-time" @click="handleCode">二维码有效期</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Grid ref="table" :request="request" :filter-form.sync="filterForm">
      <vxe-table-column title="活动名称" field="name"></vxe-table-column>
      <vxe-table-column title="活动地点" field="site"></vxe-table-column>
      <vxe-table-column title="活动类型" field="typeName"> </vxe-table-column>
      <vxe-table-column title="活动状态" field="status">
        <template #default="{ row }">
          <Status v-model="row.status" :options="statusList" />
        </template>
      </vxe-table-column>
      <vxe-table-column title="活动开始时间" field="activityBeginTime" formatter="ymdhm"></vxe-table-column>
      <vxe-table-column title="活动结束时间" field="activityEndTime" formatter="ymdhm"></vxe-table-column>
      <vxe-table-column title="报名开始时间" field="applyBeginTime" formatter="ymdhm"></vxe-table-column>
      <vxe-table-column title="报名结束时间" field="applyEndTime" formatter="ymdhm"></vxe-table-column>
      <vxe-table-column title="发起组织" field="organizationName"></vxe-table-column>
      <vxe-table-column title="创建时间" field="createTime"></vxe-table-column>
      <vxe-table-column title="创建人" field="creatorName"></vxe-table-column>
      <vxe-table-column title="操作" width="320" fixed="right">
        <template #default="{ row }">
          <el-button v-if="$hasPower('CcpActivityUpdate')" type="text" @click="handleEdit(row.id)">编辑</el-button>
          <el-button v-if="$hasPower('CcpActivityUpdate')" type="text" @click="handlePick(row.id)">发起签到</el-button>
          <el-button v-if="$hasPower('CcpActivityUpdate')" type="text" @click="handleCount(row.id)"
            >上传活动总结</el-button
          >
          <el-button v-if="$hasPower('CcpActivityDetail')" type="text" @click="handleDetail(row.id)"
            >查看详情</el-button
          >
          <el-button v-if="$hasPower('CcpActivityRemove')" type="text" @click="handleRemove(row)">删除</el-button>
        </template>
      </vxe-table-column>
    </Grid>
    <!--新建 编辑-->
    <ActivitiAdd v-if="editDialogVisible" :id="voluntaryId" :visible.sync="editDialogVisible" @change="refresh" />
    <!--上传签到-->
    <ActivitiSign v-if="signDialogVisible" :id="signId" :visible.sync="signDialogVisible" />
    <!--上传总结-->
    <ActivitiSum v-if="sumDialogVisible" :id="sumId" :visible.sync="sumDialogVisible" />

    <ActivitiDetail v-if="detailDialogVisible" :id="detailId" :visible.sync="detailDialogVisible" />
    <!-- 二维码有效期模态框组件 start -->
    <ModalPeriod :visible.sync="timeDialogVisible" code="ccpActivity" />
    <!-- 二维码有效期模态框组件 end -->
  </div>
</template>

<script>
import ActivitiAdd from './components/Add'
import ActivitiSign from './components/Sign'
import ActivitiSum from './components/Sum'
import ActivitiDetail from './components/Detail'
import ModalPeriod from '../../association/components/ModalPeriod'
import Api from '@/views/association/api'
import { statusList } from '@/views/association/lib/optionsList'
export default {
  name: 'CommunityActivity',
  components: { ActivitiAdd, ActivitiSign, ActivitiSum, ActivitiDetail, ModalPeriod },
  data() {
    return {
      request: Api.getActivityList,
      filterForm: {
        module: 2
      },
      editDialogVisible: false,
      signDialogVisible: false,
      sumDialogVisible: false,
      detailDialogVisible: false,
      timeDialogVisible: false,
      voluntaryId: '',
      signId: '',
      sumId: '',
      detailId: '',
      statusList
    }
  },
  created() {},
  mounted() {},
  methods: {
    refresh() {
      this.$refs.table.refresh()
    },
    // 详情
    handleDetail(id) {
      this.detailId = id
      this.detailDialogVisible = true
    },
    // 上传活动总结
    handleCount(id) {
      this.sumId = id
      this.sumDialogVisible = true
    },
    // 发起签到
    handlePick(id) {
      this.signId = id
      this.signDialogVisible = true
    },
    // 新建
    handleAdd() {
      this.voluntaryId = null
      this.editDialogVisible = true
    },
    // 编辑
    handleEdit(id) {
      this.voluntaryId = id
      this.editDialogVisible = true
    },
    async handleRemove(row) {
      await this.$remove(row)
      await Api.getActivityDelete([row.id])
      this.$message.info('删除成功')
      this.refresh()
    },
    // 二维码有效期
    handleCode() {
      this.timeDialogVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
