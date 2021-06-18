<template>
  <el-dialog width="650px" class="beauty" :title="'会议详情'" :visible="visible" @close="close">
    <div>
      <el-tabs v-model="typeName" type="card">
        <el-tab-pane label="会议详情" name="1"></el-tab-pane>
        <el-tab-pane label="会议签到" name="2"></el-tab-pane>
      </el-tabs>
      <div v-if="typeName === '1'" class="content">
        <!--查看详情-->
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <div class="detail-model">
            <el-row :gutter="4">
              <el-col :span="24">
                <span class="desc-label">会议主题：</span>
                <span>{{ form.meetingSubject }}</span>
              </el-col>
              <el-col :span="24">
                <span class="desc-label">会议室：</span>
                <span>{{ form.meetingAddress }}</span>
              </el-col>
              <el-col :span="24">
                <span class="desc-label">发起人：</span>
                <span>{{ form.initiatorName ? form.initiatorName.join(',') : '' }}</span>
              </el-col>
              <el-col :span="24">
                <span class="desc-label">参会党员：</span>
                <span><UserShowMore :value="form.participantName ? form.participantName.join(',') : ''" /></span>
                <!-- <span>{{ form.participantName ? form.participantName.join(',') : '' }}</span> -->
              </el-col>
              <el-col :span="24">
                <span class="desc-label">参会积极分子：</span>
                <span><UserShowMore :value="form.activistName ? form.activistName.join(',') : ''" /></span>
                <!-- <span>{{ form.activistName ? form.activistName.join(',') : '' }}</span> -->
              </el-col>
              <el-col :span="24">
                <span class="desc-label">会议时间：</span>
                <span
                  >{{ form.startTime ? dayjs(form.startTime).format('YYYY-MM-DD HH:mm') : '' }}~{{
                    form.endTime ? dayjs(form.endTime).format('YYYY-MM-DD HH:mm') : ''
                  }}</span
                >
              </el-col>
              <el-col :span="24">
                <span class="desc-label">会议状态：</span>
                <span>{{ $getLabel(statusList, form.status) }}</span>
              </el-col>
              <el-col :span="24">
                <span class="desc-label">创建人：</span>
                <span>{{ form.creatorName }}</span>
              </el-col>
              <el-col :span="24">
                <span class="desc-label">创建时间：</span>
                <span>{{ form.createTime ? dayjs(form.createTime).format('YYYY-MM-DD HH:mm') : '' }}</span>
              </el-col>
              <div v-if="[2].includes(form.status)">
                <el-col :span="24">
                  <span class="desc-label">会议纪要：</span>
                  <span>{{ form.summary }}</span>
                </el-col>
                <el-col :span="24">
                  <span class="desc-label">附件：</span>
                  <span style="display: inline-block; vertical-align: top">
                    <FileList :ids="form.fileIds" />
                  </span>
                </el-col>
              </div>
            </el-row>
          </div>
        </el-form>
      </div>
      <div v-if="typeName === '2'" class="content">
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
            <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
            <el-table-column prop="signInTime" label="签到时间"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import Api from '@/views/workbench/api'
import { statusList } from '@/views/workbench/lib/optionsList'

export default {
  components: {},
  props: {
    visible: {
      type: Boolean
    },
    repeatData: {},
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {},
      filterForm: {},
      typeName: '1',
      tableData: [],
      loading: false,
      fileIds: '',
      rules: {
        summary: [{ required: true, message: '必填' }]
      },
      endRecordList: [],
      statusList
    }
  },
  computed: {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    if (this.id) {
      this.getDetail()
    }
  },
  methods: {
    // 获取详情
    getDetail() {
      Api.getWorkbenchDetail(this.id).then(res => {
        this.form = {
          ...res.data,
          date: [res.data.startTime, res.data.endTime]
        }
      })
    },
    async submit() {
      await this.$refs.form.validate()
      this.form.records = this.endRecordList
      await Api.getWorkbenchUpdate(this.form)
      this.close()
      this.$parent.refresh()
    },
    // 查询
    searchSign() {},
    // 重置
    resetSign() {
      this.$refs.filterForm.resetFields()
    },
    // 取消
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped lang="less">
.cancel {
  text-align: center;
  /deep/.upload {
    .el-upload--text {
      text-align: center;
    }
  }
  h4 {
    font-size: 20px;
  }
}
.detail-model {
  margin-left: 50px;
  .el-col {
    margin-bottom: 20px;
  }
}
.desc-label {
  color: #999;
}
</style>
