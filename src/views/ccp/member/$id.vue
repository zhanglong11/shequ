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
      <el-form-item label="状态" prop="status">
        <Select v-model="form.status" arg-group="ccpMemberStatus"></Select>
      </el-form-item>
      <el-form-item label="党内职务" prop="post">
        <Select v-model="form.post" arg-group="ccpRole"></Select>
      </el-form-item>
      <el-form-item label="入党日期" prop="toThePartyDate">
        <el-date-picker v-model="form.toThePartyDate" value-format="yyyy-MM-dd 00:00:00"></el-date-picker>
      </el-form-item>
      <el-form-item label="转正日期" prop="becomeRegularDate">
        <el-date-picker v-model="form.becomeRegularDate" value-format="yyyy-MM-dd 00:00:00"></el-date-picker>
      </el-form-item>
      <el-form-item label="党龄" prop="partyStanding">
        <el-input disabled :value="partyStanding"></el-input>
      </el-form-item>
      <el-form-item label="流动状态" prop="flowStatus">
        <Select v-model="form.flowStatus" :label.sync="form.flowStatusName" arg-group="flowStatus"></Select>
      </el-form-item>
      <el-form-item
        v-if="form.flowStatusName === '流入'"
        key="in"
        label="流入地"
        prop="flowPlace"
        :rules="[{ required: true, message: '必填' }]"
      >
        <el-input v-model="form.flowPlace"></el-input>
      </el-form-item>
      <el-form-item
        v-else-if="form.flowStatusName === '流出'"
        key="out"
        label="流出地"
        prop="flowPlace"
        :rules="[{ required: true, message: '必填' }]"
      >
        <el-input v-model="form.flowPlace"></el-input>
      </el-form-item>
      <el-form-item v-else></el-form-item>
      <el-form-item label="入党申请书提交时间" prop="applyForDate">
        <el-date-picker v-model="form.applyForDate" value-format="yyyy-MM-dd 00:00:00"></el-date-picker>
      </el-form-item>
      <el-form-item label="组织关系转入自" prop="relationShiftTo">
        <el-input v-model="form.relationShiftTo"></el-input>
      </el-form-item>
      <el-form-item label="转入日期" prop="shiftToDate">
        <el-date-picker v-model="form.shiftToDate" value-format="yyyy-MM-dd 00:00:00"></el-date-picker>
      </el-form-item>
      <el-form-item></el-form-item>
      <el-form-item label="组织关系转出到" prop="relationShiftOut">
        <el-input v-model="form.relationShiftOut"></el-input>
      </el-form-item>
      <el-form-item label="转出日期" prop="shiftOutDate">
        <el-date-picker v-model="form.shiftOutDate" value-format="yyyy-MM-dd 00:00:00"></el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="remark" style="width: 100%">
        <el-input v-model="form.remark" type="textarea" :autosize="{ minRows: 3 }"></el-input>
      </el-form-item>
      <el-form-item label="附件" prop="fileIds">
        <Upload v-model="form.fileIds" is-only-button></Upload>
      </el-form-item>
      <footer-button>
        <el-button v-promise-btn size="large" type="primary" @click="submit">{{ !!id ? '保存' : '创建' }}</el-button>
        <el-button size="large" @click="$back">取消</el-button>
      </footer-button>
    </el-form>
  </div>
</template>

<script>
import SelectCcpDepartment from '../components/SelectCcpDepartment'
import anyRule from '@/lib/anyRule'
import {
  createPartyMemberManagement,
  getPartyMemberManagementById,
  updatePartyMemberManagement
} from '@/api/ccp/member'
import { maritalStatusOptions, sexOptions } from '@/lib/otions'

export default {
  name: 'CcpMemberEdit',
  components: { SelectCcpDepartment },
  data() {
    return {
      id: this.$route.params.id,
      maritalStatusOptions,
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
        toThePartyDate: ''
      },
      sexOptions,
      rules: {
        realName: [{ required: true, message: '必填' }],
        identityCardNumber: [
          { required: true, message: '必填' },
          { pattern: anyRule.identityNumber, message: '不合法' }
        ],
        mobile: [{ pattern: anyRule.mobile, message: '不合法' }],
        organizationId: [{ required: true, message: '必填' }],
        status: [{ required: true, message: '必填' }],
        post: [{ required: true, message: '必填' }],
        toThePartyDate: [{ required: true, message: '必填' }],
        becomeRegularDate: [{ required: true, message: '必填' }],
        flowPlace: [{ required: true, message: '必填' }],
        flowStatus: [{ required: true, message: '必填' }]
      },
      matched: false // 是否从人员库中找到了当前添加的人
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
    refresh() {
      getPartyMemberManagementById(this.id).then(res => {
        this.form = res.data
      })
    },
    async submit() {
      console.log(this.form)
      await this.$refs.form.validate()
      if (!this.id) {
        await createPartyMemberManagement(this.form)
        this.$message.success('创建成功')
      } else {
        await updatePartyMemberManagement(this.form)
        this.$message.success('修改成功')
      }
      this.$back()
    },
    handleUserChange(user) {
      console.log(user)
      this.matched = true
      this.$forceUpdate()
      this.form = Object.assign(this.form, user)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.el-form {
  display: flex;
  flex-wrap: wrap;
  .el-form-item {
    width: 33.3%;
    padding-right: 15px;
  }
  .el-date-editor {
    width: 100%;
  }
}
</style>
