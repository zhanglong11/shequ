<template>
  <div class="container has-footer">
    <div class="inner-wrapper">
      <div class="con-form">
        <h3>基本信息</h3>
        <el-form label-width="140px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="问卷标题">{{ detailData.title }}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="截止时间">{{ dayjs(detailData.endTime).format('YYYY-MM-DD HH:mm') }}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="匿名设置">{{ $getLabel(topFlagList, detailData.anonymity) }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="问卷说明">{{ detailData.explain }}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态">{{ $getLabel(questionStatus, detailData.status) }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="发起时间">{{ detailData.createTime }}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建人">{{ detailData.creatorName }}</el-form-item>
            </el-col>
          </el-row>
          <h3 class="title">问卷内容</h3>
          <el-row>
            <el-col :span="24">
              <div style="margin-left: 50px">
                <template v-if="detailData.issueList.length">
                  <div v-for="(item, index) of detailData.issueList" :key="'is' + index">
                    <div v-if="item.type === 0" class="main-desc">
                      <div class="main-title">
                        <span class="label">
                          <el-tag style="margin: 0 5px" class="label-tag_1" size="mini">单选</el-tag>
                        </span>
                        <span v-if="item.must" style="color: red">*</span>
                        <span class="title">{{ index + 1 }}、{{ item.topic }}</span>
                      </div>
                      <div v-for="(items, indexs) of item.optionList" :key="'op' + indexs" class="foot">
                        <span class="f-option">选项{{ indexs + 1 }}</span>
                        <span class="f-ask">{{ items.option }}</span>
                      </div>
                    </div>
                    <div v-if="item.type === 1" class="main-desc">
                      <div class="main-title">
                        <span class="label">
                          <el-tag style="margin: 0 5px" class="label-tag_2" size="mini">多选</el-tag>
                        </span>
                        <span v-if="item.must" style="color: red">*</span>
                        <span class="title">{{ index + 1 }}、{{ item.topic }}：</span>
                      </div>
                      <div v-for="(items, indexs) of item.optionList" :key="'ops' + indexs" class="foot">
                        <span class="f-option">选项{{ indexs + 1 }}</span>
                        <span class="f-ask">{{ items.option }}</span>
                      </div>
                    </div>
                    <div v-if="item.type === 2" class="main-desc">
                      <div class="main-title">
                        <span class="label">
                          <el-tag style="margin: 0 5px" class="label-tag_3" size="mini">简答</el-tag>
                        </span>
                        <span v-if="item.must" style="color: red">*</span>
                        <span class="title">{{ index + 1 }}、{{ item.topic }}：</span>
                      </div>
                      <div class="foot"></div>
                    </div>
                  </div>
                </template>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div style="display: flex; justify-content: space-between">
          <span>提交问卷</span>
          <span>总数：{{ tableData ? tableData.length : 0 }}</span>
        </div>
        <div style="margin-left: 50px">
          <vxe-table :data="tableData" size="mini">
            <vxe-table-column v-if="!detailData.anonymity" title="提交人" field="realName"></vxe-table-column>
            <vxe-table-column title="提交时间" field="submitTime">
              <template #default="{ row }">
                {{ dayjs(row.submitTime).format('YYYY-MM-DD HH:mm:00') }}
              </template>
            </vxe-table-column>
            <vxe-table-column title="操作">
              <template #default="{ row }">
                <el-button v-if="$hasPower('QuestionDetailContent')" type="text" @click="handleDetail(row)"
                  >查看详情</el-button
                >
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
      </div>
      <ResultDetail
        v-if="resultAddDialog"
        :id="detailId"
        :anonymity="!detailData.anonymity"
        :visible.sync="resultAddDialog"
        :realName="realName"
        :submitTime="submitTime"
        :dataList="detailDataOption"
      />
    </div>
    <div class="footer-button">
      <el-button @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import Api from '../api'
import ResultDetail from './Result'
import { questionStatus, topFlagList } from '../lib/optionsList'
export default {
  name: 'QuestionnDetail',
  components: { ResultDetail },
  data() {
    return {
      questionStatus,
      topFlagList,
      id: this.$route.params.id || '',
      detailData: {
        issueList: []
      },
      tableData: [],
      resultAddDialog: false,
      detailId: ''
    }
  },
  mounted() {
    if (this.id) {
      Api.getinformQuestionDetail(this.id).then(res => {
        this.detailData = res.data
      })
      Api.getinformQuestionSubmit({ questionnaireId: this.id }).then(res => {
        this.tableData = res.data.records
      })
    }
  },
  methods: {
    // 查看详情
    handleDetail(row) {
      this.detailId = row.id
      this.realName = row.realName
      this.submitTime = row.submitTime
      this.detailDataOption = this.detailData.issueList
      this.resultAddDialog = true
    },
    handleBack() {
      this.$router.back()
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
.con-form {
  padding-left: 100px;
  max-width: 70%;
  .title {
    font-weight: unset;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .desc {
    padding-left: 50px;
    .label-desc {
      color: #999;
    }
  }
}
.label-tag_3 {
  border-color: rgba(211, 173, 247, 1);
  background-color: rgba(249, 240, 255, 1);
  color: #722ed1;
}
.label-tag_2 {
  border-color: rgba(135, 232, 222, 1);
  background-color: rgba(230, 255, 251, 1);
  color: #13c2c2;
}
.label-tag_1 {
  border-color: rgba(145, 213, 255, 1);
  background-color: rgba(230, 247, 255, 1);
  color: #1890ff;
}
.main-desc {
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  .foot {
    display: inline-block;
    padding-left: 45px;
    .f-option {
      color: #999;
      margin-right: 10px;
    }
  }
}
</style>
