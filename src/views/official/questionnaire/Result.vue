<template>
  <div>
    <el-dialog width="680px" :title="'查看问卷'" class="beauty" :visible="visible" @close="close">
      <el-form label-width="100px">
        <el-row>
          <el-col v-if="anonymity" :span="8">
            <el-form-item label="提交人：">{{ realName }}</el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="提交时间：">{{ dayjs(submitTime).format('YYYY-MM-DD HH:mm:00') }}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <h2 style="text-align: center; font-size: 16px">社区调查问卷</h2>
      </el-row>
      <el-row>
        <template v-if="rowDataList.length > 0">
          <div v-for="(item, index) of detailData" :key="'is' + index">
            <div v-for="(rowIk, k) of rowDataList" :key="'row' + k">
              <div v-if="item.id === rowIk.issueId">
                <div v-if="item.type === 0" class="main-desc">
                  <div class="main-title">
                    <span class="label">
                      <el-tag style="margin: 0 5px" class="label-tag_1" size="mini">单选</el-tag>
                    </span>
                    <span class="title">{{ item.index }}、{{ item.topic }}</span>
                  </div>
                  <div v-for="(items, indexs) of item.optionList" :key="'op' + indexs" class="foot">
                    <span v-for="(rowIks, kk) of rowIk.optionList" :key="'o' + kk">
                      <span :class="{ colordesc: items.optionId === rowIks.optionId }">
                        <span class="f-option">选项{{ indexs + 1 }}</span>
                        <span> {{ items.option }}</span>
                      </span>
                    </span>
                  </div>
                </div>
                <div v-if="item.type === 1" class="main-desc">
                  <div class="main-title">
                    <span class="label">
                      <el-tag style="margin: 0 5px" class="label-tag_2" size="mini">多选</el-tag>
                    </span>
                    <span class="title">{{ item.index }}、{{ item.topic }}：</span>
                  </div>
                  <div v-for="(items, indexs) of item.optionList" :key="'op' + indexs" class="foot">
                    <span
                      :class="{
                        colordesc: rowIk.optionList.map(e => e.optionId === items.optionId).includes(true)
                      }"
                    >
                      <span class="f-option"> 选项{{ indexs + 1 }} </span>
                      <span> {{ items.option }}</span>
                    </span>
                  </div>
                </div>
                <div v-if="item.type === 2" class="main-desc">
                  <div class="main-title">
                    <span class="label">
                      <el-tag style="margin: 0 5px" class="label-tag_3" size="mini">简答</el-tag>
                    </span>
                    <span class="title">{{ item.index }}.{{ item.topic }}：</span>
                  </div>
                  <div class="foot">
                    <span v-for="(rowIks, kk) of rowIk.optionList" :key="'o' + kk">
                      <span> {{ rowIks.shortAnswer }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <p style="text-align: center">[暂无结果]</p>
        </template>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import Api from '../api'
export default {
  name: 'ResultDetail',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    // 是否匿名
    anonymity: {
      type: Boolean,
      required: true
    },
    realName: String,
    submitTime: String,
    id: String,
    dataList: {}
  },
  data() {
    return {
      detailData: {
        optionList: []
      },
      rowDataList: []
    }
  },
  mounted() {
    this.detailData = this.dataList
    console.log(this.detailData)
    if (this.id) {
      Api.getinformQuestiontResult(this.id).then(res => {
        this.rowDataList = res.data
        this.rowDataList.map(item => item.optionList)
        console.log(this.rowDataList.map(item => item.optionList))
      })
    }
  },
  methods: {
    // 答案
    getResult() {
      this.detailData.map(item => {
        item.optionList.map(e => e.issueId)
        return item
      })
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped lang="scss">
@import '~@/styles/variables.scss';

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
      margin-right: 10px;
    }
    .colordesc {
      background-color: rgba(0, 150, 136, 1);
      color: #fff;
    }
  }
}
</style>
