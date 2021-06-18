<template>
  <div>
    <el-dialog
      title="添加部门"
      :visible="visible"
      width="600px"
      top="10vh"
      append-to-body
      @close="$emit('update:visible', false)"
    >
      <el-form ref="form" :model="form" label-width="120px" :rules="formRule" class="dialogForm">
        <el-form-item label="部门名称：" prop="name">
          <el-input v-model="form.name" :maxlength="50" class="formInput" />
        </el-form-item>
        <el-form-item label="上级部门：" prop="parentId">
          <DepartmentSelect v-model="form.parentId" style="width: 400px" allow-root />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">取 消</el-button>
        <el-button type="primary" @click="handleEmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DepartmentSelect from './DepartmentSelect'
export default {
  name: 'FormDialog',
  components: { DepartmentSelect },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {},
      formRule: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        parentId: [{ required: true, message: '请选择父级部门', trigger: 'change' }]
      }
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    handleEmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('submit', this.form)
        } else {
          this.$message.error('请正确填写')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.formInput {
  width: 400px;
}
.dialogForm {
  padding: 10px 20px;
}
</style>
