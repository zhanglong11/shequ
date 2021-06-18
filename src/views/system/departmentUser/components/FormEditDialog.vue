<template>
  <div>
    <el-dialog
      title="编辑部门"
      :visible="visible"
      width="600px"
      top="10vh"
      append-to-body
      :close-on-click-modal="false"
      @close="$emit('update:visible', false)"
    >
      <el-form ref="form" :model="form" label-width="120px" :rules="formRule" class="dialogForm">
        <el-form-item label="部门名称：" prop="name">
          <el-input v-model="form.name" :disabled="formInfo.isRoot" class="formInput" :maxlength="50" />
        </el-form-item>
        <el-form-item v-if="!formInfo.isRoot" label="上级部门：" prop="departmentId">
          <DepartmentSelect
            v-model="form.parentId"
            :disabled="formInfo.isRoot"
            :allow-root="true"
            style="width: 400px"
            :deps="formInfo.isRoot ? [] : [formInfo.id]"
          />
        </el-form-item>
        <el-form-item label="设置主管：" prop="principalId">
          <UserSelect
            v-model="form.principalId"
            :principal-name.sync="form.principalName"
            style="width: 400px"
            :department-id="form.id"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">取 消</el-button>
        <el-button type="primary" @click="handleEmit">确 定</el-button>
        <el-button v-if="!formInfo.isRoot" plain type="danger" @click="handleDelete">删 除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DepartmentSelect from './DepartmentSelect'
import UserSelect from './UserSelect'
export default {
  name: 'FormEditDialog',
  components: { DepartmentSelect, UserSelect },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: this.formInfo,
      formRule: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        parentId: [{ required: true, message: '请选择部门', trigger: 'change' }]
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
    },
    async handleDelete() {
      await this.$parent.handleDeleteDepartment(this.form.id)
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="less" scoped>
.formInput {
  width: 400px !important;
}
.dialogForm {
  padding: 10px 20px;
}
</style>
