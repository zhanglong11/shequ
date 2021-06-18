<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline :model="filterForm">
        <el-form-item>
          <el-input v-model="filterForm.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <Select v-model="filterForm.type" arg-group="guidanceType" has-all />
        </el-form-item>
        <el-form-item label="发布状态：">
          <Select v-model="filterForm.status" :options="statusType" has-all />
        </el-form-item>
        <el-form-item label="创建时间">
          <SelectDateRange
            :startTime.sync="filterForm.beginTime"
            :endTime.sync="filterForm.endTime"
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
          <el-button v-if="$hasPower('GuidanceAdd')" plain type="primary" icon="el-icon-plus" @click="handelAdd()"
            >新建</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <Grid ref="table" :request="request" :filter-form.sync="filterForm">
      <vxe-table-column title="标题" field="title"></vxe-table-column>
      <vxe-table-column title="类型" field="typeName"> </vxe-table-column>
      <vxe-table-column title="发布状态" field="status">
        <template #default="{ row }">
          <Status v-model="row.status" :options="statusType" />
        </template>
      </vxe-table-column>
      <vxe-table-column field="createTime" show-overflow title="创建时间">
        <template #default="{ row }">
          {{ dayjs(row.createTime).format('YYYY-MM-DD HH:mm') }}
        </template>
      </vxe-table-column>
      <vxe-table-column field="creatorName" title="创建人"> </vxe-table-column>
      <vxe-table-column title="操作" width="260px" fixed="right">
        <template #default="{ row }">
          <template v-if="[0].includes(row.status)">
            <el-button v-if="$hasPower('GuidanceEdit')" type="text" @click="handelUpdate(row.id)">编辑</el-button>
            <el-button v-if="$hasPower('GuidancePublic')" type="text" @click="handlelPublic(row)">发布</el-button>
          </template>
          <template v-if="[1].includes(row.status)">
            <el-button v-if="$hasPower('HandlelPublic')" type="text" @click="handleCancelPublic(row)"
              >取消发布</el-button
            >
            <el-button v-if="$hasPower('HandleToTop') && row.topFlag === 0" type="text" @click="handleToTop(row)"
              >置顶</el-button
            >
            <el-button v-if="$hasPower('HandleToTop') && row.topFlag === 1" type="text" @click="handleToTop(row)"
              >取消置顶</el-button
            >
          </template>
          <el-button v-if="$hasPower('GuidanceDetail')" type="text" @click="handleDetail(row.id)">查看详情</el-button>
          <el-button v-if="$hasPower('GuidanceDelete')" type="text" @click="handelDelete(row.id)">删除</el-button>
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
          label: '未发布',
          value: 0,
          color: '#BFBFBF'
        },
        {
          label: '已发布',
          value: 1,
          color: '#00A854'
        }
      ],
      request: body => Api.getthePublicGuideList(body)
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
    // 发布
    async handlelPublic(row) {
      const res = await this.$confirm('是否确认发布?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).catch(() => {
        this.$message.info('操作已取消!')
      })
      if (res) {
        await Api.getthePublicGuidePublic({ id: row.id, status: 1 })
        this.$message.success('发布成功!')
        await this.refresh()
      }
    },
    // 取消发布
    async handleCancelPublic(row) {
      const res = await this.$confirm('是否取消发布?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).catch(() => {
        this.$message.info('操作已取消!')
      })
      if (res) {
        await Api.getthePublicGuidePublic({ id: row.id, status: 0 })
        this.$message.success('取消发布成功!')
        await this.refresh()
      }
    },
    // 置顶/取消置顶操作
    async handleToTop(row) {
      await Api.getthePublicGuideSet({ id: row.id, topFlag: +!row.topFlag })
      this.$message.success('操作成功!')
      await this.refresh()
    },
    handelAdd() {
      this.$router.push({
        name: `GuidanceAdd`
      })
    },
    handelUpdate(id) {
      this.$router.push({
        name: `GuidanceEdit`,
        params: { id }
      })
    },
    handleDetail(id) {
      this.$router.push({
        name: `GuidanceDetail`,
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
          Api.getthePublicGuideDelete(id).then(res => {
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
