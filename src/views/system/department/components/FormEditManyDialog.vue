<template>
  <div>
    <el-dialog
      title="编辑部门"
      :visible="visible"
      width="800px"
      top="10vh"
      append-to-body
      @close="$emit('update:visible', false)"
    >
      <el-form ref="form" :model="form" label-width="120px" :rules="formRule" class="dialogForm">
        <el-form-item label="部门名称：" prop="name">
          <div style="display: flex; flex-wrap: wrap" class="formInput">
            <div v-for="item of formInfo" :key="item.id" class="item">{{ item.name }}</div>
          </div>
        </el-form-item>
        <el-form-item label="上级部门：" prop="parentId">
          <DepartmentSelect v-model="form.parentId" style="width: 400px" allow-root :deps="form.deptIds" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">取 消</el-button>
        <el-button type="primary" @click="handleEmit">确 定</el-button>
        <el-button v-if="!form.isRoot" plain type="danger" @click="handleDelete">删 除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DepartmentSelect from './DepartmentSelect'
export default {
  name: 'FormEditManyDialog',
  components: { DepartmentSelect },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formInfo: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {},
      formRule: {
        parentId: [{ required: true, message: '请选择上级部门', trigger: 'change' }]
      }
    }
  },
  computed: {
    /* departmentList() {
      return this.formInfo.map(item => item.id)
    } */
  },
  created() {
    const deptIds = this.formInfo.map(item => item.id)
    this.form.deptIds = deptIds
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
      await this.$parent.handleDelete(this.form.deptIds)
      this.$emit('update:visible', false)
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
.item {
  height: 26px;
  padding: 0 5px;
  border: 1px #dcdfe6 solid;
  margin: 2px 10px 2px 0;
  display: flex;
  align-items: center;
}
</style>
