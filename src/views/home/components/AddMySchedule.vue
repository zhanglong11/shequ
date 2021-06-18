<template>
  <el-dialog title="添加日程" :visible="visible" @close="closeModal()">
    <el-form ref="refFormData" :model="formData" :rules="rules">
      <el-form-item label="日程内容" :label-width="formLabelWidth" prop="content">
        <el-input
          v-model="formData.content"
          :maxlength="500"
          type="textarea"
          :rows="4"
          autocomplete="off"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="日程时间" :label-width="formLabelWidth" prop="scheduleDate">
        <el-date-picker
          v-model="formData.scheduleDate"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder=""
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModal()">取 消</el-button>
      <el-button type="primary" @click="submitForm()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import homeApi from '../api'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // 这里存放数据
    return {
      show: false,
      formLabelWidth: '120px',
      formData: {
        content: '',
        scheduleDate: ''
      },
      rules: {
        content: [{ required: true, message: '请输入日程内容', trigger: 'blur' }],
        scheduleDate: [{ required: true, message: '请选择日程时间', trigger: 'change' }]
      }
    }
  },
  // 方法集合
  methods: {
    // 提交
    submitForm() {
      this.$refs.refFormData.validate(valid => {
        if (valid) {
          this.addMySchedule()
        } else {
          return false
        }
      })
    },
    // 新增我的日程
    async addMySchedule() {
      await homeApi.addMySchedule(this.formData)
      this.$message.success('操作成功')
      this.closeModal()
      this.$emit('change')
    },
    // 关闭模态框
    closeModal() {
      this.$refs.refFormData.resetFields()
      this.$emit('update:visible', false)
    }
  }
}
</script>
