<template>
  <div class="container">
    <div class="main-content">
      <div class="tooltips">
        <el-form inline>
          <el-form-item>
            <el-input v-model="filterForm.type" placeholder="请输入服务类型" />
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
              <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
            </el-button-group>
          </el-form-item>
          <el-form-item>
            <el-button v-if="$hasPower('ServiceTypeAdd')" type="primary" plain icon="el-icon-plus" @click="handleAdd"
              >新建</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <Grid ref="table" :filter-form.sync="filterForm" :request="request">
        <vxe-table-column title="服务类型" field="type" show-overflow></vxe-table-column>
        <vxe-table-column title="当月累计数量(已完成)" field="completed"></vxe-table-column>
        <vxe-table-column title="当月累计数量(处理中)" field="dealing"></vxe-table-column>
        <vxe-table-column title="创建时间" show-overflow field="createTime"></vxe-table-column>
        <vxe-table-column title="创建人" show-overflow field="creatorName"></vxe-table-column>
        <vxe-table-column title="操作" width="140">
          <template #default="{ row }">
            <el-button v-if="$hasPower('ServiceTypeEdit')" type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button v-if="$hasPower('ServiceTypeDelete')" type="danger" @click="handleRemove(row)">删除</el-button>
          </template>
        </vxe-table-column>
      </Grid>
    </div>

    <!-- 综合服务模态框组件 start -->
    <ModalServiceType :visible.sync="visible" :itemInfo="itemInfo" @refresh="refresh" />
    <!-- 综合服务模态框组件 end -->
  </div>
</template>

<script>
import Api from '@/api/synthesizeService'
import ModalServiceType from './ModalServiceType'
export default {
  components: { ModalServiceType },
  data() {
    return {
      filterForm: {
        type: '',
        page: 1,
        rows: 10
      },
      request(body) {
        return Api.getConvenientList(body)
      },
      visible: false,
      itemInfo: {}
    }
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
    // 新建
    handleAdd() {
      this.itemInfo = {}
      this.visible = true
    },
    // 编辑
    handleEdit(row) {
      this.itemInfo = row
      this.visible = true
    },
    // 删除
    handleRemove(row) {
      this.$confirm('确认删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          Api.deleteConvenient([row.id]).then(res => {
            this.$message.success('操作成功')
            this.refresh()
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped></style>
