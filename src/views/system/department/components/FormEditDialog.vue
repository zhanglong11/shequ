<template>
  <div>
    <el-dialog
      title="编辑部门"
      :visible="visible"
      width="600px"
      top="10vh"
      append-to-body
      @close="$emit('update:visible', false)"
    >
      <el-form ref="form" :model="form" label-width="120px" :rules="formRule" class="dialogForm">
        <el-form-item label="部门名称：" prop="name">
          <el-input v-model="form.name" :disabled="formInfo.isRoot" :maxlength="50" class="formInput" />
        </el-form-item>
        <el-form-item v-if="!formInfo.isRoot" label="上级部门：" prop="parentId">
          <DepartmentSelect
            v-model="form.parentId"
            :disabledId="form.id"
            :disabled="formInfo.isRoot"
            style="width: 400px"
            allow-root
          />
        </el-form-item>
        <el-form-item label="设置主管：" prop="principalId">
          <UserSelect v-model="form.principalId" :principal-name.sync="form.principalName" style="width: 400px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">取 消</el-button>
        <el-button type="primary" @click="handleEmit">确 定</el-button>
        <el-button v-if="form.parentId && !form.isRoot" plain type="danger" @click="handleDelete">删 除</el-button>
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
    const checkParentId = (rule, value, callback) => {
      if (value === '' || !value) {
        callback(new Error('请选择上级部门'))
      } else {
        callback()
      }
    }
    return {
      form: this.formInfo,
      formRule: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        parentId: [{ required: true, validator: checkParentId, trigger: 'change' }]
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
      await this.$parent.handleDelete([this.form.id])
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
