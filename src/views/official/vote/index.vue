<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline :model="filterForm">
        <el-form-item>
          <el-input v-model="filterForm.voteTheme" placeholder="投票主题"></el-input>
        </el-form-item>
        <el-form-item label="投票状态：">
          <Select v-model="filterForm.status" :options="statusList" has-all />
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset()">重置</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPower('VoteAdd')" plain type="primary" icon="el-icon-plus" @click="handelAdd(null)"
            >发起投票</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <Grid ref="table" :request="request" :filter-form.sync="filterForm">
      <vxe-table-column title="投票主题" show-overflow field="voteTheme"></vxe-table-column>
      <vxe-table-column title="发起投票时间" show-overflow field="voteBeginTime"> </vxe-table-column>
      <vxe-table-column title="投票截止时间" show-overflow field="voteEndTime">
        <template #default="{ row }">
          {{ dayjs(row.voteEndTime).format('YYYY-MM-DD HH:mm') }}
        </template>
      </vxe-table-column>
      <vxe-table-column title="投票状态" field="status">
        <template #default="{ row }">
          {{ $getLabel(statusList, row.status) }}
        </template>
      </vxe-table-column>
      <vxe-table-column title="参与人" show-overflow field="participationCount"> </vxe-table-column>
      <vxe-table-column field="creatorName" title="创建人"> </vxe-table-column>
      <vxe-table-column title="操作" width="260px" fixed="right">
        <template #default="{ row }">
          <el-button v-if="$hasPower('VoteEdit')" type="text" @click="handelAdd(row.id)">编辑</el-button>
          <el-button v-if="$hasPower('VoteDetail')" type="text" @click="handleDetail(row.id)">查看详情</el-button>
          <el-button v-if="$hasPower('VoteDelete')" type="text" @click="handelDelete(row.id)">删除</el-button>
        </template>
      </vxe-table-column>
    </Grid>
    <!-- 新建,编辑，取消模态框 -->
    <BaginAdd v-if="baginAddDialog" :id="baginId" :visible.sync="baginAddDialog" />
  </div>
</template>

<script>
import BaginAdd from './baginAdd'
import Api from '../api'
export default {
  name: 'VoteManage',
  components: { BaginAdd },
  data() {
    return {
      baginAddDialog: false,
      filterForm: {},
      baginId: '',
      request: body => Api.getinformVoteList(body),
      statusList: [
        { value: 0, label: '已结束' },
        { value: 1, label: '投票中' }
      ]
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
    handelAdd(id) {
      this.baginAddDialog = true
      this.baginId = id
    },
    handleDetail(id) {
      this.$router.push({
        name: `VoteDetail`,
        query: { id }
      })
    },
    handelDelete(id) {
      this.$confirm('确认删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          Api.getinformDelete(id).then(res => {
            if (res.code === 200) {
              this.$message.info('删除成功')
              this.refresh()
            }
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
