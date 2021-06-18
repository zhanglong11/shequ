<template>
  <el-dialog title="设置" :visible="visible" width="500px" @close="handleCancel">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="评分周期" prop="term">
        <el-select v-model="form.term" multiple placeholder="请选择评分月份" style="width: 100%">
          <el-option v-for="item in months" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-for="(levelItem, index) in form.levels" :key="index" :label="'信用等级' + (index + 1)" required>
        <el-form-item :prop="'levels.' + index + '.name'" :rules="{ required: true, message: '必填' }">
          <el-input v-model="levelItem.name" placeholder="请输入等级名称" />
        </el-form-item>
        <div class="start-end-div">
          <el-form-item
            :prop="'levels.' + index + '.startScore'"
            :rules="[
              { required: true, message: '必填' },
              {
                validator: (rule, value, callback) => {
                  validateStart(rule, value, callback, index)
                }
              }
            ]"
          >
            <el-input v-model.number="levelItem.startScore" placeholder="请输入开始分值" />
          </el-form-item>
          <span class="line">~</span>
          <el-form-item
            :prop="'levels.' + index + '.endScore'"
            :rules="[
              { required: true, message: '必填' },
              {
                validator: (rule, value, callback) => {
                  validateEnd(rule, value, callback, index)
                }
              }
            ]"
          >
            <el-input v-model.number="levelItem.endScore" placeholder="请输入结束分值" />
          </el-form-item>
        </div>
        <el-button v-if="index !== 0" type="text" @click="handleRemove(index)">删除</el-button>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="btnLoading" @click="handleEnter">确 定</el-button>
      <el-button icon="el-icon-plus" @click="handleAddGrade">新增等级</el-button>
      <el-button @click="handleCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Api from '@/api/handyService'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    gradeInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        term: [],
        levels: [
          {
            name: '',
            startScore: '',
            endScore: ''
          }
        ]
      },
      rules: {
        term: [{ required: true, message: '必填' }]
      },
      months: [
        { label: '1月', value: '1' },
        { label: '2月', value: '2' },
        { label: '3月', value: '3' },
        { label: '4月', value: '4' },
        { label: '5月', value: '5' },
        { label: '6月', value: '6' },
        { label: '7月', value: '7' },
        { label: '8月', value: '8' },
        { label: '9月', value: '9' },
        { label: '10月', value: '10' },
        { label: '11月', value: '11' },
        { label: '12月', value: '12' }
      ],
      btnLoading: false
    }
  },
  watch: {
    'form.term.length': {
      handler: function () {
        this.form.term = this.form.term.map(item => parseInt(item))
        let term = _.sortBy(this.form.term)
        term = term.map(item => item.toString())
        this.form.term = term
      }
    },
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.form?.resetFields()
          // console.log(this.gradeInfo)
          const newGradeInfo = _.cloneDeep(this.gradeInfo)
          this.form.term = newGradeInfo.term ? newGradeInfo.term.split(',') : []
          if (newGradeInfo.levels.length) {
            this.form.levels = newGradeInfo.levels
          }
        })
      }
    }
  },
  methods: {
    // 取消
    handleCancel() {
      this.$emit('update:visible', false)
    },
    // 确定
    handleEnter() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // console.log(this.form)
          const params = {
            companyId: this.$store.state.user.companyId,
            levels: this.form.levels,
            module: 1, // 所属模块：1商户、2物业
            term: this.form.term.join(',')
          }
          this.btnLoading = true
          Api.setMerchantGrade(params).then(
            res => {
              this.$message.success('操作成功')
              this.handleCancel()
              this.$emit('refreshGradeInfo')
              this.btnLoading = false
            },
            err => {
              console.log(err)
              this.btnLoading = false
            }
          )
        }
      })
    },
    // 新增信用等级
    handleAddGrade() {
      if (this.form.levels.length < 5) {
        this.form.levels.push({
          name: '',
          startScore: '',
          endScore: ''
        })
      } else {
        this.$message.error('最多可设置5个信用等级')
      }
    },
    // 删除信用等级
    handleRemove(index) {
      this.form.levels.splice(index, 1)
    },
    // 校验开始值
    validateStart(rule, value, callback, index) {
      // console.log(rule, value, callback, index)
      if (isNaN(value)) {
        callback(new Error('请输入数字'))
      } else if (value < this.form.levels[index].endScore) {
        callback()
      } else {
        callback(new Error('开始分值须小于结束分值'))
      }
    },
    // 校验结束值
    validateEnd(rule, value, callback, index) {
      // console.log(rule, value, callback, index)
      if (isNaN(value)) {
        callback(new Error('请输入数字'))
      } else if (value > this.form.levels[index].startScore) {
        callback()
      } else {
        callback(new Error('结束分值须大于开始分值'))
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog__body {
  padding: 10px 20px;
}
.start-end-div {
  display: flex;
  justify-content: space-between;
  .line {
    margin: 0px 10px;
  }
}
</style>
