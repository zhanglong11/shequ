<template>
  <div class="no-footer">
    <div class="tooltips">
      <el-form inline>
        <el-form-item>
          <el-input v-model="filterForm.keyword" style="width: 250px" placeholder="姓名/身份证/联系电话"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <Select v-model="filterForm.sex" :options="sexList" has-all> </Select>
        </el-form-item>
        <el-form-item label="人口类别">
          <Select v-model="filterForm.personType" :argGroup="filterForm.personAttribution + '_personType'" has-all>
          </Select>
        </el-form-item>
        <el-form-item label="人口类型">
          <Select v-model="filterForm.residentType" :options="residentType" has-all> </Select>
        </el-form-item>
        <el-form-item label="关注级别">
          <Select v-model="filterForm.attentionLevel" argGroup="attentionLevel"> </Select>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
            <el-button v-if="hasReset" icon="el-icon-refresh-left" @click="reset">重置</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-button v-if="hasAdd" type="primary" plain icon="el-icon-plus" @click="handleAdd">新建</el-button>
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
      <vxe-table-column title="姓名" field="name" width="150"></vxe-table-column>
      <vxe-table-column title="性别" field="sex" width="100" formatter="sex"></vxe-table-column>
      <vxe-table-column title="身份证号" field="identityCardNumber" width="180"></vxe-table-column>
      <vxe-table-column title="联系电话" field="phone" width="130"></vxe-table-column>
      <vxe-table-column title="人口类别" field="personTypeName" min-width="150"></vxe-table-column>
      <vxe-table-column title="人口类型" field="residentType" min-width="150">
        <template #default="{ row }"> {{ $getLabel(residentType, +row.residentType) }}</template>
      </vxe-table-column>
      <vxe-table-column title="关注级别" field="attentionLevelName" min-width="180"></vxe-table-column>
      <vxe-table-column title="创建时间" field="createTime" sortable width="180" formatter="ymdhms"></vxe-table-column>
      <vxe-table-column title="创建人" field="creatorName" width="150"></vxe-table-column>
      <vxe-table-column title="操作" field="opts" width="200" fixed="right">
        <template #default="{ row }">
          <el-button v-if="hasEdit" type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button v-if="hasCheck" type="primary" @click="handleDetail(row)">查看详情</el-button>
          <el-button v-if="hasDelete" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </vxe-table-column>
    </Grid>
  </div>
</template>

<script>
import Api from '../../api'
import { sexList, maritalList, residentType, personStatus } from '../../lib'
import router from '@/router'
export default {
  name: router.history.current.name || 'CommonPerson',
  props: {
    /* 模块 */
    model: {
      type: String,
      default: ''
    },
    hasReset: {
      type: Boolean,
      default: true
    },
    hasAdd: {
      type: Boolean,
      default: true
    },
    addRouterName: {
      type: String,
      default: ''
    },
    editRouterName: {
      type: String,
      default: ''
    },
    detailRouterName: {
      type: String,
      default: ''
    },
    hasEdit: {
      type: Boolean,
      default: true
    },
    hasCheck: {
      type: Boolean,
      default: true
    },
    hasDelete: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      sexList,
      maritalList,
      residentType,
      personStatus,
      sortConfig: {
        remote: true
      },
      filterForm: { personAttribution: this.$getModelType(this.model) },
      request(body) {
        return Api.person.getList(body)
      }
    }
  },
  watch: {},
  mounted() {
    this.refresh()
  },
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
    // 新建
    handleAdd() {
      this.$router.push({ name: this.addRouterName })
    },
    handleEdit(row) {
      this.$router.push({
        name: this.editRouterName,
        params: {
          id: row.id
        }
      })
    },
    handleDetail(row) {
      this.$router.push({
        name: this.detailRouterName,
        params: {
          id: row.id
        }
      })
    },
    // 删除
    async handleDelete(row) {
      const res = await this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message.info('操作已取消')
      })
      if (res) {
        await Api.person.deleteById(row.id)
        await this.$message.success('删除成功')
        await this.refresh()
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
