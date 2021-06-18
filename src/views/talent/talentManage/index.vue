<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline :model="filterForm">
        <el-form-item>
          <el-input v-model="filterForm.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <Select v-model="filterForm.status" :options="statusType" has-all />
        </el-form-item>
        <el-form-item label="创建时间">
          <SelectDateRange
            :startTime.sync="filterForm.creteTimeFrom"
            :endTime.sync="filterForm.creteTimeTo"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset()">重置</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPower('TalentAdd')" plain type="primary" icon="el-icon-plus" @click="handelAdd()"
            >新建</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <Grid ref="table" :request="request" :filter-form.sync="filterForm">
      <vxe-table-column title="标题" field="title"></vxe-table-column>
      <vxe-table-column title="状态" field="status">
        <template #default="{ row }">
          <Status v-model="row.status" :options="statusType" />
        </template>
      </vxe-table-column>
      <vxe-table-column field="createTime" title="创建时间">
        <template #default="{ row }">
          {{ dayjs(row.createTime).format('YYYY-MM-DD HH:mm') }}
        </template>
      </vxe-table-column>
      <vxe-table-column field="creatorName" title="创建人"> </vxe-table-column>
      <vxe-table-column title="操作" width="360px" fixed="right">
        <template #default="{ row }">
          <el-button v-if="$hasPower('TalentEdit')" type="text" @click="handelUpdate(row.id)">编辑</el-button>
          <el-button v-if="$hasPower('HandlelShow') && row.status === 0" type="text" @click="handlelPublic(row)"
            >显示</el-button
          >
          <el-button v-if="$hasPower('HandlelCancel') && row.status === 1" type="text" @click="handlelPublic(row)"
            >隐藏</el-button
          >
          <template v-if="[1].includes(row.status)">
            <el-button v-if="$hasPower('HasToTopSet') && row.topFlag === 0" type="text" @click="handleToTop(row)"
              >置顶</el-button
            >
            <el-button v-if="$hasPower('HasToTopSet') && row.topFlag === 1" type="text" @click="handleToTop(row)"
              >取消置顶</el-button
            >
          </template>
          <el-button v-if="$hasPower('TalentDetail')" type="text" @click="handleDetail(row.id)">查看详情</el-button>
          <el-button v-if="$hasPower('TalentDelete')" type="text" @click="handelDelete(row.id)">删除</el-button>
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
      statusType: [
        {
          label: '已隐藏',
          value: 0,
          color: '#BFBFBF'
        },
        {
          label: '已显示',
          value: 1,
          color: '#00A854'
        }
      ],
      request: body => Api.getcommunityList(body)
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
    // 显示
    async handlelPublic(row) {
      await Api.getcommunityUpdate({ id: row.id, status: +!row.status })
      this.$message.success('操作成功!')
      await this.refresh()
    },
    // 置顶/取消置顶操作
    async handleToTop(row) {
      await Api.getcommunityUpdate({ id: row.id, topFlag: +!row.topFlag })
      this.$message.success('操作成功!')
      await this.refresh()
    },
    handelAdd() {
      this.$router.push({
        name: `TalentAdd`
      })
    },
    handelUpdate(id) {
      this.$router.push({
        name: `TalentEdit`,
        params: { id }
      })
    },
    handleDetail(id) {
      this.$router.push({
        name: `TalentDetail`,
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
          Api.getcommunityDelete([id]).then(res => {
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
