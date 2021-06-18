<template>
  <div class="container">
    <el-form ref="form" label-width="120px">
      <h3>基本信息</h3>
      <el-form-item label="姓名">
        <span>{{ form.realName }}</span>
      </el-form-item>
      <el-form-item label="身份证">
        <span>{{ form.identityCardNumber }}</span>
      </el-form-item>
      <el-form-item label="手机号">
        <span>{{ form.mobile }}</span>
      </el-form-item>
      <el-form-item label="性别">
        <span>{{ $getLabel(sexOptions, form.sex) }}</span>
      </el-form-item>
      <el-form-item label="籍贯">
        <span>{{ form.nativePlace }}</span>
      </el-form-item>
      <el-form-item label="民族">
        <span>{{ form.nationCode }}</span>
      </el-form-item>
      <el-form-item label="出生年月">
        <span>{{ form.birthday }}</span>
      </el-form-item>
      <el-form-item label="家庭住址">
        <span>{{ form.familyAddress }}</span>
      </el-form-item>
      <el-form-item label="婚姻状况">
        <span>{{ form.maritalStatus }}</span>
      </el-form-item>
      <el-form-item label="学历">
        <span>{{ form.educationCode }}</span>
      </el-form-item>
      <h3>党员信息</h3>
      <el-form-item label="党组织名称">
        <span>{{ form.organizationName }}</span>
      </el-form-item>
      <el-form-item label="状态">
        <span>{{ form.status }}</span>
      </el-form-item>
      <el-form-item label="党内职务">
        <span>{{ form.post }}</span>
      </el-form-item>
      <el-form-item label="入党日期">
        <span>{{ form.toThePartyDate | ymd }}</span>
      </el-form-item>
      <el-form-item label="转正日期">
        <span>{{ form.becomeRegularDate | ymd }}</span>
      </el-form-item>
      <el-form-item label="党龄">
        <span>{{ form.partyStanding }}</span>
      </el-form-item>
      <el-form-item label="组织关系转入自">
        <span>{{ form.relationShiftTo }}</span>
      </el-form-item>
      <el-form-item label="转入日期">
        <span>{{ form.shiftToDate | ymd }}</span>
      </el-form-item>
      <el-form-item label="组织关系转出到">
        <span>{{ form.relationShiftOut }}</span>
      </el-form-item>
      <el-form-item label="转出日期">
        <span>{{ form.shiftOutDate | ymd }}</span>
      </el-form-item>
      <el-form-item label="备注">
        <span>{{ form.remark }}</span>
      </el-form-item>
      <el-form-item label="附件" style="width: 100%">
        <span>{{ form.fileIds }}</span>
      </el-form-item>
      <h3>党建活动积分记录</h3>
      <vxe-table :data="form.voList">
        <vxe-table-column title="任务名称" field="taskName"></vxe-table-column>
        <vxe-table-column title="任务类型" field="taskType"></vxe-table-column>
        <vxe-table-column title="时间" field="createTime"></vxe-table-column>
        <vxe-table-column title="积分值" field="score"></vxe-table-column>
      </vxe-table>
      <h3>社群活动积分记录</h3>
      <vxe-table :data="form.voList">
        <vxe-table-column title="活动名称" field="taskName"></vxe-table-column>
        <vxe-table-column title="活动类别" field="taskType"></vxe-table-column>
        <vxe-table-column title="时间" field="createTime"></vxe-table-column>
        <vxe-table-column title="积分值" field="score"></vxe-table-column>
      </vxe-table>
      <footer-button>
        <el-button type="danger" size="large" @click="handleRemove">删除</el-button>
        <el-button size="large" @click="$back">取消</el-button>
      </footer-button>
    </el-form>
  </div>
</template>

<script>
import { sexOptions } from '@/lib/otions'
import { getPartyMemberManagementById, removePartyMemberManagementById } from '@/api/ccp/member'

export default {
  name: 'CcpMemberEdit',
  data() {
    return {
      id: this.$route.params.id,
      form: {
        voList: []
      },
      sexOptions
    }
  },
  computed: {},
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
    async handleRemove() {
      await this.$remove(this.form)
      await removePartyMemberManagementById(this.form.id)
      this.$message.success('删除成功')
      this.$back()
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.container {
  padding: 20px 50px;
}
.el-form {
  display: flex;
  flex-wrap: wrap;
  .el-form-item {
    width: 33.3%;
    padding-right: 15px;
  }
  .vxe-table {
    margin: 30px auto;
    width: 1200px;
  }
}
</style>
