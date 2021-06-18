<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline>
        <el-form-item>
          <el-input v-model="filterForm.name" placeholder="组织名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filterForm.keyword" placeholder="负责人/手机号"></el-input>
        </el-form-item>
        <el-form-item label="服务类型：">
          <Select v-model="filterForm.serviceType" arg-group="serviceType" has-all />
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset()">重置</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPower('VoluntaryAdd')" plain type="primary" icon="el-icon-plus" @click="handleAdd()"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <Grid ref="table" :request="request" :filter-form.sync="filterForm">
      <vxe-table-column title="组织名称" field="name"></vxe-table-column>
      <vxe-table-column field="serviceTypeName" title="服务类型"> </vxe-table-column>
      <vxe-table-column field="place" show-overflow title="地点"></vxe-table-column>
      <vxe-table-column field="leader" title="负责人"></vxe-table-column>
      <vxe-table-column field="phone" title="手机号"></vxe-table-column>
      <vxe-table-column field="memberNum" title="成员人数"></vxe-table-column>
      <vxe-table-column field="activityNum" title="发起活动数量"></vxe-table-column>
      <vxe-table-column title="操作" width="260px" fixed="right">
        <template #default="{ row }">
          <el-button v-if="$hasPower('VoluntaryEdit')" type="primary" @click="handleAEdit(row.id)">编辑</el-button>
          <el-button v-if="$hasPower('VoluntaryDetail')" type="primary" @click="handleDetail(row.id)"
            >查看详情</el-button
          >
          <el-button v-if="$hasPower('VoluntaryDelete')" type="danger" @click="handleRemove(row.id)">删除</el-button>
        </template>
      </vxe-table-column>
    </Grid>
  </div>
</template>

<script>
import Api from '../api'

export default {
  name: 'VoluntaryList',
  components: {},
  props: {
    visible: Boolean,
    id: String
  },
  data() {
    return {
      statusList: [],
      type: 0,
      request(body) {
        return Api.getOrganizationList(body)
      },
      filterForm: {
        name: '',
        keyword: '',
        type: 0,
        companyId: this.$store.state.user.companyId
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    search() {
      this.refresh()
    },
    // 重置
    reset() {
      this.$refs.table.reset()
    },
    // 新增
    handleAdd() {
      this.$router.push({
        name: `VoluntaryAdd`
      })
    },
    // 编辑
    handleAEdit(id) {
      this.$router.push({
        name: `VoluntaryEdit`,
        query: { id }
      })
    },
    // 详情
    handleDetail(id) {
      this.$router.push({
        name: 'VoluntaryDetail',
        query: { id }
      })
    },
    // 删除
    async handleRemove(id) {
      this.$confirm('确认删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          Api.getOrganizationDelete([id]).then(res => {
            if (res.code === 200) {
              this.$message.info('删除成功')
              this.refresh()
            } else {
              this.$message.error('未知错误,请重试')
            }
          })
        })
        .catch(() => {})
    },
    refresh() {
      this.$refs.table.refresh()
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
