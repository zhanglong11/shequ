<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline>
        <el-form-item>
          <el-input v-model="filterForm.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <Select v-model="filterForm.type" has-all arg-group="ccpStudyType"></Select>
        </el-form-item>
        <el-form-item label="发布状态">
          <Select v-model="filterForm.publishFlag" has-all :options="studyPublishOptions"></Select>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="$refs.table.reset()">重置</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <button-link v-if="$hasPower('CcpStudyCreate')" to="study/new" type="primary" plain icon="el-icon-plus"
            >新建</button-link
          >
        </el-form-item>
      </el-form>
    </div>
    <Grid ref="table" :request="request" :filter-form.sync="filterForm">
      <vxe-table-column title="标题" field="title"></vxe-table-column>
      <vxe-table-column title="类型" width="200" field="typeName"></vxe-table-column>
      <vxe-table-column
        title="发布状态"
        width="100"
        field="publishFlag"
        :formatter="({ cellValue }) => $getLabel(studyPublishOptions, cellValue)"
      ></vxe-table-column>
      <vxe-table-column title="创建时间" width="150" field="createTime" formatter="ymdhm"></vxe-table-column>
      <vxe-table-column title="创建人" width="150" field="creatorName"></vxe-table-column>
      <vxe-table-column title="操作" width="220px">
        <template #default="{ row }">
          <button-link v-if="$hasPower('CcpStudyDetail')" type="text" :to="`study/${row.id}`">编辑</button-link>
          <button-link v-if="$hasPower('CcpStudyDetail')" type="text" :to="`study/${row.id}/detail`"
            >查看详情</button-link
          >
          <el-button v-if="$hasPower('CcpStudyRemove')" type="text" @click="handleRemove(row)">删除</el-button>
        </template>
      </vxe-table-column>
    </Grid>
  </div>
</template>

<script>
import { getPartyStudyList, removePartyStudyById } from '@/api/ccp/study'
import { studyPublishOptions } from '@/views/ccp/lib/options'

export default {
  name: 'CcpStudy',
  components: {},
  data() {
    return {
      activeId: null,
      filterForm: {},
      visible: false,
      request: getPartyStudyList,
      studyPublishOptions
    }
  },
  created() {},
  mounted() {},
  methods: {
    refresh() {
      this.$refs.table.refresh()
    },
    async handleRemove(row) {
      await this.$remove(row)
      await removePartyStudyById(row.id)
      this.$message.success('删除成功')
      this.activeId = null
      this.refresh()
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.container {
}
</style>
