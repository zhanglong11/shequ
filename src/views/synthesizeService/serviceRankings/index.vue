<template>
  <div class="container">
    <div class="main-content">
      <div class="tooltips">
        <el-form inline>
          <!--<el-form-item>
            <el-input v-model="filterForm.type" placeholder="请输入服务类型" />
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
              <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
            </el-button-group>
          </el-form-item>-->
          <el-form-item>
            <el-button v-if="$hasPower('ServiceRankingAdd')" type="primary" plain icon="el-icon-plus" @click="handleAdd"
              >新建</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <vxe-table v-loading="loading" auto-resize :data="tableData" show-header-overflow>
        <vxe-table-column title="排名" field="rank"></vxe-table-column>
        <vxe-table-column title="服务类型" show-overflow field="type"></vxe-table-column>
        <vxe-table-column title="创建时间" show-overflow field="createTime"></vxe-table-column>
        <vxe-table-column title="创建人" show-overflow field="creatorName"></vxe-table-column>
        <vxe-table-column title="操作" width="200">
          <template #default="{ row, rowIndex }">
            <el-button
              v-if="$hasPower('ServiceRankingUp')"
              type="text"
              :disabled="rowIndex === 0"
              @click="handleMoveUp(row)"
              >上移</el-button
            >
            <el-button
              v-if="$hasPower('ServiceRankingDown')"
              type="text"
              :disabled="rowIndex === tableData.length - 1"
              @click="handleMoveDown(row)"
              >下移</el-button
            >
            <el-button v-if="$hasPower('ServiceRankingDelete')" type="danger" @click="handleRemove(row)"
              >删除</el-button
            >
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>

    <!-- 新增服务排行模态框组件 start -->
    <ModalRanking :visible.sync="visible" @refresh="refresh" />
    <!-- 新增服务排行模态框组件 end -->
  </div>
</template>

<script>
import Api from '@/api/synthesizeService'
import ModalRanking from './ModalRanking'
export default {
  components: { ModalRanking },
  data() {
    return {
      filterForm: {
        type: ''
      },
      tableData: [],
      loading: false,
      visible: false
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    // 刷新列表
    refresh() {
      this.loading = true
      Api.getConvenientRankList(this.filterForm).then(res => {
        if (res.data && res.data.records && res.data.records.length) {
          this.tableData = res.data.records
        } else {
          this.tableData = []
        }
        this.loading = false
      })
    },
    // 重置
    reset() {
      this.filterForm.type = ''
      this.refresh()
    },
    // 新建
    handleAdd() {
      if (this.tableData.length === 5) {
        this.$message.error('最多只能新建5条满意度排行')
      } else {
        this.visible = true
      }
    },
    // 移除
    handleRemove(row) {
      this.$confirm('确认删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          Api.deleteConvenientRank([row.id]).then(res => {
            this.$message.success('操作成功')
            this.refresh()
          })
        })
        .catch(() => {})
    },
    // 下移
    handleMoveDown(row) {
      const params = {
        id: row.id,
        rank: row.rank + 1
      }
      Api.editConvenientRank(params).then(res => {
        this.$message.success('操作成功')
        this.refresh()
      })
    },
    // 上移
    handleMoveUp(row) {
      const params = {
        id: row.id,
        rank: row.rank - 1
      }
      Api.editConvenientRank(params).then(res => {
        this.$message.success('操作成功')
        this.refresh()
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
