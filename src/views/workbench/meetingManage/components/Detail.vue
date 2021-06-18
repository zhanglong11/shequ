<template>
  <el-dialog
    width="650px"
    top="10vh"
    class="beauty"
    :title="'会议详情'"
    append-to-body
    :visible="visible"
    @close="close"
  >
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
            <span class="desc-label">参与人：</span>
            <span>{{ form.participantName ? form.participantName.join(',') : '' }}</span>
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
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <!-- <el-button v-promise-btn type="primary" @click="submit">确认</el-button> -->
    </footer>
  </el-dialog>
</template>
<script>
import Api from '../../api'
import { statusList } from '../../lib/optionsList'
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
      statusList,
      form: {},
      fileIds: '',
      rules: {
        summary: [{ required: true, message: '必填' }]
      },
      endRecordList: []
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
