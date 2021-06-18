<template>
  <div class="container has-footer">
    <div class="infoWrapper">
      <h4 class="title">{{ name }}</h4>
      <el-row class="rowLine">
        <el-col :span="16">
          <WorkFlow
            v-if="companyList.length > 0"
            ref="workFlowRef"
            :token="token"
            :flag="config.flag"
            :viewFormData="viewFormData"
            :formId="id"
            :hasProcess="false"
            :hasForm="true"
            :companyList="companyList"
            :projectTypeList="oaConfig.projectTypeList"
            :projectType="oaConfig.projectType"
            :configApi="oaConfig.configApi"
            :isSingleCompany="oaConfig.isSingleCompany"
            :userType="oaConfig.userType"
            @close="changeWorkFork"
            @change="changeWorkFork"
          />
        </el-col>
      </el-row>
    </div>
    <CommonCheckFlow :id="id" ref="checkCard"></CommonCheckFlow>
    <div class="footer-button">
      <el-button v-if="processDetails.flag === 1 && isCheck" v-promise-btn type="primary" @click="handleAudit"
        >审核</el-button
      >
      <el-button @click="cancelEvent">返回</el-button>
    </div>
  </div>
</template>

<script>
import Api from '../api'
import oaConfig from '@/views/workbench/projectOA/oaConfig'
import CommonCheckFlow from '../components/CommonCheckFlow'
export default {
  name: 'ProjectOACustomFormDetail',
  components: {
    CommonCheckFlow
  },
  data() {
    return {
      oaConfig,
      config: {
        flag: 1
      },
      addFormData: false,
      viewFormData: true,
      id: this.$route.query.id || '',
      isCheck: this.$route.query.isCheck || false,
      name: this.$route.query.name,
      formType: this.$route.query.formType,
      processDetails: {}
    }
  },
  computed: {
    token() {
      return this.$store.state.user.token
    },
    companyList() {
      return this.$store.state.projectOAStore.organizationTree
    }
  },
  created() {
    this.oaConfig.configApi.getFormDetails = `/wisdom-community-oa/oa/form/data/get/`
    this.getFormProcess()
    // this.$router.currentRoute.meta.title = `${this.name}详情`
  },
  methods: {
    // 获取审批数据
    async getFormProcess() {
      if (!this.id) {
        return
      }
      const result = await Api.getFormProcess(this.id)
      const datas = result.data
      if (!datas) {
        return
      }
      this.processDetails = datas
    },
    // 取消
    cancelEvent() {
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.go(-1)
    },
    // 操作成功
    changeWorkFork() {
      this.cancelEvent()
    },
    // 提交审核
    handleAudit() {
      this.$refs.checkCard.audit()
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  margin: 10px 20px;
  font-weight: bold;
  font-size: 18px;
}
</style>
