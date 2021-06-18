<template>
  <el-dialog
    :title="_.isEmpty(info) ? '添加员工' : '修改员工'"
    :close-on-click-modal="false"
    width="500px"
    class="beauty bg-border"
    :visible="visible"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio :label="0">女</el-radio>
          <el-radio :label="1">男</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="身份证" prop="idCardNumber">
        <el-input v-model="form.idCardNumber" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="岗位" prop="position">
        <el-input v-model="form.position" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" :rows="2" :maxlength="200" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">{{ _.isEmpty(info) ? '新建' : '修改' }}</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import anyRule from '@/lib/anyRule'

export default {
  name: 'AddUserDialog',
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
        name: [{ required: true, message: '必填' }],
        sex: [{ required: true, message: '必选' }],
        phone: [
          { required: true, message: '必填' },
          { pattern: anyRule.mobile, message: '不合法' }
        ],
        idCardNumber: [{ pattern: anyRule.identityNumber, message: '不合法' }]
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
