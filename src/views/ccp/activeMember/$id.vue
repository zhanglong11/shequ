<template>
  <div class="container">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px">
      <h3>基本信息</h3>
      <template v-if="!id">
        <el-form-item label="姓名" prop="realName">
          <AutoCompleteUser v-model="form.realName" @change="handleUserChange"></AutoCompleteUser>
        </el-form-item>
        <el-form-item label="身份证" prop="identityCardNumber">
          <AutoCompleteUser
            v-model="form.identityCardNumber"
            field="identityCardNumber"
            @change="handleUserChange"
          ></AutoCompleteUser>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <AutoCompleteUser v-model="form.mobile" field="mobile" @change="handleUserChange"></AutoCompleteUser>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="form.realName" :disabled="extraInfoDisabled"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="identityCardNumber">
          <el-input v-model="form.identityCardNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" :disabled="extraInfoDisabled"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="性别" prop="sex">
        <Select v-model="form.sex" :disabled="extraInfoDisabled" :options="sexOptions" radio></Select>
      </el-form-item>
      <el-form-item label="籍贯" prop="nativePlace">
        <el-input v-model="form.nativePlace" :disabled="extraInfoDisabled"></el-input>
      </el-form-item>
      <el-form-item label="民族" prop="nationCode">
        <Select v-model="form.nationCode" arg-group="nation" :disabled="extraInfoDisabled"></Select>
      </el-form-item>
      <el-form-item label="出生年月" prop="birthday">
        <el-date-picker
          v-model="form.birthday"
          :disabled="extraInfoDisabled"
          value-format="yyyy-MM-dd 00:00:00"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="家庭住址" prop="familyAddress">
        <el-input v-model="form.familyAddress" :disabled="extraInfoDisabled"></el-input>
      </el-form-item>
      <el-form-item label="婚姻状况" prop="maritalStatus">
        <Select v-model="form.maritalStatus" :options="maritalStatusOptions" :disabled="extraInfoDisabled"></Select>
      </el-form-item>
      <el-form-item label="学历" prop="educationCode">
        <Select v-model="form.educationCode" arg-group="educationCode" :disabled="extraInfoDisabled"></Select>
      </el-form-item>
      <h3>党员信息</h3>
      <el-form-item label="党组织名称" prop="organizationId">
        <SelectCcpDepartment v-model="form.organizationId"></SelectCcpDepartment>
      </el-form-item>
      <el-form-item label="入党申请书提交时间" prop="applyForDate">
        <el-date-picker v-model="form.applyForDate" value-format="yyyy-MM-dd 00:00:00"></el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <Select v-model="form.status" :label.sync="form.statusName" arg-group="ccpActiveMemberStatus"></Select>
      </el-form-item>
      <el-form-item label="变更日期" prop="updateDate">
        <el-date-picker v-model="form.updateDate" value-format="yyyy-MM-dd 00:00:00"></el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="remark" style="width: 100%">
        <el-input v-model="form.remark" type="textarea" :autosize="{ minRows: 3 }"></el-input>
      </el-form-item>
      <el-form-item label="附件" prop="fileIds">
        <Upload v-model="form.fileIds" is-only-button></Upload>
      </el-form-item>
      <h3>状态变更记录</h3>
      <vxe-table :data="form.statusDTOList" style="width: 100%">
        <vxe-table-column title="变更时间" field="createTime"></vxe-table-column>
        <vxe-table-column title="变更前状态" field="beforeStatusName"></vxe-table-column>
        <vxe-table-column title="变更后状态" field="laterStatusName"></vxe-table-column>
        <vxe-table-column title="附件" field="fileIds">
          <template #default="{ row }">
            <span v-if="_.isNil(row.fileIds)">-</span>
            <FileList v-else :ids="row.fileIds"></FileList>
          </template>
        </vxe-table-column>
        <vxe-table-column title="备注" field="remark"></vxe-table-column>
        <vxe-table-column title="操作人" field="creatorName"></vxe-table-column>
      </vxe-table>
      <h3 style="margin-top: 10px">
        发展日志 <el-button type="text" style="float: right" @click="handleEventLogAdd">+ 新增事项</el-button>
      </h3>
      <vxe-table style="width: 100%" :data="form.logList">
        <vxe-table-column title="事项说明" field="explain"></vxe-table-column>
        <vxe-table-column title="事项时间" field="matterDate"></vxe-table-column>
        <vxe-table-column title="附件" field="fileIds">
          <template #default="{ row }">
            <FileList :ids="row.fileIds"></FileList>
          </template>
        </vxe-table-column>
        <vxe-table-column title="操作人" field="creatorName"></vxe-table-column>
        <vxe-table-column title="操作时间" field="createTime"></vxe-table-column>
        <vxe-table-column title="操作">
          <template #default="{ row, rowIndex }">
            <el-button type="text" @click="handleEventLogEdit(row)">编辑</el-button>
            <el-button type="text" @click="form.logList.splice(rowIndex, 1)">删除</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <footer-button>
        <el-button v-if="id && form.statusName === '预备党员'" type="primary" size="large" @click="handleChange"
          >转为正式党员</el-button
        >
        <el-button v-promise-btn size="large" type="primary" @click="submit">{{ !!id ? '保存' : '创建' }}</el-button>
        <el-button size="large" @click="$back">取消</el-button>
      </footer-button>
    </el-form>
    <EventLogEdit
      v-if="eventLogEditDialogVisible"
      :data="activeEventLog"
      :visible.sync="eventLogEditDialogVisible"
      @change="handleEventLogChange"
    ></EventLogEdit>
    <ChangeDialog v-if="changeVisible" :info="form" :visible.sync="changeVisible" @submit="changeSubmit"></ChangeDialog>
  </div>
</template>

<script>
import SelectCcpDepartment from '../components/SelectCcpDepartment'
import anyRule from '@/lib/anyRule'
import { sexOptions, maritalStatusOptions } from '@/lib/otions'
import {
  createPartyActivistManagement,
  getPartyActivistManagementById,
  updatePartyActivistManagement,
  changeActiveStatus
} from '@/api/ccp/activeMember'
import EventLogEdit from './components/EventLogEdit'
import upsertMany from 'upsert-many'
import ChangeDialog from './components/ChangeDialog'

export default {
  name: 'CcpMemberEdit',
  components: { SelectCcpDepartment, EventLogEdit, ChangeDialog },
  data() {
    return {
      id: this.$route.params.id,
      form: {
        birthday: '',
        educationCode: '',
        familyAddress: '',
        fileIds: '',
        identityCardNumber: '',
        maritalStatus: null,
        mobile: '',
        nationCode: '',
        nativePlace: '',
        organizationId: '',
        partyStanding: '',
        post: '',
        realName: '',
        relationShiftOut: '',
        relationShiftTo: '',
        remark: '',
        shiftOutDate: '',
        shiftToDate: '',
        status: '',
        toThePartyDate: '',
        statusName: '',
        logList: []
      },
      sexOptions,
      maritalStatusOptions,
      rules: {
        realName: [{ required: true, message: '必填' }],
        identityCardNumber: [
          { required: true, message: '必填' },
          { pattern: anyRule.identityNumber, message: '不合法' }
        ],
        mobile: [
          /*  { required: true, message: '必填' }, */
          { pattern: anyRule.mobile, message: '不合法' }
        ],
        organizationId: [{ required: true, message: '必填' }],
        status: [{ required: true, message: '必填' }],
        post: [{ required: true, message: '必填' }],
        toThePartyDate: [{ required: true, message: '必填' }],
        becomeRegularDate: [{ required: true, message: '必填' }],
        updateDate: [{ required: true, message: '必填' }]
      },
      matched: false, // 是否从人员库中找到了当前添加的人
      eventLogEditDialogVisible: false,
      activeEventLog: {},
      changeVisible: false
    }
  },
  computed: {
    partyStanding() {
      if (this.form.becomeRegularDate) {
        const { years, months, days } = dayjs.duration(dayjs().diff(this.form.becomeRegularDate)).$d
        return (years ? years + '年' : '') + (months ? months + '个月' : '') + (days ? days + '天' : '')
      } else {
        return 'N/A'
      }
    },
    extraInfoDisabled() {
      return this.matched || this.form.whetherRedact === 0
    }
  },
  created() {
    this.id && this.refresh()
  },
  mounted() {},
  methods: {
    refresh: function () {
      getPartyActivistManagementById(this.id).then(res => {
        res.data.logList = res.data.logList || []
        res.data.voList = res.data.voList || []
        this.form = res.data
      })
    },
    async submit() {
      await this.$refs.form.validate()
      if (!this.id) {
        await createPartyActivistManagement(this.form)
        this.$message.success('创建成功')
      } else {
        await updatePartyActivistManagement(this.form)
        this.$message.success('修改成功')
      }
      this.$back()
    },
    handleUserChange(user) {
      this.matched = true
      this.form = Object.assign(this.form, user)
      this.$forceUpdate()
    },
    handleEventLogAdd() {
      this.activeEventLog = {}
      this.eventLogEditDialogVisible = true
    },
    handleEventLogEdit(row) {
      this.activeEventLog = _.cloneDeep(row)
      this.eventLogEditDialogVisible = true
    },
    handleEventLogChange(row) {
      row.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
      row.creatorName = this.$store.state.user.name
      upsertMany(this.form.logList, [row], '_XID')
    },
    // 转为正式
    handleChange() {
      this.changeVisible = true
    },
    async changeSubmit(data) {
      await changeActiveStatus(data)
      this.changeVisible = false
      this.$back()
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.el-form {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  .el-form-item {
    width: 33.3%;
    padding-right: 15px;
  }
  .el-date-editor {
    width: 100%;
  }
}
</style>
