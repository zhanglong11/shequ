<template>
  <div>
    <div>
      <div class="goBack" @click="goBack">
        <img src="../images/goBack.png" alt="" />
        <div>返回</div>
      </div>
      <el-tabs v-model="typeName" class="bim-tabs">
        <el-tab-pane label="活动详情" name="1">
          <el-row :gutter="4">
            <el-col :span="24">
              <span>活动名称：</span>
              <span>{{ form.name }}</span>
              <el-tag size="mini" style="margin-left: 20px">{{ $getLabel(statusList, form.status) }}</el-tag>
            </el-col>
            <el-col :span="24">
              <span>活动内容：</span>
              <span>{{ form.content }}</span>
            </el-col>
            <el-col :span="24">
              <span>活动地点：</span>
              <span>{{ form.site }}</span>
            </el-col>
            <el-col :span="24">
              <span>活动类型：</span>
              <span>{{ form.typeName }}</span>
            </el-col>
            <el-col :span="24">
              <span>活动时间：</span>
              <span>{{ form.activityBeginTime }}~{{ form.activityEndTime }}</span>
            </el-col>
            <el-col :span="24">
              <span>报名时间：</span>
              <span>{{ form.applyBeginTime }}~{{ form.applyEndTime }}</span>
            </el-col>
            <el-col :span="24">
              <span>发起组织：</span>
              <span>{{ form.organizationName }}</span>
            </el-col>
            <el-col :span="24">
              <span>参与人员：</span>
              <UserShowMore :value="form.firstParticipantName" />
            </el-col>
            <el-col :span="24">
              <span>负责人：</span>
              <span>{{ form.director }}</span>
            </el-col>
            <el-col :span="24">
              <span>附件：</span>
              <span style="display: inline-block; vertical-align: top"> <FileList :ids="form.fileIds" /> </span>
            </el-col>
            <el-col :span="24">
              <span>活动积分：</span>
              <span>{{ form.score }}</span>
            </el-col>
            <el-col :span="24">
              <span>创建人：</span>
              <span>{{ form.creatorName }}</span>
            </el-col>
            <el-col :span="24">
              <span>创建时间：</span>
              <span>{{ form.createTime }}</span>
            </el-col>
            <el-col :span="24">
              <h2 class="title">活动总结</h2>
              <span>活动总结：</span>
              <span>
                {{ form.activitySummarize }}
              </span>
            </el-col>
            <el-col :span="24">
              <span>附件：</span>
              <div style="display: inline-block; vertical-align: top">
                <FileList :ids="form.activitySummarizeFile" />
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="报名信息及签到信息" name="2">
          <div class="container">
            <div class="tooltips">
              <el-form ref="filterForm" inline :model="filterForm">
                <el-form-item prop="userName">
                  <el-input v-model="filterForm.userName" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item style="margin-right: 30px">
                  <el-button type="primary" icon="el-icon-search" @click="searchSign()">查询</el-button>
                  <el-button type="primary" icon="el-icon-refresh" plain @click="resetSign()">重置</el-button>
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
              <el-table-column prop="userName" show-overflow-tooltip label="姓名" width="180"></el-table-column>
              <el-table-column prop="createTime" show-overflow-tooltip label="报名时间"></el-table-column>
              <el-table-column prop="signInTime" show-overflow-tooltip label="签到时间"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="学习心得" name="3">
          <div class="container">
            <div class="tooltips">
              <el-form ref="contentForm" inline :model="contentForm">
                <el-form-item prop="userName">
                  <el-input v-model="contentForm.userName" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item style="margin-right: 30px">
                  <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
                  <el-button type="primary" icon="el-icon-refresh" plain @click="reset()">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div v-if="listData.length > 0">
              <div v-for="(item, index) in listData" :key="index" class="main-desc">
                <div class="user-avatar">
                  <span>
                    <el-avatar icon="el-icon-user-solid"></el-avatar>
                  </span>
                  <span style="margin: 0 15px 0 10px">{{ item.userName }}</span>
                  <span>{{ item.updateTime }}</span>
                </div>
                <p>
                  {{ item.content }}
                </p>
                <FileList :ids="item.fileId" />
              </div>
            </div>
            <div v-else>
              <p style="text-align: center; margin-top: 10%; font-size: 16px">-暂无数据-</p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Api from '../api/talent'
export default {
  name: 'MeetingDetail',
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      statusList: [
        {
          label: '未开始',
          value: '0'
        },
        {
          label: '进行中',
          value: '1'
        },
        {
          label: '已结束',
          value: '2'
        }
      ],
      loading: false,
      form: {},
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
    }
    this.getTimeList()
    this.searchReport()
  },
  methods: {
    goBack() {
      this.$emit('goBack')
    },
    searchSign() {
      this.getTimeList()
    },
    getTimeList() {
      this.loading = true
      Api.getActivitySign({ ...this.filterForm }).then(res => {
        this.tableData = res.data
        this.loading = false
      })
    },
    // 心得
    searchReport() {
      Api.getActivityReport({ ...this.contentForm }).then(res => {
        if (res.code === 200) {
          this.listData = res.data
        }
      })
    },
    search() {
      this.searchReport()
    },
    resetSign() {
      this.$refs.filterForm.resetFields()
      this.searchSign()
    },
    reset() {
      this.$refs.contentForm.resetFields()
      this.search()
    }
  }
}
</script>
<style scoped lang="less">
.goBack {
  width: 50px;
  position: absolute;
  right: 20px;
  top: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #ff5544;
  z-index: 1;
}
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
  .user-avatar {
    display: flex;
    align-items: center;
  }
}
</style>
<style lang="scss" scoped>
@import '../bimTabs.scss';
</style>
