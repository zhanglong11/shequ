<template>
  <el-dialog width="600px" :title="title" class="beauty" :visible="visible" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="110px">
      <el-form-item v-if="isorder" label="是否兑换" prop="convertStatus">
        <el-radio-group v-model="form.convertStatus">
          <el-radio :label="1">兑 换</el-radio>
          <el-radio :label="0">不兑换</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="isorder" label="备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item v-if="!isorder" label="兑换订单编号" prop="convertOrderNumber">
        <span>{{ form.convertOrderNumber }}</span>
      </el-form-item>
      <el-form-item v-if="!isorder" label="兑换商品" prop="giftName">
        <span>{{ form.giftName }}</span>
      </el-form-item>
      <el-form-item v-if="!isorder" label="兑换人" prop="realName">
        <span>{{ form.realName }}</span>
      </el-form-item>
      <el-form-item v-if="!isorder" label="订单提交时间" prop="orderSubmitTime">
        <span>{{ form.orderSubmitTime }}</span>
      </el-form-item>
      <el-form-item v-if="!isorder" label="扣除积分" prop="deductScore">
        <span>{{ form.deductScore }}</span>
      </el-form-item>
      <el-form-item v-if="!isorder" label="订单状态" prop="orderStatus">
        <span>{{ form.orderStatus == 0 ? '未处理' : '已处理' }}</span>
      </el-form-item>
      <el-form-item v-if="!isorder" label="兑换状态" prop="convertStatus">
        <span>{{ form.convertStatus == 0 ? '未兑换' : '已兑换' }}</span>
      </el-form-item>
      <el-form-item v-if="!isorder" label="处理人" prop="processingStaff">
        <span>{{ form.processingStaff }}</span>
      </el-form-item>
      <el-form-item v-if="!isorder" label="处理时间" prop="updateTime">
        <span>{{ form.updateTime }}</span>
      </el-form-item>
      <el-form-item v-if="!isorder" label="备注" prop="remark">
        <span>{{ form.remark == null || '' ? '暂无数据' : form.remark }}</span>
      </el-form-item>
    </el-form>
    <footer v-if="isorder" slot="footer">
      <el-button v-promise-btn type="primary" @click="submit(id)">确定</el-button>
      <el-button @click="$emit('update:visible', false)">取消</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import { giftStatusList } from '../../lib/options'
import { scoreConvertDispose, getScoreConvertDisposeInfo } from '../../api/pointsBand.js'
export default {
  name: 'Edit',
  components: {},
  props: {
    id: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    isorder: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      giftStatusList,
      form: {
        convertStatus: 0,
        remark: ''
      },
      rules: {
        convertStatus: [{ required: true, message: '必选' }]
      }
    }
  },
  computed: {},
  watch: {
    visible(val) {
      console.log(val)
      console.log(this.id)
      if (!this.isorder) {
        console.log('info')
        this.getScoreConvertDisposeInfo(this.id)
      }
      if (val) this.refresh()
    }
  },
  created() {
    if (this.id) this.getScoreConvertDisposeInfo(this.id)
  },
  mounted() {},
  methods: {
    submit() {
      this.scoreConvertDispose()
    },
    // 积分兑换-处理
    async scoreConvertDispose() {
      const parpam = { id: this.id, convertStatus: this.form.convertStatus, remark: this.form.remark }
      const res = await scoreConvertDispose(parpam)
      console.log(res)
      this.$parent.refresh()
      this.$emit('update:visible', false)
    },
    // 积分兑换详情
    async getScoreConvertDisposeInfo(id) {
      await getScoreConvertDisposeInfo(id).then(res => {
        this.form = res.data
        console.log(res.data)
      })
    },
    async refresh() {},
    close() {
      // this.$refs.form.resetFields()
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
