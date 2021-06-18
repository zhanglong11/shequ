<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline>
        <el-form-item>
          <el-input v-model="filterForm.keyword" placeholder="姓名/用户名"></el-input>
        </el-form-item>
        <el-form-item label="登录时间">
          <SelectDateRange :startTime.sync="filterForm.startTime" :endTime.sync="filterForm.endTime" />
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
      <vxe-table-column title="姓名" field="realName">
        <template #default="{ row }">
          <span :class="row.exceptionFlag == false ? 'red' : ' '">
            {{ row.exceptionFlag == false ? row.realName : row.realName }}
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column title="用户名" field="loginName">
        <template #default="{ row }">
          <span :class="row.exceptionFlag == false ? 'red' : ' '">
            {{ row.exceptionFlag == false ? row.loginName : row.loginName }}
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column title="登录地点" field="loginLocation">
        <template #default="{ row }">
          <span :class="row.exceptionFlag == false ? 'red' : ' '">
            {{ row.exceptionFlag == false ? row.loginLocation : row.loginLocation }}
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column title="登录时间" field="loginTime">
        <template #default="{ row }">
          <span :class="row.exceptionFlag == false ? 'red' : ' '">
            {{ row.exceptionFlag == false ? row.loginTime : row.loginTime }}
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column title="下线时间" field="loginOutTime">
        <template #default="{ row }">
          <span :class="row.exceptionFlag == false ? 'red' : ' '">
            {{ row.loginOutTime == null ? 'online' : row.loginOutTime }}
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column title="内网IP" field="lanIp">
        <template #default="{ row }">
          <span :class="row.exceptionFlag == false ? 'red' : ' '">
            {{ row.exceptionFlag == false ? row.lanIp : row.lanIp }}
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column title="IP" field="remoteIp">
        <template #default="{ row }">
          <span :class="row.exceptionFlag == false ? 'red' : ' '">
            {{ row.exceptionFlag == false ? row.remoteIp : row.remoteIp }}
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column title="状态" field="exceptionFlag">
        <template #default="{ row }">
          <span :class="row.exceptionFlag == false ? 'red' : ' '">
            {{ row.exceptionFlag == false ? '异地登录' : '正常登录' }}
          </span>
        </template>
      </vxe-table-column>
    </Grid>
  </div>
</template>

<script>
import { admin } from '@/plugins/axios'
export default {
  name: 'LoginLog',
  data() {
    return {
      filterForm: {},
      request(body) {
        console.log(body)
        return admin.post('log/login/list', body)
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

<style lang="less" scoped>
.red {
  color: #ec3f4f;
}
</style>
