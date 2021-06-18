<template>
  <el-dialog width="650px" :title="id ? '编辑活动' : '新建活动'" class="beauty" :visible="visible" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="110px">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动内容" prop="content">
        <el-input v-model="form.content" type="textarea" placeholder="请输入活动内容"></el-input>
      </el-form-item>
      <el-form-item label="活动地点" prop="site">
        <el-input v-model="form.site" placeholder="请输入活动地点"></el-input>
      </el-form-item>
      <el-form-item label="活动类型" prop="type">
        <Select v-model="form.type" arg-group="ccpActivityType" />
      </el-form-item>
      <el-form-item label="活动时间" prop="activityBeginTime">
        <SelectDateRange
          :startTime.sync="form.activityBeginTime"
          :endTime.sync="form.activityEndTime"
          :format="'yyyy-MM-dd HH:mm:ss'"
        />
      </el-form-item>
      <el-form-item label="报名时间" prop="applyBeginTime">
        <SelectDateRange
          :startTime.sync="form.applyBeginTime"
          :endTime.sync="form.applyEndTime"
          :format="'yyyy-MM-dd HH:mm:ss'"
        />
      </el-form-item>
      <el-form-item label="发起组织" prop="organizationId">
        <SelectCcpDepartment v-model="form.organizationId" style="width: 100%" placeholder="请选择组织">
        </SelectCcpDepartment>
      </el-form-item>
      <el-form-item style="position: relative" label="参与党员" prop="firstParticipant">
        <SelectCcpUser v-model="form.firstParticipant" idCardNumberAsKey multiple />
        <span style="position: absolute; right: -100px">
          已选择 {{ form.firstParticipant ? form.firstParticipant.split(',').length : 0 }} 人
        </span>
      </el-form-item>
      <el-form-item style="position: relative" label="参与积极分子" prop="secondParticipant">
        <SelectCcpActiveMember v-model="form.secondParticipant" idCardNumberAsKey multiple />
        <span style="position: absolute; right: -100px">
          已选择 {{ form.secondParticipant ? form.secondParticipant.split(',').length : 0 }} 人
        </span>
      </el-form-item>
      <el-form-item label="附件" prop="fileIds">
        <Upload v-model="form.fileIds" isOnlyButton />
      </el-form-item>
      <el-form-item label="活动积分" prop="score">
        <InputNumber v-model="form.score" :min="0" placeholder="请输入活动积分"></InputNumber>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">确定</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import Api from '@/views/association/api'
import SelectCcpDepartment from '../../components/SelectCcpDepartment'
export default {
  name: 'CcpActivitiAdd',
  components: { SelectCcpDepartment },
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
      form: {
        module: 2
      },
      rules: {
        name: [{ required: true, message: '必填' }],
        content: [{ required: true, message: '必填' }],
        site: [{ required: true, message: '必填' }],
        type: [{ required: true, message: '必选' }],
        activityBeginTime: [{ required: true, message: '必选' }],
        applyBeginTime: [{ required: true, message: '必选' }],
        description: [{ required: true, message: '必填' }],
        organizationId: [{ required: true, message: '必填' }],
        firstParticipant: [{ required: true, message: '必填' }]
      }
    }
  },
  created() {
    if (this.id) {
      this.refresh()
    }
  },
  mounted() {},
  methods: {
    refresh() {
      Api.getActivityDetail(this.id).then(res => {
        this.form = res.data
      })
    },
    async submit() {
      await this.$refs.form.validate()
      if (this.id) {
        await Api.getActivityUpdate(this.form)
        this.$message.success('修改成功')
      } else {
        await Api.getActivityAdd(this.form)
        this.$message.success('添加成功')
      }
      this.$emit('update:visible', false)
      this.$emit('change')
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.el-form {
  width: 500px;
}
</style>
