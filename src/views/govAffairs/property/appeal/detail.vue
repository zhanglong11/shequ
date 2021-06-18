<template>
  <div class="container has-footer">
    <div class="inner-wrapper">
      <div class="common-card">
        <div class="common-card-title">
          <span class="title-content">基本信息</span>
          <span class="title-opt">
            <el-button type="text"></el-button>
          </span>
        </div>
        <div class="common-card-body">
          <el-row>
            <el-col :span="8">
              <DetailItem label="投诉单号" labelWidth="120" :value="info.code"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="投诉物业" labelWidth="120" :value="info.objName"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="投诉类型" labelWidth="120" :value="info.typeName"></DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <DetailItem label="投诉内容" labelWidth="120" :value="info.content"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="投诉人" labelWidth="120" :value="info.complainerName"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="投诉时间" labelWidth="120" :value="info.createTime"></DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <DetailItem label="是否申诉" labelWidth="120">
                {{ $getLabel(appealFlag, info.appealFlag) }}
              </DetailItem>
            </el-col>
            <el-col :span="16">
              <DetailItem label="附件" labelWidth="120"><FileList :ids="info.complainFileIds"></FileList></DetailItem>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="common-card mt20">
        <div class="common-card-title">
          <span class="title-content">投诉处理</span>
          <span class="title-opt">
            <el-button type="text"></el-button>
          </span>
        </div>
        <div class="common-card-body">
          <el-row>
            <el-col :span="8">
              <DetailItem label="单据状态" labelWidth="120">
                {{ $getLabel(appealStatus, info.status) }}
              </DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="指派给" labelWidth="120" :value="info.dealManName"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="处理结果" labelWidth="120" :value="info.dealResult"></DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <DetailItem label="本次扣分" labelWidth="120" :value="info.score"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="附件" labelWidth="120"><FileList :ids="info.dealFileIds"></FileList></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="处理时间" labelWidth="120" :value="info.dealTime"></DetailItem>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="common-card mt20">
        <div class="common-card-title">
          <span class="title-content">申诉信息</span>
          <span class="title-opt">
            <el-button type="text"></el-button>
          </span>
        </div>
        <div class="common-card-body">
          <el-row>
            <el-col :span="8">
              <DetailItem label="申诉理由" labelWidth="120" :value="info.reason"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="提交人" labelWidth="120" :value="info.appealMan"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="提交时间" labelWidth="120" :value="info.appealCreateTime"></DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <DetailItem label="附件" labelWidth="120"><FileList :ids="info.fileIds"></FileList></DetailItem>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="common-card mt20">
        <div class="common-card-title">
          <span class="title-content">申诉处理</span>
          <span class="title-opt">
            <el-button type="text"></el-button>
          </span>
        </div>
        <div class="common-card-body">
          <el-row>
            <el-col :span="8">
              <DetailItem label="处理结果" labelWidth="120">
                {{ $getLabel(appealResult, info.appealResult) }}
              </DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="理由" labelWidth="120" :value="info.dealReason"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="附件" labelWidth="120"><FileList :ids="info.appealDealFileIds"></FileList></DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <DetailItem label="处理人" labelWidth="120" :value="info.appealDealMan"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="处理时间" labelWidth="120" :value="info.appealDealTime"></DetailItem>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="footer-button">
      <el-button @click="$back">返回</el-button>
    </div>
  </div>
</template>

<script>
import Api from '../api'
import appealStatus from '../../lib/appealStatus'
import appealFlag from '../../lib/appealFlag'
import appealResult from '../../lib/appealResult'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'PropertyAppealDetail',
  components: {},
  data() {
    // 这里存放数据
    return {
      id: this.$route.params.id || '',
      appealStatus,
      appealFlag,
      appealResult,
      info: {}
    }
  },
  created() {
    if (this.id) {
      this.getDetail()
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    async getDetail() {
      const res = await Api.getAppealDetail(this.id)
      this.info = { ...res.data }
    }
  }
}
</script>
<style lang="less" scoped></style>
