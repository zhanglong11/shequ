<!--
 * @Description: 新增积分
 * @Version: 1.0
 * @Autor: zongguosheng
 * @Date: 2021-04-14 09:56:07
 * @LastEditors: zongguosheng
 * @LastEditTime: 2021-05-06 15:15:09
-->
<template>
  <el-dialog width="650px" :title="title" class="beauty" :visible="visible" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="姓 名" prop="search" required>
        <AutoComplete v-model="form.search" placeholder="请输入姓名/手机号" @change="handleUserChange"></AutoComplete>
      </el-form-item>
      <el-form-item label="调整类型" prop="addOrSubtract" required>
        <el-radio v-model="form.addOrSubtract" :label="1">增加</el-radio>
        <el-radio v-model="form.addOrSubtract" :label="2">减少</el-radio>
      </el-form-item>
      <el-form-item label="积 分" prop="score" required>
        <el-input v-model="form.score" placeholder="请输入本次调整的积分值"></el-input>
      </el-form-item>
      <el-form-item label="事 项" prop="taskName" required>
        <el-input v-model="form.taskName" type="textarea" placeholder="请输入事项"></el-input>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button v-promise-btn type="primary" @click="submit()">确定</el-button>
      <el-button @click="$emit('update:visible', false)">取消</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import AutoComplete from './AutoComplete'
import anyRule from '@/lib/anyRule.js'
export default {
  name: 'AddRank',
  components: { AutoComplete },
  props: {
    title: {
      type: String,
      default: ''
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
      search: '',
      name: '',
      startTime: '',
      endTime: '',
      form: { ...this.info },
      rules: {
        search: [{ required: true, message: '请输入姓名/手机号' }],
        score: [
          { required: true, message: '输入积分' },
          { pattern: anyRule.intNumber, message: '请输入非负整数', trigger: 'blur' }
        ],
        taskName: [{ required: true, message: '必填' }]
      }
    }
  },
  computed: {},
  watch: {
    name(val) {
      console.log(!this.name)
      if (this.name) {
        console.log(this.name)
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 新增积分
    async submit() {
      await this.$refs.form.validate()
      console.log(this.form)
      this.$emit('submit', this.form)
    },
    handleUserChange(user) {
      console.log(user)
      this.matched = true
      this.form = Object.assign(this.form, user)
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

<style lang="less" scoped>
.time-select {
  display: flex;
  flex-direction: row;
  .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
  /deep/ .el-form-item__content {
    display: flex;
    flex-direction: row;
    margin-left: 0;
  }
}
</style>
