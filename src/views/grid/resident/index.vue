<template>
  <div class="container">
    <CommunityTree v-model="filterForm.wbsCode" class="scroll-beauty aside"></CommunityTree>
    <div class="main-content">
      <div class="tooltips">
        <el-form inline>
          <el-form-item>
            <el-input v-model="filterForm.keyword" style="width: 200px" placeholder="姓名/身份证号/联系电话"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <Select
              v-model="filterForm.sex"
              has-all
              style="width: 100px"
              :options="sexOptions"
              @change="refresh"
            ></Select>
          </el-form-item>
          <el-form-item label="人口类型">
            <Select
              v-model="filterForm.type"
              has-all
              style="width: 120px"
              :options="residentTypeOptions"
              @change="refresh"
            ></Select>
          </el-form-item>
          <el-form-item label="户籍性质">
            <Select
              v-model="filterForm.status"
              has-all
              style="width: 100px"
              :options="residentStatusOptions"
              @change="refresh"
            ></Select>
          </el-form-item>
          <el-form-item label="微信绑定状态">
            <Select
              v-model="filterForm.bindStatus"
              has-all
              style="width: 100px"
              :options="wxBindStatusOptions"
              @change="refresh"
            ></Select>
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
              <el-button icon="el-icon-refresh-left" @click="$refs.table.reset()">重置</el-button>
            </el-button-group>
          </el-form-item>
          <el-form-item>
            <button-link
              v-if="$hasPower('GridResidentCreate')"
              type="primary"
              plain
              icon="el-icon-plus"
              to="resident/new"
              >新建</button-link
            >
            <el-upload
              v-if="$hasPower('GridResidentImport')"
              ref="upload"
              class="upload-import"
              :show-file-list="false"
              :headers="uploadHeaders"
              :accept="importAccept"
              :before-upload="beforeUpload"
              :action="`${baseUrl}/grid/resident/import`"
              :on-success="changeImport"
            >
              <el-button slot="trigger" type="primary" plain icon="el-icon-bottom-right">导入</el-button>
            </el-upload>
            <el-button
              v-if="$hasPower('GridResidentExport')"
              type="primary"
              plain
              icon="el-icon-top-right"
              class="export"
              @click="handleExport"
              >导出</el-button
            >
            <el-button
              v-if="$hasPower('GridResidentExportTemplate')"
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
      <Grid ref="table" page-use-query :request="request" :filterForm.sync="filterForm">
        <vxe-table-column title="姓名" field="name"></vxe-table-column>
        <vxe-table-column title="性别" width="80" field="sex" formatter="sex"></vxe-table-column>
        <vxe-table-column title="身份证号" field="identityCardNumber"></vxe-table-column>
        <vxe-table-column title="联系电话" width="120" field="phone"></vxe-table-column>
        <vxe-table-column
          title="人口类型"
          field="type"
          width="120"
          :formatter="({ cellValue }) => $getLabel(residentTypeOptions, cellValue)"
        ></vxe-table-column>
        <vxe-table-column
          title="户籍性质"
          width="100"
          field="status"
          :formatter="({ cellValue }) => $getLabel(residentStatusOptions, cellValue)"
        ></vxe-table-column>
        <vxe-table-column title="微信绑定状态" field="bindStatus">
          <template #default="{ row }">
            <span v-if="row.bindStatus" style="color: #ec3f4f">已绑定</span>
            <span v-else style="color: #999">未绑定</span>
          </template>
        </vxe-table-column>
        <vxe-table-column title="创建时间" field="createTime" formatter="ymdhm"></vxe-table-column>
        <vxe-table-column title="创建人" width="100" field="creatorName"></vxe-table-column>
        <vxe-table-column title="操作" width="160" fixed="right">
          <template #default="{ row }">
            <button-link v-if="$hasPower('GridResidentUpdate')" type="text" :to="`resident/${row.id}`"
              >编辑</button-link
            >
            <button-link v-if="$hasPower('GridResidentDetail')" type="text" :to="`resident/${row.id}/detail`"
              >查看详情</button-link
            >
            <el-button v-if="$hasPower('GridResidentRemove')" type="text" @click="handleRemove(row)">删除</el-button>
          </template>
        </vxe-table-column>
      </Grid>
    </div>
    <ImportResultDialog
      v-if="showImportResult"
      :visible.sync="showImportResult"
      :info="importSuccessInfo"
      @submit="() => {}"
    ></ImportResultDialog>
  </div>
</template>

<script>
import { residentStatusOptions, residentTypeOptions, wxBindStatusOptions } from '@/views/grid/lib/options'
import { getResidentList, removeResidentById, exportResident, exportResidentTemplate } from '@/api/grid/resident'
import { sexOptions } from '@/lib/otions'
import { saveAs } from 'file-saver'
import { baseUrl } from '@/plugins/axios'
import ImportResultDialog from './ImportResultDialog'
export default {
  name: 'GridResident',
  components: { ImportResultDialog },
  data() {
    return {
      filterForm: {},
      request: getResidentList,
      sexOptions,
      residentTypeOptions,
      residentStatusOptions,
      baseUrl,
      uploadHeaders: {
        'x-access-token': this.$store.state.user.token
      },
      importAccept: '.xls,.xlsx',
      showImportResult: false, // 导入成功弹窗
      importSuccessInfo: {},
      wxBindStatusOptions
    }
  },
  watch: {
    'filterForm.wbsCode': 'refresh'
  },
  created() {},
  mounted() {},
  methods: {
    async refresh() {
      this.$refs.table.refresh()
    },
    async handleRemove(node) {
      await this.$remove(node)
      await removeResidentById(node.id)
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
          // this.$message.success('导入成功')
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
      const res = await exportResident(this.filterForm)
      saveAs(res.data, '居民信息')
    },
    // 导出模板
    async exportTemplate() {
      const res = await exportResidentTemplate()
      saveAs(res.data, '居民信息模板')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.container {
  display: flex;
}
.upload-import {
  display: inline-flex;
  margin-left: 10px;
}
.export {
  margin-left: 10px;
}
.aside {
  width: 300px;
  border-right: 1px solid #eee;
  margin-right: 15px;
  padding-right: 15px;
  max-height: calc(100vh - 150px);
  overflow: auto;
}
.main-content {
  flex: 1;
  overflow: auto;
}
</style>
