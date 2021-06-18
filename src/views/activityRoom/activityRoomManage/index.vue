<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline>
        <el-form-item>
          <el-input v-model="filterForm.name" placeholder="活动室名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="refresh()">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPower('AddActivityRoom')" type="primary" icon="el-icon-plus" @click="handleAdd()">
            新建
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <Grid ref="table" :request="request" :filter-form.sync="filterForm">
      <vxe-table-column field="name" title="活动室名称"></vxe-table-column>
      <vxe-table-column field="location" title="活动室位置"></vxe-table-column>
      <vxe-table-column field="openTime" title="活动室开放时间">
        <template #default="{ row }">
          <span v-if="row.openTime.split('-')[0].substring(0, 2) < 10">
            {{ row.openTime.split('-')[0].substring(1, 5) }}
          </span>
          <span v-else>
            {{ _.trimStart(row.openTime.split('-')[0], '0') }}
          </span>
          -
          <span v-if="row.openTime.split('-')[1].substring(0, 2) < 10">
            {{ row.openTime.split('-')[1].substring(1, 5) }}
          </span>
          <span v-else>
            {{ _.trimStart(row.openTime.split('-')[1], '0') }}
          </span>
          <!-- {{ _.trimStart(row.openTime.split('-')[0], '0') + '-' + _.trimStart(row.openTime.split('-')[1], '0') }} -->
        </template>
      </vxe-table-column>
      <vxe-table-column field="appointmentCount" title="可预约人数"></vxe-table-column>
      <vxe-table-column field="remark" title="备注"></vxe-table-column>
      <vxe-table-column field="principal" title="负责人"></vxe-table-column>
      <vxe-table-column field="phone" title="联系电话"></vxe-table-column>
      <vxe-table-column field="status" title="活动室状态">
        <template #default="{ row }">
          <span v-if="row.status === 0">开启中</span>
          <span v-if="row.status === 1">关闭中</span>
          <el-tooltip
            v-if="row.status === 2"
            :content="
              '关闭时间' +
              (row.closeBeginTime.substring(5, 7) < 10
                ? row.closeBeginTime.substring(6, 10)
                : row.closeBeginTime.substring(5, 10)) +
              ' ' +
              (row.closeBeginTime.substring(10, 13) < 10
                ? row.closeBeginTime.substring(12, 16)
                : row.closeBeginTime.substring(10, 16)) +
              ' ~ ' +
              (row.closeEndTime.substring(5, 7) < 10
                ? row.closeEndTime.substring(6, 10)
                : row.closeEndTime.substring(5, 10)) +
              ' ' +
              (row.closeEndTime.substring(10, 13) < 10
                ? row.closeEndTime.substring(12, 16)
                : row.closeEndTime.substring(10, 16))
            "
            placement="top"
          >
            <el-button type="primary">手动关闭</el-button>
          </el-tooltip>
        </template>
      </vxe-table-column>
      <vxe-table-column title="操作" width="160px" fixed="right">
        <template #default="{ row }">
          <el-button v-if="$hasPower('OpenActivityRoom')" type="primary" @click="handleClose(row)">
            {{ row.status !== 2 ? '手动关闭' : '手动开启' }}
          </el-button>
          <el-button v-if="$hasPower('EditActivityRoom')" type="primary" @click="handleAEdit(row)">编辑</el-button>
          <el-button v-if="$hasPower('DeleteActivityRoom')" type="danger" @click="handleRemove(row.id)">删除</el-button>
        </template>
      </vxe-table-column>
    </Grid>
    <ActivityEdit
      v-if="editDialogVisible"
      :info="form"
      :title="editDialogTitle"
      :visible.sync="editDialogVisible"
      @submit="handleSubmit"
    ></ActivityEdit>
    <CloseRoom v-if="closeVisible" :id="roomId" :info="info" :visible.sync="closeVisible"></CloseRoom>
  </div>
</template>

<script>
import { admin } from '@/plugins/axios'
import ActivityEdit from './components/activityEdit'
import CloseRoom from './components/closeRoom'
import { activityRoomApi } from '../api/activityRoom.js'
export default {
  name: 'ActivityRoomManage',
  components: { ActivityEdit, CloseRoom },
  data() {
    return {
      roomId: '',
      filterForm: {},
      form: {},
      info: {},
      activeId: null,
      editDialogTitle: '',
      closeVisible: false,
      editDialogVisible: false,
      request(body) {
        return admin.post('activityRoom/list', body)
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
    // 开启关闭
    async handleClose(row) {
      this.roomId = row.id
      if (row.status === 2) {
        const parpam = { id: row.id, closeBeginTime: '', closeEndTime: '' }
        await activityRoomApi.closeRoom(parpam)
        this.$message.success('开启成功')
        this.refresh()
      } else {
        if (row.closeBeginTime) {
          const startDay = row.closeBeginTime.split(' ')
          const endDay = row.closeEndTime.split(' ')
          const sd = startDay[0]
          const st = startDay[1].substring(0, 5)
          const ed = endDay[0]
          const et = endDay[1].substring(0, 5)
          this.info = { startDay: sd, startTime: st, endDay: ed, endTime: et }
          console.log(this.info)
        } else {
          this.info = {}
        }
        this.closeVisible = true
      }
    },
    // 编辑
    handleAEdit(row) {
      // console.log(row)
      this.editDialogTitle = '编辑'
      this.form = { ...row }
      this.editDialogVisible = true
    },
    // 新曾
    handleAdd() {
      this.editDialogTitle = '新增'
      this.form = { closeWeek: [] }
      this.editDialogVisible = true
    },
    // 刷新
    refresh() {
      this.$refs.table.refresh()
    },
    // 重置
    reset() {
      this.$refs.table.reset()
    },
    // 删除活动
    async handleRemove(id) {
      await this.$confirm('确认删除活动室?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          activityRoomApi.deleteActivityRoom(id).then(res => {
            if (res.code === 200) {
              this.$message.info('删除成功')
              this.refresh()
            } else {
              this.$message.error('未知错误,请重试')
            }
          })
        })
        .catch(() => {})
    },
    // 添加/编辑提交
    async handleSubmit(data) {
      data.id ? await activityRoomApi.updateActivityRoom(data) : await activityRoomApi.addActivityRoom(data)
      this.$message.success('操作成功!')
      this.editDialogVisible = false
      await this.refresh()
    }
  }
}
</script>
