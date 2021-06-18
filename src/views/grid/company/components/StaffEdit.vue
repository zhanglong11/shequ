<template>
  <el-dialog :title="(id ? '编辑' : '新建') + '员工'" width="500px" class="beauty" :visible="visible" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <Select v-model="form.sex" :options="sexOptions" radio></Select>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="身份证" prop="identityCardNumber">
        <el-input v-model="form.identityCardNumber"></el-input>
      </el-form-item>
      <el-form-item label="学历" prop="educationCode">
        <Select v-model="form.educationCode" arg-group="educationCode"></Select>
      </el-form-item>
      <el-form-item label="住址" prop="familyAddress">
        <el-input v-model="form.familyAddress"></el-input>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">{{ id ? '保存' : '创建' }}</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import { sexOptions } from '@/lib/otions'
import anyRule from '@/lib/anyRule'
import { createStaff, getStaffById, updateStaff } from '@/api/grid/companyStaff'
export default {
  name: 'StaffEdit',
  components: {},
  props: {
    id: {
      type: String,
      default: null
    },
    enterpriseId: {
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
      form: {},
      defaultForm: {},
      sexOptions,
      rules: {
        name: [{ required: true, message: '必填' }],
        sex: [{ required: true, message: '必填' }],
        phone: [
          { required: true, message: '必填' },
          { pattern: anyRule.mobile, message: '不合法' }
        ],
        identityCardNumber: [
          { required: true, message: '必填' },
          { pattern: anyRule.identityNumber, message: '不合法' }
        ]
      }
    }
  },
  watch: {
    visible(val) {
      if (val && this.id) this.refresh()
    }
  },
  created() {
    this.defaultForm = _.cloneDeep(this.form)
    this.id && this.refresh()
  },
  mounted() {},
  methods: {
    init: _.once(function () {}),
    async refresh() {
      getStaffById(this.id).then(res => {
        this.form = res.data
      })
    },
    async submit() {
      await this.$refs.form.validate()
      if (!this.id) {
        await createStaff({ ...this.form, enterpriseId: this.enterpriseId })
        this.$message.success('创建成功')
      } else {
        await updateStaff(this.form)
        this.$message.success('修改成功')
      }
      this.$emit('change')
      this.close()
    },
    close() {
      this.$refs.form.resetFields()
      this.form = _.cloneDeep(this.defaultForm)
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
