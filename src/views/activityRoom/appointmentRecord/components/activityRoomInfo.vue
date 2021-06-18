<!--
 * @Description: 活动室详情
 * @Version: 1.0
 * @Autor: zongguosheng
 * @Date: 2021-04-14 16:39:12
 * @LastEditors: zongguosheng
 * @LastEditTime: 2021-05-08 11:43:38
-->
<template>
  <el-dialog width="900px" :title="title" class="beauty" :visible="visible" @close="close">
    <div class="tooltips">
      <el-form inline>
        <el-form-item>
          <el-input v-model="filterForm.realName" placeholder="预约人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filterForm.roomName" placeholder="活动室名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="refresh()">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
    </div>
    <Grid v-if="visible" ref="table" :request="request" :filter-form.sync="filterForm">
      <!-- <vxe-table :data="tableData"> -->
      <vxe-table-column title="预约人" field="realName"></vxe-table-column>
      <vxe-table-column title="预约时间" field="appointmentTime">
        <template #default="{ row }">
          <span v-for="item in row.appointmentTime.split(',')" :key="item.index" style="display: block">
            {{ item }}
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column title="预约活动室" field="roomName"></vxe-table-column>
      <vxe-table-column title="预约人数" field="appointmentCount"></vxe-table-column>
      <vxe-table-column title="预约说明" field="appointmentExplain"></vxe-table-column>
      <vxe-table-column title="提交时间" field="appointmentYears"></vxe-table-column>
      <vxe-table-column title="取消预约" field="status">
        <template #default="{ row }">
          {{ row.status == 1 ? '是' : '否' }}
        </template>
      </vxe-table-column>
      <!-- </vxe-table> -->
    </Grid>
  </el-dialog>
</template>

<script>
import { admin } from '@/plugins/axios'
export default {
  name: 'ActivityRoomInfo',
  props: {
    appointmentyears: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      filterForm: {},
      form: {},
      request(body) {
        return admin.post('activityRoom/recordList', body, { appointmentYears: this.appointmentYears })
      },
      tableData: []
    }
  },
  watch: {
    visible(val) {
      if (this.appointmentyears) {
        this.filterForm.appointmentYears = this.appointmentyears
      }
    }
  },
  methods: {
    // 刷新
    refresh() {
      this.$refs.table.refresh()
    },
    // 重置
    reset() {
      this.$refs.table.reset()
    },
    close() {
      // this.$refs.form.resetFields()
      this.$emit('update:visible', false)
    }
  }
}
</script>
