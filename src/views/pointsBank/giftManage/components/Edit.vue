<template>
  <el-dialog
    width="650px"
    :title="_.isEmpty(info.giftName) ? '新建' : '修改'"
    class="beauty"
    :visible="visible"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="90px">
      <el-form-item label="礼品图片" prop="giftImages" required>
        <UploadImage v-model="form.giftImages" :multiple="true" :limit="15" />
      </el-form-item>
      <el-form-item label="礼品名称" prop="giftName" required>
        <el-input v-model="form.giftName"></el-input>
      </el-form-item>
      <el-form-item label="库存量" prop="inventory" required>
        <el-input v-model="form.inventory"></el-input>
      </el-form-item>
      <el-form-item label="兑换积分" prop="convertScore" required>
        <el-input v-model="form.convertScore"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status" required>
        <el-radio v-model="form.status" :label="0">上架</el-radio>
        <el-radio v-model="form.status" :label="1">下架</el-radio>
        <!-- <Select v-model="form.status" :options="giftStatusList" has-all> </Select> -->
      </el-form-item>
      <el-form-item label="商品描述" prop="describe" required>
        <el-input v-model="form.describe"></el-input>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit()">
        {{ _.isEmpty(info.giftName) ? '创建' : '修改' }}
      </el-button>
    </footer>
  </el-dialog>
</template>

<script>
import { giftStatusList } from '../../lib/options'
import { getBankGiftManagement } from '../../api/pointsBand.js'
import anyRule from '@/lib/anyRule.js'
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
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      giftStatusList,
      form: { ...this.info },
      defaultForm: {},
      rules: {
        giftImages: [{ required: true, message: '必填' }],
        giftName: [{ required: true, message: '必填' }],
        inventory: [
          { required: true, message: '必填' },
          { pattern: anyRule.Number, message: '请输入正确库存', trigger: 'blur' }
        ],
        convertScore: [
          { required: true, message: '必填' },
          { pattern: anyRule.Number, message: '请输入兑换积分', trigger: 'blur' }
        ],
        status: [{ required: true, message: '必选' }],
        describe: [{ required: true, message: '必填' }]
      }
    }
  },
  watch: {
    visible(val) {
      console.log(val)
      console.log(this.id)
      if (this.id) {
        this.getBankGiftManagement()
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    init: _.once(function () {}),
    // 获取信息
    async getBankGiftManagement(id) {
      const res = await getBankGiftManagement(id || this.id)
      this.form = res.data
      console.log(res)
    },
    async submit() {
      await this.$refs.form.validate()
      this.form.giftImages = _.join(this.form.giftImages, ',')
      this.$emit('submit', this.form)
    },
    close() {
      this.$refs.form.resetFields()
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
