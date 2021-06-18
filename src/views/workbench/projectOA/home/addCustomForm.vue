<template>
  <div class="work-flow">
    <WorkFlow
      ref="workFlowRef"
      :token="token"
      :flag="config.flag"
      :formId="id"
      :isCopy="isCopy"
      :hasProcess="hasProcess"
      :companyList="companyList"
      :formType="formType"
      :basicSetting="config.basicSetting"
      :projectTypeList="oaConfig.projectTypeList"
      :projectType="oaConfig.projectType"
      :configApi="oaConfig.configApi"
      :isSingleCompany="oaConfig.isSingleCompany"
      :userType="oaConfig.userType"
      @close="changeWorkFork"
      @change="changeWorkFork"
    />
  </div>
</template>

<script>
import oaConfig from '@/views/workbench/projectOA/oaConfig' // OA配置
export default {
  name: 'ProjectOACustomFormAdd',
  // 这里存放数据
  data() {
    return {
      oaConfig,
      config: {
        flag: 1,
        basicSetting: {
          powerKey: 'FormMange',
          pcRouteUrl: 'ProjectOACustomFormDetail',
          appRouteUrl: '/pages/projectOA/customFormDetail'
        }
      },
      formData: {
        id: '',
        name: '',
        template: '',
        type: 1
      },
      hasProcess: true,
      id: '',
      projectId: '',
      isCopy: this.$route.query.isCopy === true || this.$route.query.isCopy === 'true',
      projectTypeList: '',
      btnSaveLoading: false
    }
  },
  computed: {
    token() {
      return this.$store.state.user.token
    },
    formType() {
      const formType = parseInt(this.$route.query.formType)
      return formType
    },
    companyList() {
      return this.$store.state.projectOAStore.organizationTree
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  created() {
    this.id = this.$route.query.id
  },
  // 方法集合
  methods: {
    // 取消
    cancelEvent() {
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.go(-1)
    },
    // 操作成功
    changeWorkFork() {
      this.cancelEvent()
    }
  }
}
</script>

<style lang="less" scoped>
.work-flow {
  display: flex;
  height: calc(100vh - 90px);
  /deep/.approver-main {
    flex: 1;
  }
}
</style>
