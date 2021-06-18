<template>
  <el-dialog
    title="填写处理结果"
    :close-on-click-modal="false"
    width="500px"
    class="beauty bg-border"
    :visible="visible"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="处理结果" prop="dealResult">
        <el-input v-model="form.dealResult" type="textarea" :rows="4" :maxlength="400" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="本次扣分" prop="score">
        <InputNumber v-model="form.score" :min="1" placeholder="请输入"></InputNumber>
      </el-form-item>
      <el-form-item label="处理时间" prop="dealTime">
        <el-date-picker
          v-model="form.dealTime"
          type="datetime"
          style="width: 100%"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="请选择处理时间"
          :validate-event="false"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="附件" prop="dealFileIds">
        <Upload v-model="form.dealFileIds" isOnlyButton></Upload>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">确定</el-button>
    </footer>
  </el-dialog>
</template>

<script>
export default {
  name: 'FillResult',
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      // form: { createTime: this.dayjs().format('YYYY-MM-DD HH:mm:ss') },
      form: {
        dealTime: new Date()
      },
      rules: {
        dealResult: [{ required: true, message: '必填' }],
        score: [{ required: true, message: '必填' }],
        dealTime: [{ required: true, message: '必填' }]
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
