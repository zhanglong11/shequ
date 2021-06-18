<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline :model="filterForm">
        <el-form-item>
          <el-input v-model="filterForm.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <Select v-model="filterForm.status" :options="statusList" has-all />
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset()">重置</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPower('QuestionnaireAdd')" plain type="primary" icon="el-icon-plus" @click="handelAdd()"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <Grid ref="table" :request="request" :filter-form.sync="filterForm">
      <vxe-table-column title="标题" show-overflow field="title"></vxe-table-column>
      <vxe-table-column title="发起时间" show-overflow field="createTime">
        <template #default="{ row }">
          {{ dayjs(row.createTime).format('YYYY-MM-DD HH:mm:00') }}
        </template>
      </vxe-table-column>
      <vxe-table-column title="截止时间" show-overflow field="endTime">
        <template #default="{ row }">
          {{ dayjs(row.endTime).format('YYYY-MM-DD HH:mm') }}
        </template>
      </vxe-table-column>
      <vxe-table-column title="状态" field="status">
        <template #default="{ row }">
          {{ $getLabel(statusList, row.status) }}
        </template>
      </vxe-table-column>
      <vxe-table-column title="提交问卷数" field="count"> </vxe-table-column>
      <vxe-table-column field="creatorName" title="创建人"> </vxe-table-column>
      <vxe-table-column title="操作" width="260px" fixed="right">
        <template #default="{ row }">
          <el-button v-if="$hasPower('QuestionnaireUpdate')" type="text" @click="handelUpdate(row.id)">编辑</el-button>
          <el-button v-if="$hasPower('QuestionnDetail')" type="text" @click="handleDetail(row.id)">查看详情</el-button>
          <el-button v-if="$hasPower('QuestionDelete')" type="text" @click="handelDelete(row.id)">删除</el-button>
        </template>
      </vxe-table-column>
    </Grid>
  </div>
</template>

<script>
import Api from '../api'
export default {
  name: 'VoteManage',

  data() {
    return {
      baginAddDialog: false,
      filterForm: {},
      baginId: '',
      request: body => Api.getinformQuestionList(body),
      statusList: [
        { value: 0, label: '已结束' },
        { value: 1, label: '进行中' }
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
    handelAdd() {
      this.$router.push({
        name: `QuestionnaireAdd`
      })
    },
    handelUpdate(id) {
      this.$router.push({
        name: `QuestionnaireUpdate`,
        params: { id }
      })
    },
    handleDetail(id) {
      this.$router.push({
        name: `QuestionnDetail`,
        params: { id }
      })
    },
    handelDelete(id) {
      this.$confirm('确认删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          Api.getinformQuestionDelete(id).then(res => {
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
