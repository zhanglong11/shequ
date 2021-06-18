<template>
  <div class="container has-footer">
    <div class="infoWrapper">
      <h4 class="title">{{ name }}</h4>
      <el-row class="rowLine">
        <el-col :span="16">
          <WorkFlow
            ref="workFlowRef"
            :token="token"
            :flag="config.flag"
            :addFormData="addFormData"
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
      <div>
        <!--          <div>{{JSON.stringify(detailInfo)}}</div>-->
      </div>
    </div>
    <div class="footer-button">
      <el-button @click="cancelEvent">返回</el-button>
      <el-button type="primary" @click="saveSubmit()">提交</el-button>
    </div>
  </div>
</template>

<script>
import Api from '../api'
import oaConfig from '@/views/workbench/projectOA/oaConfig' // OA配置
export default {
  name: 'ProjectOACustomFormAdd',
  data() {
    return {
      oaConfig,
      config: {
        flag: 1
      },
      addFormData: true,
      viewFormData: false,
      id: this.$route.query.id || '',
      name: this.$route.query.name,
      formType: this.$route.query.formType
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
  methods: {
    async saveSubmit() {
      const formData = await this.$refs.workFlowRef.getJSON()
      console.log(1111, formData)
      await Api.getFormFillSave({ formData: formData, formName: this.name, formId: this.id }).then(res => {
        this.$message.success('保存成功')
        this.cancelEvent()
      })
    },
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
.title {
  margin: 10px 20px;
  font-weight: bold;
  font-size: 18px;
}
</style>
