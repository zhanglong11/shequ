<template>
  <div>
    <el-dialog
      title="调整部门"
      :visible="visible"
      width="600px"
      top="10vh"
      append-to-body
      :close-on-click-modal="false"
      @close="$emit('update:visible', false)"
    >
      <el-form ref="form" :model="form" label-width="120px" :rules="formRule" class="dialogForm">
        <el-form-item label="部门：" prop="departmentIdList">
          <DepartmentSelect v-model="form.departmentIdList" style="width: 400px" multiple :allow-root="false" />
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
  name: 'FormEditDialog',
  components: { DepartmentSelect },
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
      form: { departmentIdList: [this.formInfo.id] },
      formRule: {
        departmentIdList: [{ required: true, message: '请选择部门', trigger: 'change' }]
      }
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    async handleEmit() {
      await this.$refs.form.validate()
      this.$emit('submit', this.form)
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
