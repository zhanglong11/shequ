<template>
  <el-dialog width="500px" :title="id ? '编辑' : '新建'" :visible="visible" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="党员姓名" prop="partyMemberId">
        <SelectCcpUser v-model="form.partyMemberId"></SelectCcpUser>
      </el-form-item>
      <el-form-item label="缴纳年月" prop="paymentMonth">
        <el-date-picker
          v-model="form.paymentMonth"
          style="width: 100%"
          type="month"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="缴纳金额" prop="paymentMoney">
        <InputNumber v-model="form.paymentMoney" :min="0" :precision="2" unit="元"></InputNumber>
      </el-form-item>
      <el-form-item label="缴纳日期" prop="actualPaymentDay">
        <el-date-picker v-model="form.actualPaymentDay" style="width: 100%"></el-date-picker>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">{{ id ? '保存' : '创建' }}</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import _ from 'lodash'
import { createPartyPayment, getLastByPartyMemberId, getPartyPaymentById, updatePartyPayment } from '@/api/ccp/dues'

export default {
  name: 'Edit',
  components: {},
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
        paymentMoney: null,
        paymentMonth: dayjs().format('YYYY-MM-DD'),
        actualPaymentDay: dayjs().format('YYYY-MM-DD')
      },
      defaultForm: {},
      rules: {
        partyMemberId: [{ required: true, message: '必填' }],
        paymentMonth: [{ required: true, message: '必填' }],
        paymentMoney: [{ required: true, message: '必填' }],
        actualPaymentDay: [{ required: true, message: '必填' }]
      }
    }
  },
  watch: {
    visible(val) {
      if (val && this.id) this.refresh()
    },
    'form.partyMemberId'(val) {
      if (!val) return false
      getLastByPartyMemberId(val).then(res => {
        this.form.paymentMoney = res.data.paymentMoney
      })
    }
  },
  created() {
    this.defaultForm = _.cloneDeep(this.form)
  },
  methods: {
    async refresh() {
      this.form = await getPartyPaymentById(this.id).then(res => res.data)
    },
    async submit() {
      await this.$refs.form.validate()
      this.id ? await updatePartyPayment(this.form) : await createPartyPayment(this.form)
      this.$message.success('操作成功')
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
