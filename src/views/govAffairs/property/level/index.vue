<template>
  <div class="container">
    <div class="no-footer">
      <div class="tooltips">
        <el-form inline>
          <el-form-item label="信用等级">
            <Select v-model="filterForm.creditLevel" :options="levelList" has-all> </Select>
          </el-form-item>
          <el-form-item label="评级时间">
            <SelectDateRange
              :startTime.sync="filterForm.gradeTimeFrom"
              :endTime.sync="filterForm.gradeTimeTo"
              type="daterange"
              format="yyyy-MM-dd"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
              <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
            </el-button-group>
          </el-form-item>
          <el-form-item>
            <el-button v-if="$hasPower('PropertyLevelSet')" type="primary" plain @click="handleSet">设置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <Grid
        ref="table"
        :sortConfig="sortConfig"
        :request="request"
        :filter-form.sync="filterForm"
        @sort-change="handleSortChange"
      >
        <vxe-table-column title="物业名称" field="relatedName" min-width="250"></vxe-table-column>
        <vxe-table-column title="当前积分" sortable field="score" width="200"></vxe-table-column>
        <vxe-table-column title="信用等级" field="creditLevel" width="250"></vxe-table-column>
        <vxe-table-column title="评级时间" field="gradeTime" width="250"></vxe-table-column>
        <vxe-table-column title="创建时间" field="createTime" width="250"></vxe-table-column>
      </Grid>
    </div>
    <SetLevel v-if="setVisible" :info="listInfo" :visible.sync="setVisible" @submit="handleSetLevelSubmit"></SetLevel>
  </div>
</template>

<script>
import Api from '../api'
import SetLevel from './componnets/SetLevel'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'PropertyLevel',
  components: { SetLevel },
  data() {
    // 这里存放数据
    return {
      sortConfig: {
        remote: true
      },
      listInfo: {},
      levelList: [], // 等级列表
      filterForm: { module: 2 },
      request: Api.getLevelList,
      selectRow: {},
      setVisible: false // 设置
    }
  },
  computed: {
    companyId() {
      return this.$store.state.user.companyId
    }
  },
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    // 物业全部列表
    async getAllLevel(type = false) {
      const res = await Api.getAllLevel({ companyId: this.companyId, module: 2 })
      this.listInfo = res.data || {}
      this.levelList =
        res.data.levels &&
        res.data.levels.map(item => {
          return {
            id: item.name,
            value: item.name,
            label: item.name,
            name: item.name
          }
        })

      this.setVisible = type
    },
    refresh() {
      this.$refs.table.refresh()
    },
    // 重置
    reset() {
      this.$refs.table.reset()
    },
    // 排序改变
    handleSortChange({ order, property }) {
      const isDesc = order === 'desc' ? '-' : ''
      this.filterForm.sort = isDesc + property
      this.refresh()
    },
    // 设置
    handleSet() {
      this.getAllLevel(true)
    },
    async handleSetLevelSubmit(data) {
      const params = {
        ...data,
        module: 2,
        companyId: this.companyId
      }
      await Api.setLevel(params)
      this.$message.success('设置成功')
      this.setVisible = false
      await this.getAllLevel()
      await this.refresh()
    }
  }
}
</script>
<style lang="less" scoped></style>
