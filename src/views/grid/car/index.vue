<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline>
        <el-form-item>
          <el-input v-model="filterForm.keyword" placeholder="车主/企业"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filterForm.licensePlateNumber" placeholder="车牌号"></el-input>
        </el-form-item>
        <el-form-item label="车辆类型">
          <Select v-model="filterForm.type" arg-group="carType" has-all> </Select>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="$refs.table.reset()">重置</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <button-link v-if="$hasPower('GridCarCreate')" to="car/new" type="primary" plain icon="el-icon-plus"
            >新建</button-link
          >
          <el-upload
            v-if="$hasPower('GridCarImport')"
            ref="upload"
            class="upload-import"
            :show-file-list="false"
            :headers="uploadHeaders"
            :accept="importAccept"
            :before-upload="beforeUpload"
            :action="`${baseUrl}/grid/car/import`"
            :on-success="changeImport"
          >
            <el-button slot="trigger" type="primary" plain icon="el-icon-bottom-right">导入</el-button>
          </el-upload>
          <el-button
            v-if="$hasPower('GridCarExport')"
            type="primary"
            plain
            icon="el-icon-top-right"
            class="export"
            @click="handleExport"
            >导出</el-button
          >
          <el-button
            v-if="$hasPower('GridCarExportTemplate')"
            type="primary"
            plain
            icon="el-icon-top-right"
            class="export"
            @click="exportTemplate"
            >导出模板</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <Grid ref="table" :request="request" :filter-form.sync="filterForm">
      <vxe-table-column title="车牌号" field="licensePlateNumber"></vxe-table-column>
      <vxe-table-column
        title="车辆所属"
        field="ownershipFlag"
        :formatter="({ cellValue }) => $getLabel(carBelongType, cellValue)"
      ></vxe-table-column>
      <vxe-table-column title="个人/企业">
        <template #default="{ row }">
          <router-link v-if="row.ownershipFlag === 1" :to="`resident/${row.ownershipDataId}/detail`">
            {{ row.ownershipDataName }}
          </router-link>
          <router-link v-else-if="row.ownershipFlag === 2" :to="`company/${row.ownershipDataId}/detail`">
            {{ row.ownershipDataName }}
          </router-link>
        </template>
      </vxe-table-column>
      <vxe-table-column title="车辆类型" field="typeName"></vxe-table-column>
      <vxe-table-column title="联系电话" width="120" field="mobile"></vxe-table-column>
      <vxe-table-column title="操作" width="160">
        <template #default="{ row }">
          <button-link v-if="$hasPower('GridCarUpdate')" type="text" :to="`car/${row.id}`">编辑</button-link>
          <el-button v-if="$hasPower('GridCarDetail')" type="text" @click="handleViewDetail(row)">查看详情</el-button>
          <el-button v-if="$hasPower('GridCarRemove')" type="text" @click="handleRemove(row)">删除</el-button>
        </template>
      </vxe-table-column>
    </Grid>
    <Detail :id="activeId" :visible.sync="visible"></Detail>
    <ImportResultDialog
      v-if="showImportResult"
      :visible.sync="showImportResult"
      :info="importSuccessInfo"
      @submit="() => {}"
    ></ImportResultDialog>
  </div>
</template>

<script>
import Detail from './components/Detail'
import { getCarList, removeCarById, exportCar, exportCarTemplate } from '@/api/grid/car'
import { carBelongType } from '../lib/options'
import { baseUrl } from '@/plugins/axios'

import { saveAs } from 'file-saver'
import ImportResultDialog from './components/ImportResultDialog'
export default {
  name: 'GridCar',
  components: { Detail, ImportResultDialog },
  data() {
    return {
      filterForm: {},
      request: getCarList,
      visible: false,
      activeId: null,
      carBelongType,
      baseUrl,
      uploadHeaders: {
        'x-access-token': this.$store.state.user.token
      },
      importAccept: '.xls,.xlsx',
      showImportResult: false, // 导入成功弹窗
      importSuccessInfo: {}
    }
  },
  created() {},
  mounted() {},
  methods: {
    refresh() {
      this.$refs.table.refresh()
    },
    handleAdd() {
      this.activeId = null
      this.visible = true
    },
    handleEdit(row) {
      this.activeId = row.id
      this.visible = true
    },
    toggleStatus(row) {},
    handleViewDetail(row) {
      this.activeId = row.id
      this.visible = true
    },
    async handleRemove(row) {
      await this.$remove(row)
      await removeCarById(row.id)
      await this.refresh()
      await this.$message.success('删除成功')
    },
    // 导入前拦截
    beforeUpload(file) {
      const list = this.importAccept.split(',')
      const name = file.name.split('.')
      const status = list.includes('.' + name[name.length - 1])
      if (!status) {
        this.$message.error('只能导入Excel文件')
      }
      return status
    },
    // 导入
    async changeImport(res) {
      try {
        if (res.code === 200) {
          this.showImportResult = true
          this.importSuccessInfo = res.data
        } else {
          this.$message.error(res.message)
        }
      } catch (error) {
        this.$message.error('服务器没有返回任何响应')
      }
    },
    // 导出
    async handleExport() {
      const res = await exportCar(this.filterForm)
      saveAs(res.data, '车辆信息')
    },
    // 导出模板
    async exportTemplate() {
      const res = await exportCarTemplate()
      saveAs(res.data, '车辆信息模板')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.upload-import {
  display: inline-flex;
  margin-left: 10px;
}
</style>
