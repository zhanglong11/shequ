<template>
  <div class="audit-container">
    <el-card v-if="processDetails.flag === 1 && isAuditStyle && isCheck && isVertical" class="box-card">
      <div slot="header" class="clearfix">
        <span>审批</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <div>
        <WorkFlow
          v-if="formDataJson"
          ref="workFlowRef"
          :token="token"
          :addFormData="true"
          :formDataJson="formDataJson"
          :companyList="companyList"
          :projectTypeList="oaConfig.projectTypeList"
          :projectType="oaConfig.projectType"
          :configApi="oaConfig.configApi"
          :isSingleCompany="oaConfig.isSingleCompany"
          :userType="oaConfig.userType"
        />
      </div>
    </el-card>
    <el-card v-if="isProcess" class="box-card">
      <div slot="header" class="clearfix">
        <span>
          审批流程
          <span class="audit-label" :class="'type-' + processDetails.status">
            {{ ['审批中', '已通过', '已驳回'][processDetails.status - 1] }}
          </span>
        </span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <div class="flow-container" :class="{ vertical: isVertical, horizontal: !isVertical }">
        <div
          v-for="(item, index) of checkFlowList"
          :key="item.id + 'ss' + index"
          class="item"
          :class="{ isReadNode: item.type === 2 }"
          @click="handleItemClick(item, index)"
        >
          <div class="content-label">
            <el-tooltip effect="dark" :content="item.operateLabel" placement="right">
              <span :class="'label-' + item.type">
                {{ item.operateLabel }}
              </span>
            </el-tooltip>
          </div>
          <div
            class="circle-line"
            :class="{
              isSuccess: item.result === 1 || item.status === 1 || item.type === 0,
              isCurrent: index === current,
              isFailure: item.type === 1 && item.result === 2,
              passNotRead: item.status !== 1 && index < current
            }"
          >
            <div class="circle"></div>
          </div>
          <div
            class="content"
            :class="{
              isCurrent: current && index === current,
              isFailure: item.type === 1 && item.result === 2
            }"
          >
            <div v-if="item.companyName" class="company">
              <b>{{ item.companyName }}:</b>
            </div>
            <div class="user" v-html="item.content"><i class="el-icon-s-custom" style="marginright: 3px"></i></div>
            <div v-if="item.operateTime" class="time">{{ item.operateTime }}</div>
          </div>
        </div>
      </div>
    </el-card>
    <!--弹窗 start-->
    <el-dialog
      v-if="isDialog"
      :title="['审批意见', '抄送详情'][selectFlowNode.type - 1]"
      width="800px"
      top="10vh"
      :close-on-click-modal="false"
      :visible="showAuditDetail"
      @close="showAuditDetail = false"
    >
      <div :key="selectFlowNode.id" class="card-body card-dialog">
        <!--审批人-->
        <template v-if="selectFlowNode.type === 1">
          <template v-if="_.every(selectFlowNode.children, i => _.isNil(i.auditResult))">
            <div>暂无数据</div>
          </template>
          <template v-else>
            <div v-for="(item, index) of selectFlowNode.children" :key="'sfn' + index" class="body-item">
              <!--<DetailItem label="审核人" :value="item.auditData.taskDelegateName"></DetailItem>
              <DetailItem label="审核时间" :value="item.auditTime"></DetailItem>
              <DetailItem label="公司" :value="item.auditData.companyName"></DetailItem>-->
              <template v-if="!_.isNil(item.auditResult)">
                <el-form disabled label-position="left" label-width="80px">
                  <el-form-item label="审核人">
                    <el-input :value="item.userName"></el-input>
                  </el-form-item>
                  <el-form-item label="审核时间">
                    <el-input :value="item.auditTime"></el-input>
                  </el-form-item>
                </el-form>
                <fm-generate-form ref="generateForm" :data="JSON.parse(item.template)"></fm-generate-form>
              </template>
              <template v-else>
                <!--<div>暂无数据</div>-->
              </template>
              <!-- <template v-if="!selectFlowNode.auditResult && item.auditData.taskDelegateId">
                <fm-generate-form ref="generateForm" :data="auditFormStyleJson"></fm-generate-form>
              </template>-->
            </div>
          </template>
        </template>
        <!--抄送人-->
        <template v-if="selectFlowNode.type === 2">
          <div v-for="(item, index) of selectFlowNode.children" :key="'sfnCC' + index" class="body-item">
            <DetailItem label="抄送人" :value="item.userName"></DetailItem>
            <DetailItem label="所属公司" :value="item.companyName"></DetailItem>
            <DetailItem label="状态">
              <el-switch
                :value="!!item.status"
                disabled
                active-color="#13ce66"
                inactive-color="#eee"
                active-text="已读"
                inactive-text="未读"
              >
              </el-switch>
            </DetailItem>
            <DetailItem label="已读时间">{{ item.readTime || '-' }}</DetailItem>
          </div>
        </template>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showAuditDetail = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--弹窗 end-->
    <!--非弹窗 start-->
    <el-card v-if="showAuditDetail && !isDialog" class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ ['审批意见', '抄送详情'][selectFlowNode.type - 1] }}</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <div class="card-body">
        <!--审批人-->
        <template v-if="selectFlowNode.type === 1">
          <template v-if="_.every(selectFlowNode.children, i => _.isNil(i.auditResult))">
            <div>暂无数据</div>
          </template>
          <template v-else>
            <div v-for="(item, index) of selectFlowNode.children" :key="'sfn' + index" class="body-item">
              <!--<DetailItem label="审核人" :value="item.auditData.taskDelegateName"></DetailItem>
            <DetailItem label="审核时间" :value="item.auditTime"></DetailItem>
            <DetailItem label="公司" :value="item.auditData.companyName"></DetailItem>-->
              <template v-if="!_.isNil(item.auditResult)">
                <el-form disabled label-position="left" label-width="80px">
                  <el-form-item label="审核人">
                    <el-input :value="item.userName"></el-input>
                  </el-form-item>
                  <el-form-item label="审核时间">
                    <el-input :value="item.auditTime"></el-input>
                  </el-form-item>
                  <el-form-item label="公司">
                    <el-input :value="item.companyName"></el-input>
                  </el-form-item>
                </el-form>
                <fm-generate-form ref="generateForm" :data="JSON.parse(item.template)"></fm-generate-form>
              </template>
              <template v-else>
                <!--<div>暂无数据</div>-->
              </template>
              <!-- <template v-if="!selectFlowNode.auditResult && item.auditData.taskDelegateId">
              <fm-generate-form ref="generateForm" :data="auditFormStyleJson"></fm-generate-form>
            </template>-->
            </div>
          </template>
        </template>
        <!--抄送人-->
        <template v-if="selectFlowNode.type === 2">
          <div v-for="(item, index) of selectFlowNode.children" :key="'sfnCC' + index" class="body-item">
            <DetailItem label="抄送人" :value="item.userName"></DetailItem>
            <DetailItem label="所属公司" :value="item.companyName"></DetailItem>
            <DetailItem label="状态">
              <el-switch
                :value="!!item.status"
                disabled
                active-color="#13ce66"
                inactive-color="#eee"
                active-text="已读"
                inactive-text="未读"
              >
              </el-switch>
            </DetailItem>
            <DetailItem label="已读时间">{{ item.readTime || '-' }}</DetailItem>
          </div>
        </template>
      </div>
    </el-card>
    <!--非弹窗 end-->
    <el-card v-if="processDetails.flag === 1 && isAuditStyle && isCheck && !isVertical" class="box-card">
      <div slot="header" class="clearfix">
        <span>审批</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <div>
        <WorkFlow
          v-if="formDataJson"
          ref="workFlowRef"
          :token="token"
          :addFormData="true"
          :formDataJson="formDataJson"
          :companyList="companyList"
          :projectTypeList="oaConfig.projectTypeList"
          :projectType="oaConfig.projectType"
          :configApi="oaConfig.configApi"
          :isSingleCompany="oaConfig.isSingleCompany"
          :userType="oaConfig.userType"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import Api from '../../api'
import DetailItem from './DetailItem'
import oaConfig from '@/views/workbench/projectOA/oaConfig' // OA配置
export default {
  name: 'CommonCheckFlow',
  components: { DetailItem },
  props: {
    id: {
      type: [String, Number],
      default: ''
    },
    isVertical: {
      type: Boolean,
      default: true
    },
    isDialog: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      oaConfig,
      showAuditDetail: false,
      isCheck: this.$route.query.isCheck || this.$route.query.isCheck || false,
      processDetails: '',
      selectFlowNode: {},
      selectIndex: null,
      current: 0,
      formId: '',
      auditFormStyleJson: {}, // 审核表单模板
      checkFlowList: [],
      formDataJson: '',
      config: {
        flag: 1
      },
      isAuditStyle: false,
      isProcess: false
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
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  created() {
    if (this.id) {
      this.getDetail()
      if (this.isCheck) {
        this.getFormStyle()
      }
    }
  },
  // 方法集合
  methods: {
    // 需要审核的情况下,获取审核表单
    async getFormStyle() {
      const res = await Api.getAuditStyleTemplate(this.id)
      const datas = res.data
      if (!datas) {
        return
      }
      this.isAuditStyle = true
      this.formDataJson = JSON.parse(datas.template)
    },
    // 获取审批数据
    async getDetail() {
      const res = await Api.getFormProcess(this.id)
      let isCurrentChange = false // current只能取第一个
      const datas = res.data
      if (!datas) {
        return
      }
      this.isProcess = true
      this.processDetails = datas
      const checkFlowList =
        res.data.list &&
        res.data.list.map((item, index) => {
          if (item.nodeType !== 2 && !item.auditResult) {
            if (!isCurrentChange) {
              this.current = index + 1 // 要加上发起人
            }
            isCurrentChange = true
          }
          if (item.auditResult === 2) {
            this.current = index + 1
            isCurrentChange = true
          }
          if (item.auditResult === 1) {
            this.current = index + 2
          }
          let operateLabel = item.nodeType === 1 ? '审批人' : '抄送人'
          if (item.nodeName) {
            operateLabel = item.nodeName
          }
          return {
            id: item.id,
            type: item.nodeType,
            result: item.auditResult,
            status: item.status,
            auditStyleType: item.auditStyleType,
            operateLabel: operateLabel,
            content: item.nodeContent,
            nodeName: item.nodeName,
            children: item.children
          }
        })
      checkFlowList.unshift({
        type: 0,
        operateLabel: '发起人',
        content: res.data.applyUserName
      })
      this.checkFlowList = [...checkFlowList]
    },
    handleItemClick(item, index) {
      console.log('点击节点', item)
      if (index > this.current) return
      if (item.auditStyleType === 3) {
        return
      }
      if (item.type === 0) {
        this.showAuditDetail = false
        return
      }
      if (this.selectIndex === index) {
        this.showAuditDetail = !this.showAuditDetail
      } else {
        this.selectIndex = index
        this.showAuditDetail = true
      }
      this.selectFlowNode = { ...item }
    },
    // 审核
    async audit() {
      const formData = await this.$refs.workFlowRef.getJSON()
      await this.auditSuccess(formData)
    },
    // 动态表单审批流程
    async auditSuccess(formData) {
      if (!this.id) {
        return
      }
      await Api.queryTaskComplete(this.id, formData)
      this.$message.success('审核成功')
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
