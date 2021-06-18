<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline>
        <el-form-item>
          <el-input v-model="filterForm.name" placeholder="请输入商户名称" />
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPower('BusinessPointSet')" type="primary" icon="el-icon-setting" plain @click="handleSet"
            >设置</el-button
          >
          <el-button
            v-if="$hasPower('BusinessPointReset')"
            type="primary"
            icon="el-icon-refresh-left"
            plain
            @click="handlePointReset"
            >积分重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <Grid ref="table" :filter-form.sync="filterForm" :request="request">
      <vxe-table-column title="商户名称" show-overflow field="relatedName"></vxe-table-column>
      <vxe-table-column title="法人" show-overflow field="relatedMan"></vxe-table-column>
      <vxe-table-column title="当前积分" field="score" sortable></vxe-table-column>
      <vxe-table-column title="操作" width="120">
        <template #default="{ row }">
          <el-button v-if="$hasPower('BusinessPointDetail')" type="primary" @click="handleDetail(row)"
            >查看详情</el-button
          >
        </template>
      </vxe-table-column>
    </Grid>

    <!-- 设置初始积分值模态框组件 start -->
    <ModalSet :visible.sync="visibleSet" :initScore="initScore" @refreshInitScore="refreshInitScore" />
    <!-- 设置初始积分值模态框组件 end -->
  </div>
</template>

<script>
import Api from '@/api/handyService'
import ModalSet from './ModalSet'
export default {
  components: { ModalSet },
  data() {
    return {
      filterForm: {
        name: ''
      },
      request(body) {
        return Api.getMerchantScoreList(body)
      },
      visibleSet: false,
      initScore: null
    }
  },
  mounted() {
    this.getInitScore()
  },
  // 方法集合
  methods: {
    // 刷新列表
    refresh() {
      this.$refs.table.refresh()
    },
    // 重置
    reset() {
      this.$refs.table.reset()
    },
    // 设置
    handleSet() {
      this.visibleSet = true
    },
    // 获取积分初始值，用来手动把积分重置为初始值
    getInitScore() {
      const params = {
        companyId: this.$store.state.user.companyId,
        module: 1 // 所属模块：1商户投诉、2物业投诉
      }
      Api.getInitScoreAndGrade(params).then(res => {
        // console.log(res)
        this.initScore = res.data.initScore
      })
    },
    // 积分设置成功后，需要刷新积分初始值
    refreshInitScore() {
      this.getInitScore()
    },
    // 积分重置
    handlePointReset() {
      this.$confirm('是否确定重置积分？重置后，积分将为初始积分值', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // console.log('确定')
          if (this.initScore >= 0) {
            const params = {
              companyId: this.$store.state.user.companyId,
              initScore: this.initScore,
              module: 1 // 所属模块：1商户投诉、2物业投诉
            }
            Api.resetMerchantScore(params).then(res => {
              this.$message.success('操作成功')
              this.refresh()
            })
          }
        })
        .catch(() => {
          // console.log('取消')
        })
    },
    // 查看详情
    handleDetail(row) {
      this.$router.push({ name: 'BusinessPointDetail', params: { id: row.id } })
    }
  }
}
</script>

<style lang="less" scoped></style>
