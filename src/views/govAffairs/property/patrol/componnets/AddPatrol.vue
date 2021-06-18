<template>
  <el-dialog
    title="新增物业巡查"
    :close-on-click-modal="false"
    width="500px"
    class="beauty bg-border"
    :visible="visible"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="巡查名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="巡查类型" prop="type">
        <Select v-model="form.type" argGroup="patrolType"> </Select>
      </el-form-item>
      <el-form-item label="所属物业" prop="propertyId">
        <Select v-model="form.propertyId" :options="organizationList"> </Select>
      </el-form-item>
      <el-form-item label="巡查人" prop="policeMan">
        <el-input v-model="form.policeMan" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="巡查日期" prop="policeTime">
        <el-date-picker
          v-model="form.policeTime"
          type="date"
          style="width: 100%"
          value-format="yyyy-MM-dd 00:00:00"
          placeholder="请选择巡查日期"
          :validate-event="false"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="巡查结果" prop="result">
        <Select v-model="form.result" :options="patrolStatus"> </Select>
      </el-form-item>
      <el-form-item label="巡查结果描述" prop="description">
        <el-input v-model="form.description" type="textarea" :rows="3" :maxlength="400" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="本次扣分" prop="score">
        <InputNumber v-model="form.score" placeholder="请输入"></InputNumber>
      </el-form-item>
      <el-form-item label="附件" prop="fileId">
        <Upload v-model="form.fileId" isOnlyButton multiple></Upload>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">确定</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import patrolStatus from '../../../lib/patrolStatus'
export default {
  name: 'AddPatrol',
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    organizationList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      patrolStatus,
      form: { ...this.info },
      rules: {
        name: [{ required: true, message: '必填' }],
        type: [{ required: true, message: '必选' }],
        propertyId: [{ required: true, message: '必选' }],
        policeMan: [{ required: true, message: '必填' }],
        policeTime: [{ required: true, message: '必选' }],
        result: [{ required: true, message: '必选' }],
        description: [{ required: true, message: '必填' }],
        score: [{ required: true, message: '必填' }]
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
