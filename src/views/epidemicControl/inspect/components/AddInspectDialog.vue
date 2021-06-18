<template>
  <el-dialog
    :title="_.isEmpty(info) ? '新建' : '修改'"
    width="600px"
    class="beauty bg-border"
    :visible="visible"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="巡查时间" prop="patrolTime">
        <el-date-picker
          v-model="form.patrolTime"
          style="width: 100%"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="巡查项目" prop="patrolProject">
        <el-input v-model="form.patrolProject" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="检查内容" prop="patrolContent">
        <el-input v-model="form.patrolContent" type="textarea" :rows="4" :maxlength="200" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="巡查对象" prop="patrolApplication">
        <el-input v-model="form.patrolApplication" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="执行情况" prop="executiveCondition">
        <el-input v-model="form.executiveCondition" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="存在问题记录" prop="problemRecord">
        <el-input v-model="form.problemRecord" type="textarea" :rows="4" :maxlength="200" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="整改建议" prop="recommendations">
        <el-input v-model="form.recommendations" type="textarea" :rows="4" :maxlength="200" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="现场人员" prop="fieldForce">
        <el-input v-model="form.fieldForce" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">{{ _.isEmpty(info) ? '创建' : '修改' }}</el-button>
    </footer>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddInspectDialog',
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: { ...this.info },
      rules: {
        patrolTime: [{ required: true, message: '必选' }],
        patrolProject: [{ required: true, message: '必填' }],
        patrolContent: [{ required: true, message: '必填' }],
        patrolApplication: [{ required: true, message: '必填' }],
        executiveCondition: [{ required: true, message: '必填' }],
        problemRecord: [{ required: true, message: '必填' }],
        recommendations: [{ required: true, message: '必填' }],
        fieldForce: [{ required: true, message: '必填' }]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 关闭弹窗
    close() {
      this.$emit('update:visible', false)
    },
    async submit() {
      await this.$refs.form.validate()
      this.$emit('submit', this.form)
    }
  }
}
</script>
<style scoped lang="less"></style>
