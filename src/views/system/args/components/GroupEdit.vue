<template>
  <el-dialog title="新建分组" width="500px" class="beauty" :visible="visible" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="分组名称" prop="argText">
        <el-input v-model="form.argText"></el-input>
      </el-form-item>
      <el-form-item label="分组编码" prop="argGroup">
        <el-input v-model="form.argGroup"></el-input>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">创建</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import { createGroup } from '@/api/system/args'

export default {
  name: 'GroupEdit',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    argGroup: {
      type: String,
      default: null
    }
  },
  data() {
    // 这里存放数据
    return {
      form: {},
      rules: {
        argText: [{ required: true, message: '必填' }],
        argGroup: [{ required: true, message: '必填' }]
      }
    }
  },

  created() {
    this.initForm = _.cloneDeep(this.form)
  },

  mounted() {},

  methods: {
    async submit() {
      await this.$refs.form.validate()
      await createGroup({ argGroup: this.argGroup, ...this.form })
      this.$message.success('创建成功')
      this.$emit('change')
      this.close()
    },
    // 关闭弹窗
    close() {
      this.$refs.form.resetFields()
      this.form = _.cloneDeep(this.initForm)
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="less"></style>
