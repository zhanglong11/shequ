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
        <el-form-item label="活动类型：">
          <Select v-model="filterForm.type" arg-group="activityType" has-all />
          <!-- <Select v-model="filterForm.type" :options="activityList" has-all /> -->
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset()">重置</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="$hasPower('CommunityActivityAdd')"
            type="primary"
            plain
            icon="el-icon-plus"
            @click="handleAdd(null)"
            >新建活动</el-button
          >
          <el-button v-if="$hasPower('GroupActivityCode')" icon="el-icon-time" @click="handleCode"
            >二维码有效期</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <Grid ref="table" :request="request" :filter-form.sync="filterForm">
      <vxe-table-column title="活动名称" show-overflow field="name"></vxe-table-column>
      <vxe-table-column title="活动地点" show-overflow field="site"></vxe-table-column>
      <vxe-table-column title="活动类型" field="typeName"> </vxe-table-column>
      <vxe-table-column title="活动状态" field="status">
        <template #default="{ row }">
          <Status v-model="row.status" :options="statusList" />
        </template>
      </vxe-table-column>
      <vxe-table-column title="活动开始时间" show-overflow field="activityBeginTime"></vxe-table-column>
      <vxe-table-column title="活动结束时间" show-overflow field="activityEndTime"></vxe-table-column>
      <vxe-table-column title="报名开始时间" show-overflow field="applyBeginTime"></vxe-table-column>
      <vxe-table-column title="报名结束时间" show-overflow field="applyEndTime"></vxe-table-column>
      <vxe-table-column title="发起组织" show-overflow field="organizationName"></vxe-table-column>
      <vxe-table-column title="创建时间" show-overflow field="createTime"></vxe-table-column>
      <vxe-table-column title="创建人" field="creatorName"></vxe-table-column>
      <vxe-table-column title="操作" width="350px" fixed="right">
        <template #default="{ row }">
          <el-button v-if="$hasPower('CommunityActivityEdit')" type="primary" @click="handleAdd(row.id)"
            >编辑</el-button
          >
          <el-button v-if="$hasPower('CommunityActivitySign')" type="primary" @click="handlePick(row.id)"
            >发起签到</el-button
          >
          <el-button v-if="$hasPower('CommunityActivityUpload')" type="primary" @click="handleCount(row.id)"
            >上传活动总结</el-button
          >
          <el-button v-if="$hasPower('CommunityActivityDetail')" type="primary" @click="handleDetail(row.id)"
            >查看详情</el-button
          >
          <el-button v-if="$hasPower('QuestionDelete')" type="danger" @click="handleRemove(row.id)">删除</el-button>
        </template>
      </vxe-table-column>
    </Grid>
    <!--新建 编辑-->
    <UnityAdd v-if="editDialogVisible" :id="voluntaryId" :visible.sync="editDialogVisible" />
    <!--上传签到-->
    <UnitySign v-if="signDialogVisible" :id="signId" :visible.sync="signDialogVisible" />
    <!--上传总结-->
    <UnitySum v-if="sumDialogVisible" :id="sumId" :visible.sync="sumDialogVisible" />

    <UnityDetail v-if="detailDialogVisible" :id="detailId" :visible.sync="detailDialogVisible" />

    <!-- 二维码有效期模态框组件 start -->
    <ModalPeriod :visible.sync="periodVisible" code="groupActivity" />
    <!-- 二维码有效期模态框组件 end -->
  </div>
</template>

<script>
import UnityAdd from './UnityAdd'
import UnitySign from './UnitySign'
import UnitySum from './UnitySum'
import UnityDetail from '../components/detail'
import Api from '../api'
import { statusList } from '../lib/optionsList'
import ModalPeriod from '../components/ModalPeriod'
export default {
  name: 'CommunityActivity',
  components: { UnityAdd, UnitySign, UnitySum, UnityDetail, ModalPeriod },
  data() {
    return {
      statusList,
      activityList: [],
      request: body => Api.getActivityList(body),
      filterForm: {
        module: 1
      },
      editDialogVisible: false,
      signDialogVisible: false,
      sumDialogVisible: false,
      detailDialogVisible: false,
      voluntaryId: '',
      signId: '',
      sumId: '',
      detailId: '',
      periodVisible: false
    }
  },
  created() {},
  mounted() {},
  methods: {
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
    // 编辑
    handleAdd(id) {
      this.voluntaryId = id
      this.editDialogVisible = true
    },
    // 重置
    reset() {
      this.$refs.table.reset()
    },
    search() {
      this.refresh()
    },
    handleRemove(id) {
      this.$confirm('确认删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          Api.getActivityDelete([id]).then(res => {
            if (res.code === 200) {
              this.$message.info('删除成功')
              this.refresh()
            }
          })
          this.refresh()
        })
        .catch(() => {})
    },
    refresh() {
      this.$refs.table.refresh()
    },
    // 二维码有效期
    handleCode() {
      this.periodVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
