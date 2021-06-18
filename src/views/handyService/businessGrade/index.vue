<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline>
        <el-form-item label="信用等级">
          <el-input v-model="filterForm.creditLevel" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="评级时间">
          <SelectDateRange
            :startTime.sync="filterForm.gradeTimeFrom"
            :endTime.sync="filterForm.gradeTimeTo"
            type="daterange"
            format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPower('BusinessGradeSet')" type="primary" icon="el-icon-setting" plain @click="handleSet"
            >设置</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <Grid ref="table" :filter-form.sync="filterForm" :request="request">
      <vxe-table-column title="商户名称" show-overflow field="relatedName"></vxe-table-column>
      <vxe-table-column title="信用得分" show-overflow field="score"></vxe-table-column>
      <vxe-table-column title="信用等级" show-overflow field="creditLevel"></vxe-table-column>
      <vxe-table-column title="评级时间" show-overflow field="gradeTime"></vxe-table-column>
      <vxe-table-column title="创建时间" show-overflow field="createTime"></vxe-table-column>
    </Grid>

    <!-- 设置评级模态框组件 start -->
    <ModalSet :visible.sync="visibleSet" :gradeInfo="gradeInfo" @refreshGradeInfo="refreshGradeInfo" />
    <!-- 设置评级模态框组件 end -->
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
        creditLevel: '',
        gradeTimeFrom: undefined,
        gradeTimeTo: undefined,
        module: 1 // 所属模块：1商户、2物业
      },
      request(body) {
        return Api.getMerchantGradeList(body)
      },
      visibleSet: false,
      gradeInfo: {}
    }
  },
  mounted() {},
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
      this.getInitGrade(true)
    },
    // 获取商户评级初始信息
    getInitGrade(type = false) {
      const params = {
        companyId: this.$store.state.user.companyId,
        module: 1 // 所属模块：1商户投诉、2物业投诉
      }
      Api.getInitScoreAndGrade(params).then(res => {
        // console.log(res)
        this.gradeInfo = res.data
        this.visibleSet = type
      })
    },
    // 评级设置成功，需要刷新评级信息
    refreshGradeInfo() {
      this.getInitGrade()
    }
  }
}
</script>

<style lang="less" scoped></style>
