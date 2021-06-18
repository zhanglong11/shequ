<!--/**
任务名称：2689/ 基础服务-用户管理（react->vue）迁移
开发人员：李建敏
日期：2020-3月-25日
任务类型：1.全新代码
**/-->
<template>
  <el-dialog width="460px" title="关联已有员工" :visible="visible" @close="close">
    <el-form style="padding: 0 20px" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="员工姓名" prop="userId">
        <SelectUser v-model="form.userId" />
      </el-form-item>
      <el-form-item label="所在部门">
        <el-input :value="departmentName" disabled />
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="form.departmentDuty" />
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button @click="submit">提交</el-button>
    </footer>
  </el-dialog>
</template>
<script>
import SelectUser from './select-user'
import { toFlat } from '@/utils'

export default {
  name: 'LinkUserToDepartment',
  // import引入的组件需要注入到对象中才能使用
  components: { SelectUser },
  // 接收的参数
  props: {
    // 是否可见
    visible: {
      type: Boolean,
      required: true
    },
    // 部门id
    departmentId: {
      type: String,
      default: null
    },
    // 部门列表
    departmentList: {
      type: Array,
      required: true
    }
  },

  data() {
    // 这里存放数据
    return {
      form: {}, // 关联员工表单
      rules: {
        userId: [{ required: true, message: '必填' }]
      }
    }
  },
  computed: {
    // 部门名称
    departmentName() {
      return _.find(toFlat(this.departmentList), { value: this.departmentId }).label
    }
  },
  methods: {
    // 提交
    submit() {
      this.axios.system
        .post('cim6d/system/user/department/add', {
          departmentId: this.departmentId,
          ...this.form
        })
        .then(res => {
          this.$message.success('关联部门成功')
          this.$parent.refresh()
          this.$parent.getDepartmentList()
          this.close()
        })
    },
    // 关闭弹窗
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped lang="less"></style>
