<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline>
        <el-form-item>
          <el-input v-model="filterForm.operator" placeholder="操作人"></el-input>
        </el-form-item>
        <el-form-item label="操作时间">
          <SelectDateRange :startTime.sync="filterForm.startTime" :endTime.sync="filterForm.endTime" />
        </el-form-item>
        <el-form-item label="功能模块">
          <el-input v-model="filterForm.module" placeholder="请输入功能模块"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="refresh()">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset()">重置</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
    </div>
    <Grid ref="table" :request="request" :filter-form.sync="filterForm">
      <vxe-table-column title="操作人" field="operatorName"></vxe-table-column>
      <vxe-table-column title="操作时间" field="operateTime"></vxe-table-column>
      <vxe-table-column title="功能模块" field="moduleName"></vxe-table-column>
      <vxe-table-column title="操作类型" field="operationName"></vxe-table-column>
      <vxe-table-column title="操作内容" field="operationContent"></vxe-table-column>
      <!-- <vxe-table-column title="备注" field="platform"></vxe-table-column> -->
    </Grid>
  </div>
</template>

<script>
import { admin } from '@/plugins/axios'
export default {
  name: 'HandleLog',
  data() {
    return {
      filterForm: {},
      request(body) {
        return admin.post('log/operation/list', body)
      }
    }
  },
  watch: {
    // 监听书筛选输入框的变化
    filterText(val) {
      this.$refs.table.filter(val)
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 刷新
    refresh() {
      this.$refs.table.refresh()
    },
    // 重置
    reset() {
      this.$refs.table.reset()
    }
  }
}
</script>
