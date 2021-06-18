<template>
  <div class="container">
    <el-calendar>
      <template slot="dateCell" slot-scope="{ data }">
        {{ data.day.split('-').slice(2).join('-') }}
        <div v-for="item in tableData" :key="item.index" class="cell">
          <div
            v-if="data.day == item.appointmentYears && $hasPower('ActivityRoomDetail')"
            class="cellinfo"
            @click="showInfo(data.day)"
          >
            <el-tag>有活动</el-tag>
          </div>
        </div>
      </template>
    </el-calendar>
    <ActivityRoomInfo :appointmentyears="appointmentYears" :title="editDialogTitle" :visible.sync="editDialogVisible">
    </ActivityRoomInfo>
  </div>
</template>

<script>
import ActivityRoomInfo from './components/activityRoomInfo'
import { activityRoomApi } from '../api/activityRoom.js'
export default {
  name: 'ActivityRoomManage',
  components: { ActivityRoomInfo },
  data() {
    return {
      filterForm: {},
      appointmentYears: '',
      tableData: [],
      editDialogTitle: '',
      editDialogVisible: false
    }
  },
  watch: {
    // 监听书筛选输入框的变化
    filterText(val) {
      this.$refs.table.filter(val)
    }
  },
  created() {},
  mounted() {
    this.getrecordListDay()
  },
  methods: {
    // 获取详情
    async showInfo(appointmentYears) {
      this.editDialogTitle = '预约详情'
      this.editDialogVisible = true
      this.appointmentYears = appointmentYears
    },
    // 获取预约记录
    async getrecordListDay() {
      const parpam = { yearAndMonth: '' }
      const res = await activityRoomApi.getrecordListDay(parpam)
      this.tableData = res.data
      console.log(this.tableData)
    },
    // 刷新
    refresh() {
      this.$refs.table.refresh()
    },
    // 删除活动
    async handleRemove(row) {}
  }
}
</script>

<style lang="less" scoped>
.cell {
  .cellinfo {
    display: inline-block;
    margin: 5px;
    padding: 2px 5px;
    border-radius: 5px;
  }
}
/deep/ .current {
  height: 150px;
  width: 150px;
  position: relative;
  overflow: hidden;
  .el-calendar-day {
    height: 150px;
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-y: auto;
  }
}
</style>
