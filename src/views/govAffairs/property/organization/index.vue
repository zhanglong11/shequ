<template>
  <div class="container">
    <div class="no-footer">
      <div class="tooltips">
        <el-form inline>
          <el-form-item>
            <el-input v-model="filterForm.name" placeholder="物业名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="filterForm.keyword" placeholder="物业负责人/联系电话"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
              <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
            </el-button-group>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="$hasPower('PropertyOrganizationAdd')"
              type="primary"
              plain
              icon="el-icon-plus"
              @click="handleAdd"
              >新建</el-button
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
        <vxe-table-column title="物业名称" field="name" width="200"></vxe-table-column>
        <vxe-table-column title="物业负责人" field="director" width="150"></vxe-table-column>
        <vxe-table-column title="联系电话" field="phone" width="150"></vxe-table-column>
        <vxe-table-column title="物业位置" field="address" min-width="150"></vxe-table-column>
        <vxe-table-column title="备注" field="remark" min-width="150"></vxe-table-column>
        <vxe-table-column title="操作" field="opts" width="200" fixed="right">
          <template #default="{ row }">
            <el-button v-if="$hasPower('PropertyOrganizationEdit')" type="primary" @click="handleEdit(row)"
              >编辑</el-button
            >
            <el-button v-if="$hasPower('PropertyOrganizationDetail')" type="primary" @click="handleDetail(row)"
              >查看详情</el-button
            >
            <el-button v-if="$hasPower('PropertyOrganizationDelete')" type="danger" @click="handleDelete(row)"
              >删除</el-button
            >
          </template>
        </vxe-table-column>
      </Grid>
    </div>
  </div>
</template>

<script>
import Api from '../api'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'PropertyOrganization',
  components: {},
  data() {
    // 这里存放数据
    return {
      sortConfig: {
        remote: true
      },
      filterForm: {},
      request: Api.getOrganizationList
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
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
    handleAdd() {
      this.$router.push({ name: 'PropertyOrganizationAdd' })
    },
    handleEdit(row) {
      this.$router.push({
        name: 'PropertyOrganizationEdit',
        params: {
          id: row.id
        }
      })
    },
    handleDetail(row) {
      this.$router.push({
        name: 'PropertyOrganizationDetail',
        params: {
          id: row.id
        }
      })
    },
    // 删除
    async handleDelete(row) {
      await this.$remove(row)
      await Api.deleteOrganizationById([row.id])
      await this.refresh()
      await this.$message.success('删除成功')
    }
  }
}
</script>
<style lang="less" scoped></style>
