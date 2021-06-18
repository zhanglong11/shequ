<template>
  <div class="container">
    <div class="no-footer">
      <div class="tooltips">
        <el-form inline>
          <el-form-item label="物业名称">
            <Select v-model="filterForm.id" :options="organizationList" has-all> </Select>
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
              <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
            </el-button-group>
          </el-form-item>
          <el-form-item>
            <el-button v-if="$hasPower('PropertyIntegralSet')" type="primary" plain @click="handleSet">设置</el-button>
            <el-button v-if="$hasPower('PropertyIntegralReset')" type="primary" plain @click="handleReset"
              >积分重置</el-button
            >
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
        <vxe-table-column title="物业名称" field="relatedName" min-width="200"></vxe-table-column>
        <vxe-table-column title="负责人" field="relatedMan" min-width="180"></vxe-table-column>
        <vxe-table-column title="当前积分" sortable field="score" width="150"></vxe-table-column>
        <vxe-table-column title="操作" field="opts" width="200" fixed="right">
          <template #default="{ row }">
            <el-button v-if="$hasPower('PropertyIntegralDetail')" type="primary" @click="handleDetail(row)"
              >查看详情</el-button
            >
          </template>
        </vxe-table-column>
      </Grid>
    </div>
    <SetIntegral v-if="setVisible" :visible.sync="setVisible" @submit="handleSetIntegralSubmit"></SetIntegral>
  </div>
</template>

<script>
import Api from '../api'
import SetIntegral from './componnets/SetIntegral'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'PropertyIntegral',
  components: { SetIntegral },
  data() {
    // 这里存放数据
    return {
      sortConfig: {
        remote: true
      },
      organizationList: [], // 物业列表
      filterForm: {
        module: 2 // 1,商户,2,物业
      },
      request: Api.getIntegralList,
      selectRow: {},
      setVisible: false // 设置
    }
  },
  computed: {
    companyId() {
      return this.$store.state.user.companyId
    }
  },
  created() {
    this.getOrganizationList()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    // 物业全部列表
    async getOrganizationList() {
      const res = await Api.getOrganizationListAll({})
      this.organizationList =
        res.data &&
        res.data.map(item => {
          return {
            id: item.id,
            value: item.id,
            label: item.name,
            name: item.name
          }
        })
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
      this.setVisible = true
    },
    async handleSetIntegralSubmit(data) {
      await Api.setIntegral({ ...data, companyId: this.companyId, module: 2 })
      this.$message.success('设置成功')
      this.setVisible = false
      await this.refresh()
    },
    // 积分重置
    async handleReset() {
      const res = await this.$confirm(
        `<p>是否确定重置积分？</p>
        <p>重置后，积分将为初始积分值</p>`,
        '信息',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(() => {
        this.$message.info('操作已取消')
      })
      if (res) {
        await Api.resetIntegral({ companyId: this.companyId, module: 2 })
        this.$message.success('重置成功!')
        await this.refresh()
      }
    },
    handleDetail(row) {
      this.$router.push({
        name: 'PropertyIntegralDetail',
        params: {
          id: row.id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
