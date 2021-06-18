<template>
  <el-dialog
    title="申诉处理"
    :close-on-click-modal="false"
    width="500px"
    class="beauty bg-border"
    :visible="visible"
    @close="close"
  >
    <div>
      <DetailItem label="申诉理由" labelWidth="120" :value="info.content"></DetailItem>
      <DetailItem label="提交人" labelWidth="120" :value="info.content"></DetailItem>
      <DetailItem label="提交时间" labelWidth="120" :value="info.name"></DetailItem>
      <DetailItem label="附件" labelWidth="120"></DetailItem>
      <el-divider></el-divider>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="处理结果" prop="appealResult">
          <el-radio-group v-model="form.appealResult">
            <el-radio :label="1">申诉成功</el-radio>
            <el-radio :label="0">申诉失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="理由" prop="dealReason">
          <el-input v-model="form.dealReason" type="textarea" :rows="3" :maxlength="400" show-word-limit></el-input>
        </el-form-item>
        <!-- <el-form-item label="处理时间" prop="name">
          <el-date-picker
            v-model="form.time"
            type="date"
            style="width: 100%"
            value-format="yyyy-MM-dd 00:00:00"
            placeholder="请选择处理时间"
            :validate-event="false"
          >
          </el-date-picker>
        </el-form-item>-->
        <el-form-item label="附件" prop="dealFileIds">
          <Upload v-model="form.dealFileIds" isOnlyButton></Upload>
        </el-form-item>
      </el-form>
    </div>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">确定</el-button>
    </footer>
  </el-dialog>
</template>

<script>
export default {
  name: 'HandleAppealDialog',
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
      form: {},
      rules: { appealResult: [{ required: true, message: '必选' }], dealReason: [{ required: true, message: '必填' }] }
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
