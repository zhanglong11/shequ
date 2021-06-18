<template>
  <div class="work-flow">
    <WorkFlow
      ref="workFlowRef"
      :urlSuffix="$urlSuffix"
      :token="token"
      :flag="config.flag"
      :formId="id"
      :hasForm="false"
      :hasBasic="false"
      :isDraft="false"
      :projectType="projectType"
      :projectTypeList="projectTypeList"
      :projectId="projectId"
      :hasProcess="hasProcess"
      :companyList="companyList"
      @close="changeWorkFork"
      @change="changeWorkFork"
    />
  </div>
</template>

<script>
export default {
  name: 'ProjectOACustomFormAdd',
  // 这里存放数据
  data() {
    return {
      config: {
        flag: 2
      },
      formData: {
        id: '',
        name: '',
        template: '',
        type: 1
      },
      formType: '',
      hasProcess: false,
      id: '',
      projectTypeList: this.$getArgList('projectType')
    }
  },
  computed: {
    companyId() {
      return this.$store.getters.companyId
    },
    projectType() {
      return this.$store.state.project.projectType
    },
    token() {
      return this.$store.state.user.token
    },
    companyList() {
      return this.$store.state.userPower.organizationTree
    },
    projectId() {
      return this.$store.state.project.projectId
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  created() {
    this.hasProcess = Number(this.$route.params.formType) === 1
    this.id = this.$route.params.id
    // console.log(this.id)
  },
  // 方法集合
  methods: {
    // 取消
    cancelEvent() {
      this.$router.go(-1)
    },
    // 操作成功
    changeWorkFork() {
      this.cancelEvent()
    },
    // 获取数据
    getData() {
      this.$refs.workFlowRef.getFormData((formData, subFormData) => {
        console.log('获取数据', formData, subFormData)
      })
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
.work-footer {
  padding: 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
