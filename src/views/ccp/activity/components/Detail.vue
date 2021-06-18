<template>
  <div>
    <el-dialog width="700px" :title="'活动详情'" class="beauty" :visible="visible" @close="close">
      <div>
        <el-tabs v-model="typeName" type="card">
          <el-tab-pane label="活动详情" name="1"></el-tab-pane>
          <el-tab-pane label="报名信息及签到信息" name="2"></el-tab-pane>
          <el-tab-pane label="学习心得" name="3"></el-tab-pane>
        </el-tabs>
        <div v-if="typeName === '1'" class="content">
          <el-row :gutter="4">
            <!-- <el-row :span="24">
              <el-col :span="8">
                <span style="text-align: right">已结束</span>
              </el-col>
            </el-row> -->
            <el-col :span="24">
              <el-col :span="16">
                <span>活动名称：</span>
                <span>{{ form.name }}</span>
              </el-col>
              <el-col :span="8">
                <el-tag size="mini">{{ $getLabel(statusList, form.status) }}</el-tag>
              </el-col>
            </el-col>

            <el-col :span="24">
              <span class="desc-label">活动内容：</span>
              <span>{{ form.content }}</span>
            </el-col>
            <el-col :span="24">
              <span class="desc-label">活动地点：</span>
              <span>{{ form.site }}</span>
            </el-col>
            <el-col :span="24">
              <span class="desc-label">活动类型：</span>
              <span>{{ form.typeName }}</span>
            </el-col>
            <el-col :span="24">
              <span class="desc-label">活动时间：</span>
              <span>{{ form.activityBeginTime | ymdhm }}~{{ form.activityEndTime | ymdhm }}</span>
            </el-col>
            <el-col :span="24">
              <span class="desc-label">报名时间：</span>
              <span>{{ form.applyBeginTime | ymdhm }}~{{ form.applyEndTime | ymdhm }}</span>
            </el-col>
            <el-col :span="24">
              <span class="desc-label">发起组织：</span>
              <span>{{ form.organizationName }}</span>
            </el-col>
            <el-col :span="24">
              <span class="desc-label">参与党员：</span>
              <UserShowMore :value="form.firstParticipantName"></UserShowMore>
            </el-col>
            <el-col :span="24">
              <span class="desc-label">参与积极分子：</span>
              <UserShowMore :value="form.secondParticipantName"></UserShowMore>
            </el-col>
            <el-col :span="24">
              <span class="desc-label">附件：</span>
              <span style="display: inline-block; vertical-align: top"><FileList :ids="form.fileIds" /></span>
            </el-col>
            <el-col :span="24">
              <span class="desc-label">活动积分：</span>
              <span>{{ form.score }}</span>
            </el-col>
            <el-col :span="24">
              <span class="desc-label">创建人：</span>
              <span>{{ form.creatorName }}</span>
            </el-col>
            <el-col :span="24">
              <span class="desc-label">创建时间：</span>
              <span>{{ form.createTime }}</span>
            </el-col>
            <el-col :span="24">
              <h2 class="title">活动总结</h2>
              <span class="desc-label">活动总结：</span>
              <span>
                {{ form.activitySummarize }}
              </span>
            </el-col>
            <el-col :span="24">
              <span class="desc-label">附件：</span>
              <span style="display: inline-block"><FileList :ids="form.activitySummarizeFile" /></span>
            </el-col>
          </el-row>
        </div>
        <div v-if="typeName === '2'" class="content">
          <div class="container">
            <div class="tooltips">
              <el-form ref="filterForm" inline :model="filterForm">
                <el-form-item>
                  <el-input v-model="filterForm.userName" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item style="margin-right: 30px">
                  <el-button type="primary" icon="el-icon-search" @click="searchSign()">查询</el-button>
                  <el-button @click="reset">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <el-table
              v-loading="loading"
              :data="tableData"
              border
              :header-cell-style="{ textAlign: 'center', background: '#fff' }"
              :cell-style="{ 'text-align': 'center' }"
              style="width: 100%"
            >
              <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
              <el-table-column prop="createTime" label="报名时间"></el-table-column>
              <el-table-column prop="signInTime" label="签到时间"></el-table-column>
            </el-table>
          </div>
        </div>
        <div v-if="typeName === '3'" class="content">
          <div class="container">
            <div class="tooltips">
              <el-form ref="contentForm" inline :model="contentForm">
                <el-form-item>
                  <el-input v-model="contentForm.userName" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item style="margin-right: 30px">
                  <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
                  <el-button @click="reset1">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div v-if="listData.length > 0">
              <div v-for="(item, index) in listData" :key="index" class="main-desc">
                <div class="item">
                  <span>图片</span>
                  <span>{{ item.userName }}</span>
                  <span>{{ item.updateTime }}</span>
                </div>
                <p>
                  {{ item.content }}
                </p>
                <el-form-item label="附件" label-width="100">
                  <FileList :ids="item.fileIds"></FileList>
                </el-form-item>
              </div>
            </div>
            <div v-else>
              <p style="text-align: center; margin-top: 10%; font-size: 16px">-暂无数据-</p>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Api from '@/views/association/api'
import { statusList } from '@/views/association/lib/optionsList'
// import { activityList } from '@/views/association/lib/optionsList'
export default {
  name: 'UnityDetail',
  props: {
    id: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      // activityList,
      form: {},
      loading: false,
      statusList,
      filterForm: {
        id: this.id,
        userName: ''
      },
      contentForm: {
        id: this.id,
        userName: ''
      },
      typeName: '1',
      tableData: [],
      listData: []
    }
  },
  created() {
    if (this.id) {
      // 活动详情1
      Api.getActivityDetail(this.id).then(res => {
        this.form = res.data
      })
      this.getTimeList()
      this.searchReport()
    }
  },
  methods: {
    searchSign() {
      this.getTimeList()
    },
    reset() {
      this.filterForm = {
        id: this.id,
        userName: ''
      }
      this.searchSign()
    },
    getTimeList() {
      Api.getActivitySign({ ...this.filterForm }).then(res => {
        this.tableData = res.data
      })
    },
    searchReport() {
      // 心得
      Api.getActivityReport({ ...this.contentForm }).then(res => {
        this.listData = res.data
      })
    },
    search() {
      this.searchReport()
    },
    reset1() {
      this.contentForm = {
        id: this.id,
        userName: ''
      }
      this.searchReport()
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped lang="less">
/deep/.el-dialog__wrapper.beauty .el-dialog {
  min-height: 793px !important;
}
.el-col {
  margin-bottom: 25px;
}
.title {
  border-top: 1px dashed;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  font-size: 16px;
}
.main-desc {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}
.desc-label {
  font-size: 16px;
  color: #999;
}
</style>
