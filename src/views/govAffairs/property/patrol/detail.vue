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
              <DetailItem label="巡查单号" labelWidth="120" :value="info.code"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="巡查名称" labelWidth="120" :value="info.name"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="巡查类型" labelWidth="120" :value="info.type"></DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <DetailItem label="所属物业" labelWidth="120" :value="info.propertyName"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="巡查人" labelWidth="120" :value="info.policeMan"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="巡查日期" labelWidth="120" :value="info.policeTime"></DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <DetailItem label="是否申诉" labelWidth="120">
                {{ $getLabel(appealFlag, info.appealFlag) }}
              </DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="创建人" labelWidth="120" :value="info.creatorName"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="创建时间" labelWidth="120" :value="info.createTime"></DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <DetailItem label="巡查结果描述" labelWidth="120" :value="info.description"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="本次扣分" labelWidth="120" :value="info.score"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="巡查结果" labelWidth="120">
                {{ $getLabel(patrolStatus, info.result) }}
              </DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <DetailItem label="附件" labelWidth="120"><ImgList :file-ids="info.fileId"></ImgList></DetailItem>
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
              <DetailItem label="附件" labelWidth="120">
                <ImgList :file-ids="info.fileIds"></ImgList>
              </DetailItem>
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
            <el-col :span="16">
              <DetailItem label="理由" labelWidth="120" :value="info.reason"></DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <DetailItem label="处理人" labelWidth="120" :value="info.appealDealMan"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="处理时间" labelWidth="120" :value="info.appealDealTime"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="附件" labelWidth="120">
                <ImgList :file-ids="info.appealDealFileIds"></ImgList>
              </DetailItem>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="footer-button">
      <el-button>返回</el-button>
    </div>
  </div>
</template>

<script>
import Api from '../api'
import patrolStatus from '../../lib/patrolStatus'
import appealFlag from '../../lib/appealFlag'
import appealResult from '../../lib/appealResult'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'PropertyPatrolDetail',
  components: {},
  data() {
    // 这里存放数据
    return {
      patrolStatus,
      appealFlag,
      appealResult,
      id: this.$route.params.id || '',
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
      const res = await Api.getPatrolDetail(this.id)
      this.info = { ...res.data }
    }
  }
}
</script>
<style lang="less" scoped></style>
