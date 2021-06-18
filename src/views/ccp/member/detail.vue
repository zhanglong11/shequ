<template>
  <div class="container">
    <el-form ref="form" label-width="150px">
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
        <span>{{ form.nation }}</span>
      </el-form-item>
      <el-form-item label="出生年月">
        <span>{{ form.birthday | ymd }}</span>
      </el-form-item>
      <el-form-item label="家庭住址">
        <span>{{ form.familyAddress }}</span>
      </el-form-item>
      <el-form-item label="婚姻状况">
        <span>{{ $getLabel(maritalStatusOptions, form.maritalStatus) }}</span>
      </el-form-item>
      <el-form-item label="学历">
        <span>{{ form.education }}</span>
      </el-form-item>
      <h3>党员信息</h3>
      <el-form-item label="党组织名称">
        <span>{{ form.organizationName }}</span>
      </el-form-item>
      <el-form-item label="状态">
        <span>{{ form.statusName }}</span>
      </el-form-item>
      <el-form-item label="党内职务">
        <span>{{ form.postName }}</span>
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
      <el-form-item label="流动状态">
        <span>{{ form.flowStatusName }}</span>
      </el-form-item>
      <el-form-item v-if="form.flowStatusName === '流出'" label="流出地">
        <span>{{ form.flowPlace }}</span>
      </el-form-item>
      <el-form-item v-else-if="form.flowStatusName === '流入'" label="流入地">
        <span>{{ form.flowPlace }}</span>
      </el-form-item>
      <el-form-item v-else> </el-form-item>
      <el-form-item label="入党申请书提交时间">
        <span>{{ form.applyForDate | ymd }}</span>
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
        <FileList :ids="form.fileIds"></FileList>
      </el-form-item>
      <h3>状态变更记录</h3>
      <vxe-table :data="form.statusDTOList">
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
      <div class="view-flow">
        <div
          v-for="(item, index) of flowInfoArr"
          :key="'fia' + index"
          class="item"
          :class="{ active: index <= activeFlowIndex }"
        >
          <div class="circle">{{ item.name }}</div>
          <div v-if="item.createTime" class="time">变更日期:{{ item.createTime | ymd }}</div>
        </div>
      </div>
      <h3 style="margin-top: 10px">发展日志</h3>
      <vxe-table :data="form.logList">
        <vxe-table-column title="事项说明" field="explain"></vxe-table-column>
        <vxe-table-column title="事项时间" field="matterDate"></vxe-table-column>
        <vxe-table-column title="操作人" field="creatorName"></vxe-table-column>
        <vxe-table-column title="操作时间" field="createTime"></vxe-table-column>
      </vxe-table>
      <h3 style="margin-top: 15px">党建活动积分记录</h3>
      <CcpRankList :identityCardNumber="form.identityCardNumber"></CcpRankList>
      <h3 style="margin-top: 15px">社群活动积分记录</h3>
      <CommunityRankList :identityCardNumber="form.identityCardNumber"></CommunityRankList>
      <h3 style="margin-top: 15px">其它积分记录</h3>
      <OtherRankList :identityCardNumber="form.identityCardNumber"></OtherRankList>
      <footer-button>
        <el-button v-if="showDelete" type="danger" size="large" @click="handleRemove">删除</el-button>
        <el-button size="large" @click="$back">返回</el-button>
      </footer-button>
    </el-form>
  </div>
</template>

<script>
import { maritalStatusOptions, sexOptions } from '@/lib/otions'
import { getPartyMemberManagementById, removePartyMemberManagementById } from '@/api/ccp/member'

export default {
  name: 'CcpMemberDetail',
  data() {
    return {
      id: this.$route.params.id,
      form: {},
      showDelete: this.$route.query.showDelete === 'true',
      sexOptions,
      maritalStatusOptions,
      flowInfoArr: [
        { name: '普通居民' },
        { name: '申请入党' },
        { name: '积极分子' },
        { name: '发展对象' },
        { name: '预备党员' },
        { name: '正式党员' }
      ],
      activeFlowIndex: 0
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
        res.data &&
          res.data.statusDTOList.forEach(item => {
            this.flowInfoArr.forEach(i => {
              if (i.name === item.laterStatusName) {
                i.createTime = item.createTime
              }
            })
          })
        this.flowInfoArr.forEach((item, index) => {
          if (item.name === res.data.statusName) {
            this.activeFlowIndex = index
          }
        })
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
  .vxe-table,
  .grid {
    margin: 30px auto;
    width: 1200px;
  }
}
.view-flow {
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .item {
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .circle {
      width: 140px;
      height: 140px;
      background-color: #cccccc;
      border-radius: 50%;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .time {
      margin-top: 6px;
      color: #000;
    }
    &.active {
      .circle {
        background-color: #2e8980;
      }
    }
    &:not(:last-child) {
      margin-right: 120px;
      .circle {
        position: relative;
        &:before {
          content: '';
          position: absolute;
          width: 100px;
          height: 6px;
          background-color: #797979;
          right: -110px;
          top: 50%;
          transform: translateY(-3px);
        }
        &:after {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          border: 10px transparent solid;
          border-left: 10px #797979 solid;
          right: -130px;
          top: 50%;
          transform: translateY(-10px);
        }
      }
    }
  }
}
</style>
