<template>
  <div class="no-footer">
    <div class="tooltips">
      <el-form inline>
        <el-form-item>
          <el-input v-model="filterForm.title" placeholder="公告标题"></el-input>
        </el-form-item>
        <el-form-item label="公告类型">
          <Select v-model="filterForm.type" :arg-group="noticeType" has-all> </Select>
        </el-form-item>
        <el-form-item label="发布状态">
          <Select v-model="filterForm.status" :options="noticePublicStatusList" has-all> </Select>
        </el-form-item>
        <el-form-item label="创建时间">
          <SelectDateRange
            :startTime.sync="filterForm.beginTime"
            :endTime.sync="filterForm.endTime"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
            <el-button v-if="hasReset" icon="el-icon-refresh-left" @click="reset">重置</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-button v-if="hasAdd" type="primary" plain icon="el-icon-plus" @click="handleAdd">新建公告</el-button>
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
      <vxe-table-column title="公告标题" field="title" min-width="200"></vxe-table-column>
      <vxe-table-column title="公告类型" field="typeName" width="120"></vxe-table-column>
      <vxe-table-column title="公告标签" field="label" min-width="150">
        <template #default="{ row }">
          <div v-if="row.label" class="tag-wrap">
            <el-tag v-for="item of row.label.split(',')" :key="item" size="mini">{{ item }}</el-tag>
          </div>
          <div v-else>-</div>
        </template>
      </vxe-table-column>
      <vxe-table-column
        :title="model === '智慧党建' ? '发布党组织' : '发布部门'"
        field="parentName"
        width="150"
      ></vxe-table-column>
      <vxe-table-column title="发布状态" field="status" width="120">
        <template #default="{ row }">
          <span class="status" :class="'status' + row.status">{{ $getLabel(noticePublicStatusList, row.status) }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column title="创建时间" field="createTime" width="180" formatter="ymdhms"></vxe-table-column>
      <vxe-table-column title="创建人" field="creatorName" width="150"></vxe-table-column>
      <vxe-table-column title="操作" field="opts" width="280" fixed="right">
        <template #default="{ row }">
          <template v-if="[0, 3].includes(row.status)">
            <el-button v-if="hasEdit" type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button v-if="hasSubmitCheck" type="text" @click="handleSubmitCheck(row)">提交核对</el-button>
          </template>
          <el-button v-if="hasCancelPublic && row.status === 2" type="text" @click="handleCancelPublic(row)"
            >取消发布</el-button
          >
          <el-button v-if="hasToTopSet && row.topFlag === 0" type="text" @click="handleToTop(row)">置顶</el-button>
          <el-button v-if="hasToTopSet && row.topFlag === 1" type="text" @click="handleToTop(row)">取消置顶</el-button>
          <el-button v-if="hasCheck" type="text" @click="handleDetail(row)">查看详情</el-button>
          <template v-if="[0, 2, 3].includes(row.status)">
            <el-button v-if="hasDelete" type="text" @click="handleDelete(row)">删除</el-button>
          </template>
        </template>
      </vxe-table-column>
    </Grid>
  </div>
</template>

<script>
import Api from '../../api'
import { noticePublicStatusList } from '../../lib'
export default {
  name: 'CommonNotice',
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
    },
    // 提交核对
    hasSubmitCheck: {
      type: Boolean,
      default: true
    },
    // 置顶/取消置顶
    hasToTopSet: {
      type: Boolean,
      default: true
    },
    // 取消发布
    hasCancelPublic: {
      type: Boolean,
      default: true
    },
    /* 公告类型 */
    noticeType: {
      type: String,
      default: 'notificationType'
    }
  },
  data() {
    return {
      noticePublicStatusList,
      sortConfig: {
        remote: true
      },
      filterForm: {
        parentType: this.$getModelType(this.model)
      },
      request: Api.notice.getList
    }
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
    // 提交核对
    async handleSubmitCheck(row) {
      const res = await this.$confirm('是否确认提交核对?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message.info('操作已取消!')
      })
      if (res) {
        await Api.notice.toSubmitCheck({ id: row.id, status: 1 })
        this.$message.success('提交核对成功!')
        await this.refresh()
      }
    },
    // 取消发布
    async handleCancelPublic(row) {
      await Api.notice.cancelPublic({ id: row.id, status: 0 })
      this.$message.success('取消发布成功!')
      await this.refresh()
    },
    // 置顶/取消置顶操作
    async handleToTop(row) {
      await Api.notice.changeTopStatus({ id: row.id, topFlag: +!row.topFlag })
      this.$message.success('操作成功!')
      await this.refresh()
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
        this.$message.info('操作已取消!')
      })
      if (res) {
        await Api.notice.deleteById(row.id)
        this.$message.success('删除成功!')
        await this.refresh()
      }
    }
  }
}
</script>

<style scoped lang="less">
.tag-wrap {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  /deep/ .el-tag {
    margin: 5px;
  }
}
.status {
  position: relative;
  &.status0 {
    &:before {
      position: absolute;
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #bfbfbf;
      top: 50%;
      left: -10px;
      transform: translateY(-50%);
    }
  }
  &.status1 {
    &:before {
      position: absolute;
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #0e77d1;
      top: 50%;
      left: -10px;
      transform: translateY(-50%);
    }
  }
  &.status2 {
    &:before {
      position: absolute;
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #00a854;
      top: 50%;
      left: -10px;
      transform: translateY(-50%);
    }
  }
  &.status3 {
    &:before {
      position: absolute;
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #f00;
      top: 50%;
      left: -10px;
      transform: translateY(-50%);
    }
  }
}
</style>
