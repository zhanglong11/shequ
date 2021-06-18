<template>
  <el-dialog width="600px" class="beauty" :title="title" :visible="visible" @close="close">
    <!--添加，编辑表单-->
    <el-form v-if="type === 'add' || type === 'edit'" ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="会议主题" prop="meetingSubject">
        <el-input v-model="form.meetingSubject" placeholder="请输入会议主题" />
      </el-form-item>
      <el-form-item label="会议室" prop="meetingAddress">
        <el-input v-model="form.meetingAddress" placeholder="请输入会议室" />
      </el-form-item>
      <el-form-item label="发起人" prop="initiator">
        <SelectSystemUser v-model="form.initiator" multiple />
      </el-form-item>
      <el-form-item label="参会党员" prop="participant">
        <SelectCcpUser v-model="form.participant" idCardNumberAsKey multiple />
      </el-form-item>
      <el-form-item label="参会积极分子" prop="activist">
        <SelectCcpActiveMember v-model="form.activist" idCardNumberAsKey multiple />
      </el-form-item>
      <el-form-item label="会议时间" prop="date">
        <el-date-picker
          v-model="form.date"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="会议开始时间"
          end-placeholder="会议结束时间"
          style="width: 100%"
          @input="
            arr => {
              form.startTime = arr ? arr[0] : null
              form.endTime = arr ? arr[1] : null
            }
          "
        />
      </el-form-item>
    </el-form>
    <!--添加，编辑表单-->
    <!--取消会议 -->
    <div v-if="type === 'cancel'" class="cancel-model">
      <h4>是否确认取消会议？</h4>
    </div>
    <!-- 取消会议 -->

    <!--上传会议-->
    <el-form v-if="type === 'upload'" ref="newform" :model="newform" :rules="newformRules" label-width="120px">
      <el-form-item label="会议纪要：" prop="summary">
        <el-input v-model="newform.summary" type="textarea" :autosize="{ minRows: 3 }" placeholder="请输入会议纪要" />
      </el-form-item>
      <el-form-item label="附件：">
        <Upload v-model="newform.fileIds" isOnlyButton multiple></Upload>
      </el-form-item>
    </el-form>
    <!--上传会议-->
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">确认</el-button>
    </footer>
  </el-dialog>
</template>
<script>
import Api from '@/views/workbench/api'
// import FileEdits from './FileEdits'
export default {
  components: {},
  props: {
    visible: {
      type: Boolean
    },
    repeatData: {},
    id: {},
    type: {}
  },
  data() {
    return {
      form: {
        initiator: this.$store.state.user.userInfo.id,
        module: 2 // 1普通 2党
      },
      newform: {
        id: this.id
      },
      rules: {
        meetingSubject: [{ required: true, message: '必填' }],
        meetingAddress: [{ required: true, message: '必填' }],
        initiator: [{ required: true, message: '必选' }],
        participant: [{ required: true, message: '必选' }],
        date: [{ required: true, message: '必填' }]
      },
      newformRules: {
        summary: [{ required: true, message: '必填' }]
      }
    }
  },
  computed: {
    title() {
      switch (this.type) {
        case 'add':
          return '新建会议'
        case 'edit':
          return '编辑会议'
        case 'cancel':
          return '信息'
        case 'upload':
          return '上传会议记录'
        default:
          return ''
      }
    }
  },
  // 生命周期 - 挂载完成
  created() {
    if (!this.id) return
    this.refresh()
  },
  methods: {
    // 刷新
    async refresh() {
      const res = await Api.getWorkbenchDetail(this.id)
      this.form = {
        ...res.data,
        date: [res.data.startTime, res.data.endTime]
      }
      this.newform = {
        id: this.form.id,
        summary: this.form.summary,
        fileIds: this.form.fileIds
      }
    },
    // 提交
    async submit() {
      if (this.type === 'add' || this.type === 'edit') {
        try {
          await this.$refs.form.validate()
          // 新增 修改
          if (this.id) {
            this.form.module = 2
            await Api.getWorkbenchUpdate(this.form).then(res => {
              if (res.code === 200) {
                this.$message.success('修改成功')
                this.close()
                this.$parent.refresh()
              }
            })
          } else {
            await Api.getWorkbenchAdd(this.form).then(res => {
              if (res.code === 200) {
                this.$message.success('保存成功')
                this.close()
                this.$parent.refresh()
              }
            })
          }
        } catch (e) {}
        return
      }
      if (this.type === 'cancel') {
        // 取消会议
        await Api.getWorkbenchDelete([this.id])
        this.$message.success('操作成功')
        this.close()
        this.$parent.refresh()
        return
      }
      if (this.type === 'upload') {
        // 上传会议
        try {
          await this.$refs.newform.validate()
          await Api.getWorkbenchMeeting(this.newform).then(res => {
            if (res.code === 200) {
              this.$message.success('上传成功')
              this.close()
              this.$parent.refresh()
            }
          })
        } catch (e) {}
      }
    },
    // 取消
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped lang="less">
.cancel-model {
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
</style>
