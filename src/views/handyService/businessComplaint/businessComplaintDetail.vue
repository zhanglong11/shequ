<template>
  <div class="container">
    <h3>基本信息</h3>
    <el-form label-width="140px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="投诉单号">{{ detailData.code }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="投诉商户">{{ detailData.obj }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="投诉类型">{{ detailData.typeName }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="投诉内容">{{ detailData.content }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="投诉人">{{ detailData.complainer }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="投诉时间">{{ detailData.createTime }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="是否申诉">
            <span v-if="detailData.status === '2'">{{ detailData.appealFlag ? '是' : '否' }}</span>
            <span v-else>-</span>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="附件">
            <FileList :ids="detailData.complainFileIds"></FileList>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <h3>投诉处理</h3>
    <el-form label-width="140px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="单据状态">
            <span v-if="detailData.status === '0'">待指派</span>
            <span v-else-if="detailData.status === '1'">待处理</span>
            <span v-else-if="detailData.status === '2'">已处理</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="指派给">{{ detailData.dealManName }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="处理结果">{{ detailData.dealResult }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="本次扣分">{{ detailData.score }}</el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="附件">
            <FileList :ids="detailData.dealFileIds" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <h3>申诉信息</h3>
    <el-form label-width="140px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="申诉理由">{{ detailData.reason }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="提交人">{{ detailData.appealMan }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="提交时间">{{ detailData.appealCreateTime }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="附件">
            <FileList :ids="detailData.fileIds" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <h3>申诉处理</h3>
    <el-form label-width="140px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="处理结果">
            <span v-if="detailData.appealFlag === 1">{{
              detailData.appealResult === null ? '-' : detailData.appealResult ? '申诉成功' : '申诉失败'
            }}</span>
            <span v-else>-</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="理由">{{ detailData.dealReason }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="附件">
            <FileList :ids="detailData.appealDealFileIds" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="处理人">{{ detailData.appealDealMan }}</el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="处理时间">{{ detailData.appealDealTime }}</el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="btn-con">
      <el-button @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import Api from '@/api/handyService'
export default {
  data() {
    return {
      id: this.$route.params.id || '',
      detailData: {}
    }
  },
  mounted() {
    if (this.id) {
      // console.log(this.id)
      this.getMerchantComplain(this.id)
    }
  },
  methods: {
    // 返回
    handleBack() {
      this.$router.back()
    },
    // 获取投诉信息详情
    getMerchantComplain(id) {
      Api.getMerchantComplain(id).then(res => {
        // console.log(res)
        this.detailData = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 10px;
}
/deep/ .el-form-item__label {
  color: #999999;
}
.btn-con {
  margin-top: 18px;
  text-align: center;
}
</style>
